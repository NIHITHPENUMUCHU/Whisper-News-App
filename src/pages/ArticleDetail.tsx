import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Clock, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VoteButtons } from "@/components/VoteButtons";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  const isVideoUrl = (url: string) => {
    return url?.includes('youtube.com') || url?.includes('vimeo.com');
  };

  const formatYouTubeUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
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
        
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {article.image_url && (
            <div className="relative w-full h-[400px] overflow-hidden">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
                loading="lazy"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-playfair text-4xl font-bold text-gray-900">{article.title}</h1>
              <VoteButtons
                articleId={article.id}
                initialLikes={article.likes}
                initialDislikes={article.dislikes}
                onVoteChange={handleVoteChange}
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{format(new Date(article.created_at), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span>{article.author === "anonymous" ? "Anonymous" : article.author}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Tag className="w-4 h-4 mr-2" />
                <Badge variant="secondary" className="bg-whisper-50 text-whisper-700">
                  {article.category}
                </Badge>
              </div>
              {article.updated_at && article.updated_at !== article.created_at && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Updated: {format(new Date(article.updated_at), 'MMMM dd, yyyy')}</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <div className="text-xl leading-relaxed text-gray-700 mb-8">
                <p className="font-medium">{article.excerpt}</p>
              </div>
              
              <Separator className="my-8" />
              
              <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap space-y-6">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {article.article_links && article.article_links.length > 0 && (
                <div className="mt-12 space-y-8">
                  <h2 className="text-2xl font-semibold mb-6">Related Content</h2>
                  <div className="grid gap-6">
                    {article.article_links.map((link: any) => (
                      <div key={link.id} className="rounded-lg border p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        {isVideoUrl(link.url) ? (
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">{link.title || "Related Video"}</h3>
                            <div className="aspect-video rounded-lg overflow-hidden">
                              <iframe
                                src={formatYouTubeUrl(link.url)}
                                title={link.title || "Related video"}
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              />
                            </div>
                          </div>
                        ) : (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-4 p-2 group"
                          >
                            <span className="text-whisper-600 group-hover:text-whisper-800 group-hover:underline flex-grow">
                              {link.title || link.url}
                            </span>
                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-whisper-600" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </ScrollArea>
  );
};

export default ArticleDetail;
