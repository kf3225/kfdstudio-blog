export const tags = [
  "DuckDB",
  "dbt",
  "Airflow",
  "AWS",
  "Step Functions",
  "Data Engineering",
  "Python",
  "SolidJS",
  "Kobalte",
  "tailwindcss",
  "Zig",
];
type ArrayToUnion<T extends readonly string[]> = T[number];
type Tag = ArrayToUnion<typeof tags>;

type Post = {
  id: number;
  url: string;
  title: string;
  tags: Tag[];
};

export const posts: Post[] = [
  {
    id: 202411041801,
    url: "https://zenn.dev/keisukef/scraps/fed370d4025da8",
    title: "Zigに入門する",
    tags: ["Zig"],
  },
  {
    id: 202410192320,
    url: "https://zenn.dev/keisukef/scraps/106cfdc595d7ce",
    title: "Kobalteのダイアグラムを開閉する際のアニメーション付与",
    tags: ["SolidJS", "Kobalte", "tailwindcss"],
  },
  {
    id: 202410150000,
    url: "https://zenn.dev/keisukef/articles/8b5f5b352db5b8",
    title: "CDCとSCDについて",
    tags: ["Data Engineering"],
  },
  {
    id: 202409281640,
    url: "https://zenn.dev/keisukef/scraps/d13f13fcf504b7",
    title: "DuckDBでGoogle Sheetsのデータをクエリしてみる",
    tags: ["DuckDB"],
  },
  {
    id: 202408241912,
    url: "https://note.com/fkeisuke/n/na8953c7838f9",
    title: "Step Functionsの入力値チェックについて",
    tags: ["AWS", "Step Functions"],
  },
  {
    id: 202406082235,
    url: "https://note.com/fkeisuke/n/n855a2e35d433",
    title: "Minio + DuckDB + dbt + Airflowでローカルにデータ基盤を立ててみる",
    tags: ["DuckDB", "Airflow", "dbt"],
  },
].sort((prev, next) => next.id - prev.id);
