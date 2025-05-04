import React from "react";
import Image from "next/image";

async function getArticle(slug) {
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  return res.json();
}

export default async function BlogPost({ params }) {
  const { data } = await getArticle(params.slug);
  const article = data?.[0];

  if (!article) {
    return <div className="container mx-auto px-4 py-8">Article not found</div>;
  }
  console.log(article);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{article?.title}</h1>
      <p className="text-xl text-gray-600 mb-8">{article?.description}</p>

      {article && (
        <div className="relative h-64 w-full mb-6">
          <Image
            src={`http://localhost:1337${article.cover.url}`}
            alt={article.title}
            width={800}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
