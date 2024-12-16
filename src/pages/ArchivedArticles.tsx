import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "@/components/ArticleCard";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ArchivedArticles = () => {
  const navigate = useNavigate();

  const { data: articles = [] } = useQuery({
    queryKey: ["archived-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .in("status", ["archived", "deleted"])
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-playfair font-bold">Archived Articles</h1>
          <p className="text-gray-600 mt-2">
            These articles have been archived or deleted and are no longer active.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="opacity-75">
              <ArticleCard
                id={article.id}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                date={format(new Date(article.created_at), "MMM dd, yyyy")}
                author={article.author}
                imageUrl={article.image_url}
                likes={article.likes}
                dislikes={article.dislikes}
                status={article.status}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivedArticles;