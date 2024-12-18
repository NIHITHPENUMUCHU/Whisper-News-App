import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VoteButtons } from "@/components/VoteButtons";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: article, isLoading, refetch } = useQuery({
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

      if (error) {
        toast({
          title: "Error loading article",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  const handleVoteChange = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500">Article not found</h1>
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mt-4 hover:bg-whisper-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const isVideoUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('vimeo.com');
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
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
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          )}
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-playfair text-4xl font-bold">{article.title}</h1>
            <VoteButtons
              articleId={article.id}
              initialLikes={article.likes}
              initialDislikes={article.dislikes}
              onVoteChange={handleVoteChange}
            />
          </div>
          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
            <span>
              By {article.author === "anonymous" ? "Anonymous" : article.author}
            </span>
            <span className="bg-whisper-50 text-whisper-700 px-3 py-1 rounded-full text-sm">
              {article.category}
            </span>
          </div>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">{article.excerpt}</p>
            <div className="text-lg leading-relaxed mt-6 whitespace-pre-wrap">
              {article.content}
            </div>
            
            {article.article_links && article.article_links.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Related Content</h2>
                <div className="space-y-4">
                  {article.article_links.map((link) => (
                    <div key={link.id} className="rounded-lg border p-4">
                      {isVideoUrl(link.url) ? (
                        <div className="aspect-video">
                          <iframe
                            src={link.url.replace('watch?v=', 'embed/')}
                            title={link.title || "Related video"}
                            className="w-full h-full rounded"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-whisper-600 hover:text-whisper-800 hover:underline flex items-center gap-2"
                        >
                          {link.title || link.url}
                          <ArrowLeft className="h-4 w-4 rotate-180" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </ScrollArea>
  );
};

export default ArticleDetail;