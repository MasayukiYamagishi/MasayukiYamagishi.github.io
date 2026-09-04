import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { parse, stringify } from "yaml";

const ROOT_DIRECTORY = process.cwd();
const CONTENT_DIRECTORY = path.join(ROOT_DIRECTORY, "src", "content", "interests");
const APPLY_CHANGES = process.argv.includes("--apply");
const REPORT_ARGUMENT_INDEX = process.argv.indexOf("--report");
const REPORT_PATH =
  REPORT_ARGUMENT_INDEX >= 0 ? process.argv[REPORT_ARGUMENT_INDEX + 1] : null;
const USER_AGENT =
  "masayukiyamagishi.github.io director localization research/1.0 (portfolio data maintenance)";
const DIRECTOR_DESCRIPTION =
  /\bdirector\b|\bfilmmaker\b|\banimator\b/i;

// These entries either use a deliberate joint credit, have no English Wikidata
// label, or are ambiguous with another person who has the same Japanese label.
const CURATED_DIRECTORS = new Map([
  [
    "クリストファー・ノーラン",
    {
      nameEn: "Christopher Nolan",
      sourceUrl: "https://www.wikidata.org/wiki/Q25191",
    },
  ],
  [
    "グレッグ・バーランティ",
    {
      nameEn: "Greg Berlanti",
      sourceUrl: "https://www.wikidata.org/wiki/Q978649",
    },
  ],
  [
    "ダニエル・クワン＆ダニエル・シャイナート",
    {
      nameEn: "Dan Kwan & Daniel Scheinert",
      sourceUrl: "https://www.wikidata.org/wiki/Q83808444",
    },
  ],
  [
    "チャン・フン",
    {
      nameEn: "Jang Hoon",
      sourceUrl: "https://www.wikidata.org/wiki/Q495879",
    },
  ],
  [
    "ポール・ジャドゥール",
    {
      nameEn: "Paul Jadoul",
      sourceUrl: "https://www.lesfilmsdunord.com/paul-jadoul",
    },
  ],
  [
    "マイケル・ドハティ",
    {
      nameEn: "Michael Dougherty",
      sourceUrl: "https://mikedougherty.com/",
    },
  ],
  [
    "モーリジウス・スタークル・ドルックス",
    {
      nameEn: "Maurizius Staerkle Drux",
      sourceUrl:
        "https://swissfilms.ch/de/person/maurizius-staerkle-drux/979d420110b7470da33da813250ec1bf",
    },
  ],
  [
    "ライアン・マーフィー",
    {
      nameEn: "Ryan Murphy",
      sourceUrl: "https://www.wikidata.org/wiki/Q316844",
    },
  ],
  [
    "井上森人",
    {
      nameEn: "Morihito Inoue",
      sourceUrl:
        "https://screenanarchy.com/2025/07/hot-spring-shark-attack-interview-director-morihito-inoue-talks-jaws-bureaucracy-and-omnipotent-scree.html",
    },
  ],
  [
    "柴山智隆",
    {
      nameEn: "Tomotaka Shibayama",
      sourceUrl: "https://www.wikidata.org/wiki/Q85881910",
    },
  ],
  [
    "前田悠希",
    {
      nameEn: "Yuki Maeda",
      sourceUrl:
        "https://www.jff.jpf.go.jp/watch/independent-cinema/film-lineup/wonderwall-the-movie/index.html",
    },
  ],
  [
    "瀧沢進介",
    {
      nameEn: "Shinsuke Takizawa",
      sourceUrl: "https://aniplexusa.com/thegardenofsinners/",
    },
  ],
  [
    "麻王",
    {
      nameEn: "MAO",
      sourceUrl: "https://mado-movie.jp/",
    },
  ],
  [
    "𠮷原達矢",
    {
      nameEn: "Tatsuya Yoshihara",
      sourceUrl:
        "https://www.sonypictures.com.au/movies/chainsaw-man-movie-reze-arc",
    },
  ],
]);

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function sparqlLiteral(value) {
  return JSON.stringify(value).replace(/\\u([0-9a-f]{4})/giu, "\\u$1");
}

async function fetchWithRetry(url, options) {
  let response;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    response = await fetch(url, options);

    if (response.status !== 429 || attempt === 1) break;

    const retryAfterSeconds = Number(response.headers.get("retry-after")) || 3;
    await wait(retryAfterSeconds * 1_000);
  }

  if (!response?.ok) {
    throw new Error(`Wikidata request failed: ${response?.status} ${url}`);
  }

  return response;
}

