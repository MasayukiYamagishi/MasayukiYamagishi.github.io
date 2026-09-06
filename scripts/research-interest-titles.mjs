import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { parse } from "yaml";

const ROOT_DIRECTORY = process.cwd();
const CONTENT_DIRECTORY = path.join(ROOT_DIRECTORY, "src", "content", "interests");
const APPLY_CHANGES = process.argv.includes("--apply");
const REPORT_ARGUMENT_INDEX = process.argv.indexOf("--report");
const REPORT_PATH =
  REPORT_ARGUMENT_INDEX >= 0 ? process.argv[REPORT_ARGUMENT_INDEX + 1] : null;
const USER_AGENT =
  "masayukiyamagishi.github.io title localization research/1.0 (portfolio data maintenance)";

const BOOK_DESCRIPTIONS =
  /\b(book|novel|novella|manga|comic|essay|poem|poetry|short stor|literary work|non-fiction|publication)\b/i;
const MOVIE_DESCRIPTIONS =
  /\b(film|movie|motion picture|animated feature|anime)\b/i;

const CURATED_BOOK_TITLES = new Map([
  [
    "book-0001",
    {
      titleEn: "Good Code, Bad Code",
      titleEnSourceUrl: "https://www.manning.com/books/good-code-bad-code",
    },
  ],
  [
    "book-0004",
    {
      titleEn: "Laws of UX",
      titleEnSourceUrl:
        "https://www.oreilly.com/library/view/laws-of-ux/9781098146955/",
    },
  ],
  [
    "book-0006",
    {
      titleEn: "Site Reliability Engineering",
      titleEnSourceUrl: "https://sre.google/books/",
    },
  ],
  [
    "book-0012",
    {
      titleEn: "1984",
      titleEnSourceUrl:
        "https://www.penguinrandomhouse.com/books/326569/1984-by-george-orwell-with-a-foreword-by-thomas-pynchon/9780451524935/",
    },
  ],
  [
    "book-0018",
    {
      titleEn: "I Want to Kick You in the Back",
      titleEnSourceUrl: "https://jwh.trannet.co.jp/works/view/5170",
    },
  ],
  [
    "book-0019",
    {
      titleEn: "Experience and Education",
      titleEnSourceUrl:
        "https://www.simonandschuster.com/books/Experience-And-Education/John-Dewey/9780684838281",
    },
  ],
  [
    "book-0021",
    {
      titleEn: "The Three-Cornered World",
      titleEnSourceUrl: "https://pushkinpress.com/book/the-three-cornered-world/",
    },
  ],
  [
    "book-0052",
    {
      titleEn: "The Anomaly",
      titleEnSourceUrl:
        "https://otherpress.com/product/the-anomaly-9781635421699/overview/",
    },
  ],
  [
    "book-0057",
    {
      titleEn: "The Alchemist",
      titleEnSourceUrl:
        "https://www.harpercollins.com/products/the-alchemist-paulo-coelho",
    },
  ],
  [
    "book-0097",
    {
      titleEn: "Frieren: Beyond Journey's End",
      titleEnSourceUrl: "https://www.viz.com/frieren-beyond-journeys-end",
    },
  ],
  [
    "book-0137",
    {
      titleEn: "Ping Pong: Full Game, Vol. 1",
      titleEnSourceUrl: "https://www.wikidata.org/wiki/Q837883",
    },
  ],
  [
    "book-0138",
    {
      titleEn: "Ping Pong: Full Game, Vol. 2",
      titleEnSourceUrl: "https://www.wikidata.org/wiki/Q837883",
    },
  ],
  [
    "book-0187",
    {
      titleEn: "Brave New World",
      titleEnSourceUrl:
        "https://www.penguinrandomhouse.com/books/237479/un-mundo-feliz--brave-new-world-by-aldous-huxley/",
    },
  ],
]);

const CURATED_MOVIE_TITLES = new Map([
  [
    "movie-0159",
    {
      titleEn: "The House of Small Cubes",
      titleEnSourceUrl:
        "https://play.google.com/store/movies/details/The_House_of_Small_Cubes?hl=en_US&id=E4B4F6CEA554C989MV",
    },
  ],
  [
    "movie-0172",
    {
      titleEn: "Drifting Home",
      titleEnSourceUrl: "https://www.wikidata.org/wiki/Q109602795",
    },
  ],
]);

