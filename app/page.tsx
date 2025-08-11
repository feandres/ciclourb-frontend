import { Hero } from "@/components/hero";

export default function HomePage() {
  const mockArticles = [
    { title: "Artigo 1", description: "Descrição do artigo 1." },
    { title: "Artigo 2", description: "Descrição do artigo 2." },
    { title: "Artigo 3", description: "Descrição do artigo 3." },
  ];

  return (
    <>
      <Hero />

      <section className="container mx-auto py-12 px-4 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {mockArticles.map((article, idx) => (
          <article
            key={idx}
            className="rounded-lg border p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="mt-2 text-gray-600">{article.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
