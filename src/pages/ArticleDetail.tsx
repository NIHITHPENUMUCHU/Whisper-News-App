import { useParams } from "react-router-dom";
import { mockArticles } from "./Index";

const ArticleDetail = () => {
  const { id } = useParams();
  const article = mockArticles.find((a) => a.id === Number(id));

  if (!article) {
    return <div className="container mx-auto px-4 py-8">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="font-playfair text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{article.date}</span>
          <span>By {article.author === "anonymous" ? "Anonymous" : article.author}</span>
          <span className="bg-whisper-50 text-whisper-700 px-3 py-1 rounded-full text-sm">
            {article.category}
          </span>
        </div>
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{article.excerpt}</p>
          {/* Add more content sections here */}
          <p className="text-lg leading-relaxed mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;