// These records have a non-English original title, or a shortened original-title
// field, so a separately verified English release title is useful in the UI.
const MOVIES_REQUIRING_ENGLISH_TITLE = new Set([
  "movie-0011",
  "movie-0016",
  "movie-0017",
  "movie-0018",
  "movie-0025",
  "movie-0039",
  "movie-0046",
  "movie-0073",
  "movie-0074",
  "movie-0092",
  "movie-0094",
  "movie-0096",
  "movie-0110",
  "movie-0112",
  "movie-0115",
  "movie-0129",
  "movie-0136",
  "movie-0190",
  "movie-0194",
  "movie-0200",
  "movie-0214",
  "movie-0217",
  "movie-0224",
  "movie-0268",
  "movie-0271",
]);

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function withoutVolumeRange(value) {
  return value
    .normalize("NFKC")
    .replace(/\s*[（(［\[]?(?:新装版|新版|ワイド版)[）)］\]]?/gu, "")
    .replace(/[（(](?:上|中|下)[）)]\s*$/u, "")
    .replace(/\s*(?:第?\d+巻?|[①-⑳])\s*[～〜~-]\s*(?:第?\d+巻?|[①-⑳])\s*$/u, "")
    .replace(/\s*(?:上・下|上・中・下)\s*$/u, "")
    .replace(/\s*フルゲームの[12]\s*$/u, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function isLatinTitle(value) {
  return /[A-Za-z]/u.test(value) && !/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(value);
}

function appendVolumeRange(title, book) {
  if (!book.volumes || /\bvol(?:ume)?s?\.?\s*\d/iu.test(title)) return title;

  const volumeNumbers = book.volumes.map((volume) => Number(volume.label));

  if (volumeNumbers.every(Number.isInteger)) {
    return `${title}, Vols. ${volumeNumbers[0]}–${volumeNumbers.at(-1)}`;
  }

  return `${title} (${book.volumes.length}-volume set)`;
}

function mergeLocalizedTitles(values, researchedEntries, curatedEntries, shouldInclude) {
  const researchedById = new Map(
    researchedEntries
      .filter((entry) => shouldInclude(values.find((value) => value.id === entry.id)))
      .map((entry) => [entry.id, entry]),
  );

  for (const [id, entry] of curatedEntries) {
    researchedById.set(id, { id, ...entry });
  }

  return values.flatMap((value) => {
    const localized = researchedById.get(value.id);

    if (!localized) return [];

    return [{
      ...localized,
      id: value.id,
      title: value.title,
      titleEn: value.volumes
        ? appendVolumeRange(localized.titleEn, value)
        : localized.titleEn,
    }];
  });
}

function sparqlLiteral(value) {
  return JSON.stringify(value).replace(/\\u([0-9a-f]{4})/giu, "\\u$1");
}

async function queryWikidataTitles(titles) {
  const values = titles.map((title) => `${sparqlLiteral(title)}@ja`).join(" ");
  const query = `
    SELECT ?item ?jaLabel ?enLabel ?enDescription ?enArticle WHERE {
      VALUES ?jaLabel { ${values} }
      ?item (rdfs:label|skos:altLabel) ?jaLabel;
            rdfs:label ?enLabel.
      FILTER(LANG(?enLabel) = "en")
      OPTIONAL {
        ?item schema:description ?enDescription.
        FILTER(LANG(?enDescription) = "en")
      }
      OPTIONAL {
        ?enArticle schema:about ?item;
                   schema:isPartOf <https://en.wikipedia.org/>.
      }
    }
  `;
  let response;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    response = await fetch("https://query.wikidata.org/sparql", {
      method: "POST",
      headers: {
        Accept: "application/sparql-results+json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": USER_AGENT,
      },
      body: new URLSearchParams({ query, format: "json" }),
    });

    if (response.status !== 429 || attempt === 1) break;

    const retryAfterSeconds = Number(response.headers.get("retry-after")) || 3;
    await wait(retryAfterSeconds * 1_000);
  }

  if (!response?.ok) {
    throw new Error(`Wikidata SPARQL request failed: ${response?.status}`);
  }

  const data = await response.json();
  return data.results.bindings.map((binding) => ({
    id: binding.item.value.split("/").at(-1),
    jaLabel: binding.jaLabel.value,
    enLabel: binding.enLabel.value,
    description: binding.enDescription?.value ?? "",
    enArticle: binding.enArticle?.value,
  }));
}

function insertLocalizedTitles(source, entries) {
  const localizedById = new Map(entries.map((entry) => [entry.id, entry]));
  const lines = source.split(/\r?\n/u);
  const output = [];
  let currentId;

  for (const line of lines) {
    const idMatch = line.match(/^\s*- "id": "([^"]+)"\s*$/u);
    if (idMatch) currentId = idMatch[1];

    if (/^\s+"titleEn(?:SourceUrl)?":/u.test(line)) continue;

    output.push(line);

    if (/^\s+"title":/u.test(line) && currentId) {
      const localized = localizedById.get(currentId);
      if (localized) {
        const indentation = line.match(/^\s+/u)?.[0] ?? "    ";
        output.push(`${indentation}"titleEn": ${JSON.stringify(localized.titleEn)}`);
        output.push(
          `${indentation}"titleEnSourceUrl": ${JSON.stringify(localized.titleEnSourceUrl)}`,
        );
      }
    }
  }

  return output.join("\n");
}