async function queryExactJapaneseNames(names) {
  const results = [];

  for (let index = 0; index < names.length; index += 75) {
    const batch = names.slice(index, index + 75);
    const values = batch.map((name) => `${sparqlLiteral(name)}@ja`).join(" ");
    const query = `
      SELECT DISTINCT ?person ?jaName ?nameEn ?descriptionEn WHERE {
        VALUES ?jaName { ${values} }
        ?person wdt:P31 wd:Q5;
                (rdfs:label|skos:altLabel) ?jaName;
                rdfs:label ?nameEn.
        FILTER(LANG(?nameEn) = "en")
        OPTIONAL {
          ?person schema:description ?descriptionEn.
          FILTER(LANG(?descriptionEn) = "en")
        }
      }
    `;
    const response = await fetchWithRetry("https://query.wikidata.org/sparql", {
      method: "POST",
      headers: {
        Accept: "application/sparql-results+json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": USER_AGENT,
      },
      body: new URLSearchParams({ query, format: "json" }),
    });
    const data = await response.json();

    results.push(
      ...data.results.bindings.map((binding) => ({
        id: binding.person.value.split("/").at(-1),
        nameJa: binding.jaName.value,
        nameEn: binding.nameEn.value,
        description: binding.descriptionEn?.value ?? "",
        matchType: "exact-label",
      })),
    );
  }

  return results;
}

function getWikidataId(movie) {
  for (const value of [movie.titleEnSourceUrl, movie.sourceUrl]) {
    const match = value?.match(/wikidata\.org\/wiki\/(Q\d+)/u);
    if (match) return match[1];
  }

  return null;
}

async function queryMovieDirectorCredits(movies) {
  const sourcedMovies = movies.flatMap((movie) => {
    const wikidataId = getWikidataId(movie);
    return wikidataId ? [{ ...movie, wikidataId }] : [];
  });
  const results = [];

  for (let index = 0; index < sourcedMovies.length; index += 75) {
    const batch = sourcedMovies.slice(index, index + 75);
    const values = batch.map((movie) => `wd:${movie.wikidataId}`).join(" ");
    const query = `
      SELECT DISTINCT ?movie ?person ?nameEn ?nameJa ?descriptionEn WHERE {
        VALUES ?movie { ${values} }
        ?movie wdt:P57 ?person.
        ?person rdfs:label ?nameEn.
        FILTER(LANG(?nameEn) = "en")
        OPTIONAL {
          ?person rdfs:label ?nameJa.
          FILTER(LANG(?nameJa) = "ja")
        }
        OPTIONAL {
          ?person schema:description ?descriptionEn.
          FILTER(LANG(?descriptionEn) = "en")
        }
      }
    `;
    const response = await fetchWithRetry("https://query.wikidata.org/sparql", {
      method: "POST",
      headers: {
        Accept: "application/sparql-results+json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": USER_AGENT,
      },
      body: new URLSearchParams({ query, format: "json" }),
    });
    const data = await response.json();

    results.push(
      ...data.results.bindings.map((binding) => ({
        movieId: binding.movie.value.split("/").at(-1),
        id: binding.person.value.split("/").at(-1),
        nameJa: binding.nameJa?.value,
        nameEn: binding.nameEn.value,
        description: binding.descriptionEn?.value ?? "",
        matchType: "movie-credit",
      })),
    );
  }

  return { sourcedMovies, results };
}

async function searchJapaneseName(name) {
  const url = new URL("https://www.wikidata.org/w/api.php");
  url.search = new URLSearchParams({
    action: "wbsearchentities",
    search: name,
    language: "ja",
    uselang: "en",
    type: "item",
    limit: "10",
    format: "json",
    origin: "*",
  });
  const response = await fetchWithRetry(url, {
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
  });
  const data = await response.json();
  const candidates = data.search
    .filter((candidate) => DIRECTOR_DESCRIPTION.test(candidate.description ?? ""))
    .map((candidate) => ({
      id: candidate.id,
      nameJa: name,
      nameEn: candidate.label,
      description: candidate.description ?? "",
      matchType: "entity-search",
    }));

  return candidates;
}

function chooseCandidate(candidates) {
  const uniqueCandidates = [
    ...new Map(candidates.map((candidate) => [candidate.id, candidate])).values(),
  ];
  const movieCreditCandidates = uniqueCandidates.filter(
    (candidate) => candidate.matchType === "movie-credit",
  );
  const directorCandidates = uniqueCandidates.filter((candidate) =>
    DIRECTOR_DESCRIPTION.test(candidate.description),
  );

  if (movieCreditCandidates.length === 1) return movieCreditCandidates[0];
  if (movieCreditCandidates.length > 1) return null;
  if (directorCandidates.length === 1) return directorCandidates[0];
  if (directorCandidates.length > 1) return null;
  if (
    uniqueCandidates.length === 1 &&
    uniqueCandidates[0].description.length === 0
  ) {
    return uniqueCandidates[0];
  }

  return null;
}

