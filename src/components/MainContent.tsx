import { ArticleCard } from "./ArticleCard";
import { CategoryFilter } from "./CategoryFilter";
import { JobCard } from "./JobCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { format } from "date-fns";

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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="jobs">Job Openings</TabsTrigger>
        </TabsList>

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