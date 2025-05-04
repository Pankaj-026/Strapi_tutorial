import Link from "next/link";
import Image from "next/image";

async function getArticles() {
  const res = await fetch("http://localhost:1337/api/articles?populate=*", {
    next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const json = await res.json();
  return json.data;
}

export default async function Blog() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            href={`/blogpost/${article?.slug}`}
            key={article.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            {article?.cover?.data?.url && (
              <div className="relative h-48 w-full">
                <Image
                  src={`http://localhost:1337${article?.cover?.data?.url}`}
                  alt={article?.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article?.title}</h2>
              <p className="text-gray-600 mb-4">{article?.description}</p>
              {article?.category?.name && (
                <div className="text-gray-500 text-sm">
                  {article?.category?.name}
                </div>
              )}
              <span className="text-blue-600 font-medium">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
