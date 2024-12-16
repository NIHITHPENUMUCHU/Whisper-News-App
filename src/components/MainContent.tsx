import { ArticleCard } from "./ArticleCard";
import { CategoryFilter } from "./CategoryFilter";
import { JobCard } from "./JobCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

interface MainContentProps {
  articles: any[];
  jobs: any[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onArticleClick: (id: number) => void;
  isMobile: boolean;
  refetchArticles: () => void;
}

export const MainContent = ({
  articles,
  jobs,
  selectedCategory,
  onSelectCategory,
  onArticleClick,
  isMobile,
  refetchArticles,
}: MainContentProps) => {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      {!isMobile && (
        <div className="mb-8 overflow-x-auto -mx-4 px-4 pb-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>
      )}

      <Tabs defaultValue="articles" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => navigate('/submit-article')}
            className="bg-whisper-500 hover:bg-whisper-600"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Write Article
          </Button>
        </div>

        <TabsContent value="articles">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => onArticleClick(article.id)}
                className="cursor-pointer"
              >
                <ArticleCard
                  id={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  date={format(new Date(article.created_at), 'MMM dd, yyyy')}
                  author={article.author}
                  imageUrl={article.image_url}
                  likes={article.likes}
                  dislikes={article.dislikes}
                  onVoteChange={refetchArticles}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};