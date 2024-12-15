import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          article_links (
            id,
            url,
            title
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!article) {
    return <div className="container mx-auto px-4 py-8">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6 hover:bg-whisper-50"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      <article className="max-w-4xl mx-auto">
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="font-playfair text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{new Date(article.date).toLocaleDateString()}</span>
          <span>
            By {article.author === "anonymous" ? "Anonymous" : article.author}
          </span>
          <span className="bg-whisper-50 text-whisper-700 px-3 py-1 rounded-full text-sm">
            {article.category}
          </span>
        </div>
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{article.excerpt}</p>
          <div className="text-lg leading-relaxed mt-6">{article.content}</div>
          
          {article.article_links && article.article_links.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Related Links</h2>
              <ul className="space-y-2">
                {article.article_links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-whisper-600 hover:text-whisper-800 hover:underline"
                    >
                      {link.title || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;