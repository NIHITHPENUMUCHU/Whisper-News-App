import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { MainHeader } from "@/components/MainHeader";
import { MainContent } from "@/components/MainContent";

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

      if (error) {
        console.error("Error fetching articles:", error);
        return [];
      }
      return data || [];
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

      if (error) {
        console.error("Error fetching jobs:", error);
        return [];
      }
      return data || [];
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
      <MainHeader
        onSearch={setSearchQuery}
        onArchiveClick={handleArchiveClick}
        isMobile={isMobile}
      />
      <MainContent
        articles={filteredArticles}
        jobs={filteredJobs}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onArticleClick={handleArticleClick}
        isMobile={isMobile}
        refetchArticles={refetchArticles}
      />
    </div>
  );
};

export default Index;