async function researchCollection(values, kind) {
  const descriptions =
    kind === "book" ? BOOK_DESCRIPTIONS : MOVIE_DESCRIPTIONS;
  const queryTitles = [
    ...new Set(values.flatMap((value) => [value.title, withoutVolumeRange(value.title)])),
  ];
  const results = await queryWikidataTitles(queryTitles);
  const resultsByTitle = Map.groupBy(results, (result) => result.jaLabel);

  return values.flatMap((value) => {
    const titleVariants = [...new Set([value.title, withoutVolumeRange(value.title)])];
    const candidates = titleVariants
      .flatMap((title) => resultsByTitle.get(title) ?? [])
      .filter(
        (candidate) =>
          descriptions.test(candidate.description) &&
          isLatinTitle(candidate.enLabel),
      )
      .sort((left, right) => {
        const leftYearMatch = value.releaseYear
          ? Number(left.description.includes(String(value.releaseYear)))
          : 0;
        const rightYearMatch = value.releaseYear
          ? Number(right.description.includes(String(value.releaseYear)))
          : 0;
        return (
          rightYearMatch - leftYearMatch +
          Number(Boolean(right.enArticle)) - Number(Boolean(left.enArticle))
        );
      });
    const exactYearCandidate = value.releaseYear
      ? candidates.find((candidate) =>
          candidate.description.includes(String(value.releaseYear)),
        )
      : undefined;
    const selected = exactYearCandidate ?? candidates[0];

    if (!selected || (kind === "book" && value.id === "book-0151")) return [];

    return [{
      id: value.id,
      title: value.title,
      titleEn: selected.enLabel,
      titleEnSourceUrl: `https://www.wikidata.org/wiki/${selected.id}`,
      description: selected.description,
      matchedJapaneseTitle: selected.jaLabel,
    }];
  });
}

const booksPath = path.join(CONTENT_DIRECTORY, "books.yaml");
const moviesPath = path.join(CONTENT_DIRECTORY, "movies.yaml");
const [booksSource, moviesSource] = await Promise.all([
  readFile(booksPath, "utf8"),
  readFile(moviesPath, "utf8"),
]);
const books = parse(booksSource).books;
const movies = parse(moviesSource).movies;

const researchedBooks = await researchCollection(books, "book");
const researchedMovies = await researchCollection(movies, "movie");
const localizedBooks = mergeLocalizedTitles(
  books,
  researchedBooks,
  CURATED_BOOK_TITLES,
  () => true,
);
const localizedMovies = mergeLocalizedTitles(
  movies,
  researchedMovies,
  CURATED_MOVIE_TITLES,
  (movie) =>
    Boolean(movie && (!movie.originalTitle || MOVIES_REQUIRING_ENGLISH_TITLE.has(movie.id))),
);

if (APPLY_CHANGES) {
  await Promise.all([
    writeFile(booksPath, insertLocalizedTitles(booksSource, localizedBooks), "utf8"),
    writeFile(moviesPath, insertLocalizedTitles(moviesSource, localizedMovies), "utf8"),
  ]);
}

const report = {
  applied: APPLY_CHANGES,
  books: {
    matched: localizedBooks.length,
    total: books.length,
    values: localizedBooks,
  },
  movies: {
    matched: localizedMovies.length,
    total: movies.length,
    values: localizedMovies,
  },
};

if (REPORT_PATH) {
  await writeFile(path.resolve(ROOT_DIRECTORY, REPORT_PATH), JSON.stringify(report, null, 2));
}

console.log(
  JSON.stringify({
    applied: APPLY_CHANGES,
    reportPath: REPORT_PATH,
    books: `${localizedBooks.length}/${books.length}`,
    movies: `${localizedMovies.length}/${movies.length}`,
  }),
);
