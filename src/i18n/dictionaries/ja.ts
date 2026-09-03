export const ja = {
  navigation: {
    about: "About",
    skills: "Skills",
    posts: "Posts",
    projects: "Projects",
    experience: "Experience",
  },

  controls: {
    toggleTheme: "ライトモードとダークモードを切り替える",
    selectLanguage: "表示言語を選択",
    openNavigation: "ナビゲーションを開く",
    closeNavigation: "ナビゲーションを閉じる",
    navigationTitle: "ナビゲーション",
    navigationDescription: "表示するセクションを選択",
    backToTop: "ページの先頭へ戻る",
  },

  sections: {
    about: "About",
    skills: "Skills",
    posts: "Posts",
    projects: "Projects",
    experience: "Work Experience",
  },

  profile: {
    name: "山岸 将之",
    role: "フロントエンドエンジニア",
    birthplace: "神奈川県横浜市",
    birthDate: "1997/01/31",
    introduction:
      "大学生のころ、2016年の映像イベント「FRENZ 2016」への出展をきっかけに映像制作を始め、デザイン、モーショングラフィックス、CGに興味を深めました。2021年からシステムエンジニアとして、業務システムやWebサービスの要件整理、設計、実装、テスト、保守運用に携わっています。現在はフロントエンド領域を軸に、映像制作を通じて培った視覚表現への関心と、業務開発で得た設計・運用の経験を活かしながら、UI品質、アクセシビリティ、パフォーマンスを重視したWeb開発に取り組んでいます。",
    hobbies: [
      "映像制作",
      "映画鑑賞",
      "音楽鑑賞",
      "美術",
      "読書",
      "漫画",
      "ゲーム",
      "個人開発",
    ],
  },

  hero: {
    description:
      "UI品質、アクセシビリティ、パフォーマンスを重視したWeb開発に取り組んでいます。",
  },

  about: {
    labels: {
      name: "名前",
      birthplace: "出身地",
      birthDate: "生年月日",
      hobbies: "趣味",
    },
    filmPortfolio: {
      heading: "映像作家としてのポートフォリオ",
      title: "Mido Works",
      description: "Mido名義で制作に関わった作品のポートフォリオです。",
      openLabel: "映像作家としてのポートフォリオを新しいタブで開く",
    },
    interests: {
      heading: "読書と映画の記録",
      description:
        "読んだ本と観た映画を、小さなデータプロダクトとして記録しています。棚板とポップコーンの行方も追跡中です。",
      linkLabel: "Books & Moviesを見る",
    },
  },

  interests: {
    eyebrow: "Books / Movies / Strange Metrics",
    title: "Interests",
    description:
      "読書と映画鑑賞の記録。数字は真面目に、見方は少しだけ変に。",
    tabs: {
      label: "趣味の記録を切り替える",
      books: "Books",
      movies: "Movies",
    },
    common: {
      estimated: "推定",
      measured: "実測",
      entries: "件",
      noData: "記録はまだありません。",
    },
    books: {
      heading: "Books",
      intro: "積み上がったページと、耐えてきた棚板の記録。",
      summaryHeading: "Reading summary",
      metrics: {
        completed: "読了",
        pages: "総ページ数",
        weight: "読了した本の総重量",
        reading: "読書中",
        backlog: "積読",
        destroyed: "壊れた棚板",
      },
      units: {
        books: "冊",
        pages: "ページ",
        kilograms: "kg",
        shelves: "枚",
      },
      warningsHeading: "Notes from the shelf",
      warnings: {
        backlogGrowing: "積読が増えています。",
        stopBuying: "もう本を買うな！まず読め！",
        criticalBacklog: "本屋に行く前に、このページを見ろ。",
        parallelReading: "また並行して読んでいます。",
        oneAtATime: "一冊ずつ読め。",
      },
      shelf: {
        heading: "Shelf status",
        damage: "棚板のダメージ",
        currentWeight: "現在の推定重量",
        destroyedCopy: "これまでに{count}枚の棚板を壊しました。",
        sourceManufacturer: "メーカー公称値を基準",
        sourceAssumption: "{capacity}kgの基準値から算出",
        stageMessages: {
          1: "割れるまでかなり時間がかかりそう。",
          2: "割れるまでまだまだ時間がかかりそう。",
          3: "ときどき軋んでいるみたい。割れるまでもうちょっとかな？",
          4: "棚板から音が聞こえてくる！もうすぐ割れそう！",
        },
        nearLimit: "そろそろ限界",
        exceeded: "棚板のダメージが100%を超えています",
        disclaimer:
          "この値はコミカルな参考指標で、構造上の安全性を保証するものではありません。",
        illustrationAlt: "本の重みで大きくしなる棚板のイラスト",
      },
      lists: {
        currentlyReading: "Currently reading",
        backlog: "Backlog",
        completed: "Completed",
        columns: {
          title: "タイトル",
          author: "著者名",
          publisher: "出版社",
          format: "本のタイプ",
          pages: "ページ数",
          weight: "推定重量",
          isbn: "ISBNコード",
        },
        formats: {
          bunko: "文庫",
          shinsho: "新書",
          comicSmall: "コミック（小判）",
          comicLarge: "コミック（大判）",
          shiroku: "四六判",
          b6: "B6判",
          a5: "A5判",
          b5: "B5判",
          custom: "その他",
        },
      },
    },
    movies: {
      heading: "Movies",
      intro: "暗転してからエンドロールまで。鑑賞時間を別の単位でも眺めます。",
      summaryHeading: "Movie summary",
      metrics: {
        watched: "鑑賞回数",
        hours: "総鑑賞時間",
        thisYear: "今年",
        theaters: "映画館",
        rewatched: "再鑑賞した作品",
        favorites: "お気に入り",
      },
      units: {
        movies: "本",
        hours: "時間",
      },
      watchTime: {
        heading: "人生のうち映画に使った時間",
        prefix: "これまで映画に",
        days: "日",
        hours: "時間",
        minutes: "分",
        suffix: "使いました。",
      },
      film: {
        heading: "35mmフィルム換算",
        description: "35mm / 4-perf / 24fpsで上映したと仮定した換算値です。",
        length: "フィルム長",
        reels: "2000ftリール",
        earth: "地球",
        reelsUnit: "本分",
        earthUnit: "周分",
      },
      popcorn: {
        heading: "推定ポップコーン消費量",
        description:
          "映画館で観た全作品で、毎回Mサイズを食べていたとすると……",
        buckets: "個",
        disclaimer:
          "100g / 500kcalを基準にした完全な仮定で、実際の摂取量ではありません。",
      },
      rankings: {
        heading: "Patterns",
        genres: "よく観るジャンル",
        directors: "何度も戻ってくる監督",
        decades: "よく観る年代",
        countries: "制作国",
        genreNote: "1作品ごとの複数ジャンルを集計",
        location: "映画館 / 自宅",
      },
      history: {
        heading: "Watch history",
        title: "タイトル",
        originalTitle: "原題",
        releaseYear: "公開年",
        watchedAt: "鑑賞日",
        runtime: "上映時間（分）",
        genres: "ジャンル",
        locations: {
          theater: "映画館",
          home: "自宅",
          other: "その他",
        },
      },
    },
  },

  skills: {
    categories: {
      frontend: "フロントエンド",
      backend: "バックエンド",
      database: "データベース",
      engineering: "エンジニアリング",
      aiDevelopment: "AI",
    },

    html5: "HTML",
    css: "CSS",
    typescript: "TypeScript",
    javascript: "JavaScript",
    jquery: "jQuery",
    react: "React",
    nextjs: "Next.js",
    tailwindcss: "Tailwind CSS",
    storybook: "Storybook",
    zod: "Zod",

    java: "Java",
    springboot: "Spring Boot",
    thymeleaf: "Thymeleaf",
    python: "Python",
    fastapi: "FastAPI",

    postgresql: "PostgreSQL",
    prisma: "Prisma",
    flyway: "Flyway",

    git: "Git",
    githubactions: "GitHub Actions",
    linux: "Linux",
    apachemaven: "Apache Maven",
    apachejmeter: "Apache JMeter",
    gradle: "Gradle",
    junit5: "JUnit 5",
    intellijidea: "IntelliJ IDEA",

    claudecode: "Claude Code",
    cursor: "Cursor",
    githubcopilot: "GitHub Copilot",
    codex: "Codex",
  },

  posts: {
    publishedAt: "投稿日",
    updatedAt: "最終更新日",
    emptyMessage: "投稿はありません。",
    backToPosts: "Posts一覧へ戻る",
  },

  projects: {
    externalSite: "外部サイト",
    technologies: "使用技術",
    emptyMessage: "プロジェクトは現在準備中です。",
  },

  experience: {
    present: "現在",
    openOfficialSite: "新しいタブで公式サイトを開く",
    showProjects: "詳細を見る",
    hideProjects: "詳細を閉じる",
    technologies: "主な技術",
  },
};