const moviesPath = path.join(CONTENT_DIRECTORY, "movies.yaml");
const movies = parse(await readFile(moviesPath, "utf8")).movies;
const directorNames = [
  ...new Set(movies.flatMap((movie) => movie.directors)),
].sort((left, right) => left.localeCompare(right, "ja"));
const exactResults = await queryExactJapaneseNames(directorNames);
const candidatesByName = Map.groupBy(exactResults, (result) => result.nameJa);
const { sourcedMovies, results: movieCreditResults } =
  await queryMovieDirectorCredits(movies);
const movieCreditsByMovieId = Map.groupBy(
  movieCreditResults,
  (result) => result.movieId,
);

for (const movie of sourcedMovies) {
  const credits = movieCreditsByMovieId.get(movie.wikidataId) ?? [];
  const assignedCreditIds = new Set();
  const unresolvedNames = [];

  for (const nameJa of movie.directors) {
    const matchingCredit = credits.find((credit) => credit.nameJa === nameJa);
    const existingCredit = credits.find((credit) =>
      (candidatesByName.get(nameJa) ?? []).some(
        (candidate) => candidate.id === credit.id,
      ),
    );
    const selectedCredit = matchingCredit ?? existingCredit;

    if (selectedCredit) {
      assignedCreditIds.add(selectedCredit.id);
      candidatesByName.set(nameJa, [
        ...(candidatesByName.get(nameJa) ?? []),
        { ...selectedCredit, nameJa },
      ]);
    } else {
      unresolvedNames.push(nameJa);
    }
  }

  const unassignedCredits = credits.filter(
    (credit) => !assignedCreditIds.has(credit.id),
  );

  if (unresolvedNames.length === 1 && unassignedCredits.length === 1) {
    const [nameJa] = unresolvedNames;
    candidatesByName.set(nameJa, [
      ...(candidatesByName.get(nameJa) ?? []),
      { ...unassignedCredits[0], nameJa },
    ]);
  }
}
const unresolvedNames = directorNames.filter(
  (name) =>
    !CURATED_DIRECTORS.has(name) &&
    !chooseCandidate(candidatesByName.get(name) ?? []),
);

for (const [index, name] of unresolvedNames.entries()) {
  const candidates = await searchJapaneseName(name);
  candidatesByName.set(name, [
    ...(candidatesByName.get(name) ?? []),
    ...candidates,
  ]);

  if (index < unresolvedNames.length - 1) await wait(100);
}

const matched = [];
const unresolved = [];

for (const nameJa of directorNames) {
  const curated = CURATED_DIRECTORS.get(nameJa);

  if (curated) {
    matched.push({
      nameJa,
      ...curated,
      matchType: "curated",
      description: "",
    });
    continue;
  }

  const candidates = candidatesByName.get(nameJa) ?? [];
  const selected = chooseCandidate(candidates);

  if (selected) {
    matched.push({
      nameJa,
      nameEn: selected.nameEn,
      sourceUrl: `https://www.wikidata.org/wiki/${selected.id}`,
      wikidataId: selected.id,
      matchType: selected.matchType,
      description: selected.description,
    });
  } else {
    unresolved.push({ nameJa, candidates });
  }
}

if (APPLY_CHANGES && unresolved.length === 0) {
  const directorsPath = path.join(CONTENT_DIRECTORY, "directors.yaml");
  const source = stringify(
    {
      directors: matched.map(({ nameJa, nameEn, sourceUrl }) => ({
        nameJa,
        nameEn,
        sourceUrl,
      })),
    },
    { lineWidth: 0 },
  );

  await writeFile(directorsPath, source, "utf8");
}

const report = {
  applied: APPLY_CHANGES && unresolved.length === 0,
  total: directorNames.length,
  matched: matched.length,
  unresolved: unresolved.length,
  values: matched,
  unresolvedValues: unresolved,
};

if (REPORT_PATH) {
  await writeFile(
    path.resolve(ROOT_DIRECTORY, REPORT_PATH),
    JSON.stringify(report, null, 2),
    "utf8",
  );
}

console.log(
  JSON.stringify({
    applied: report.applied,
    total: report.total,
    matched: report.matched,
    unresolved: report.unresolved,
    reportPath: REPORT_PATH,
  }),
);
