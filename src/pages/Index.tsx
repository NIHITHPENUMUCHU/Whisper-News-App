import { useState } from "react";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { SubmitArticle } from "@/components/SubmitArticle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PenLine } from "lucide-react";

// Mock data for initial display
const mockArticles = [
  {
    id: 1,
    title: "The Future of Sustainable Energy",
    excerpt:
      "Exploring the latest innovations in renewable energy and their impact on climate change...",
    category: "Science",
    date: "2024-02-20",
    author: "anonymous",
  },
  {
    id: 2,
    title: "Breaking Records at the Winter Olympics",
    excerpt:
      "Athletes from around the world achieve unprecedented feats in multiple disciplines...",
    category: "Sports",
    date: "2024-02-19",
    author: "Jane Smith",
  },
  // Add more mock articles as needed
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = mockArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Logo />
            <div className="flex items-center gap-4">
              <SearchBar onSearch={setSearchQuery} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-whisper-500 hover:bg-whisper-600 text-white">
                    <PenLine className="mr-2 h-4 w-4" />
                    Submit Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <SubmitArticle />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;