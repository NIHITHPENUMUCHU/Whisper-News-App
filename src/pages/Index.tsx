import { useState } from "react";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ArticleCard } from "@/components/ArticleCard";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { SubmitArticle } from "@/components/SubmitArticle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PenLine, Filter, Search, Archive } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Fetch articles
  const { data: articles = [], refetch: refetchArticles } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Fetch jobs
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  const handleArchiveClick = () => {
    navigate('/archived');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo />
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2"
                onClick={handleArchiveClick}
              >
                <Archive className="h-4 w-4" />
                Archived Articles
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              {isMobile ? (
                <>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="w-full p-4">
                      <SearchBar onSearch={setSearchQuery} />
                    </SheetContent>
                  </Sheet>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[50vh]">
                      <div className="py-4">
                        <CategoryFilter
                          selectedCategory={selectedCategory}
                          onSelectCategory={setSelectedCategory}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleArchiveClick}
                    className="md:hidden"
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <SearchBar onSearch={setSearchQuery} />
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-whisper-500 hover:bg-whisper-600 text-white whitespace-nowrap">
                    <PenLine className="mr-2 h-4 w-4" />
                    {isMobile ? "Submit" : "Submit Article"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <SubmitArticle />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isMobile && (
          <div className="mb-8 overflow-x-auto -mx-4 px-4 pb-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
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
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article.id)}
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
              {filteredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;