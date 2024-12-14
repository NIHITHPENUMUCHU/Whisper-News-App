import { useState } from "react";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { SubmitArticle } from "@/components/SubmitArticle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PenLine, Filter, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

// Export mockArticles so it can be used in ArticleDetail
export const mockArticles = [
  {
    id: 1,
    title: "The Future of Sustainable Energy",
    excerpt: "Exploring the latest innovations in renewable energy and their impact on climate change. From solar power breakthroughs to wind energy advancements, discover how technology is shaping our sustainable future.",
    category: "Science",
    date: "2024-02-20",
    author: "anonymous",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: 2,
    title: "Breaking Records at the Winter Olympics",
    excerpt: "Athletes from around the world achieve unprecedented feats in multiple disciplines. Follow the stories of determination and excellence that defined this year's games.",
    category: "Sports",
    date: "2024-02-19",
    author: "Jane Smith",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: 3,
    title: "The Rise of Artificial Intelligence in Healthcare",
    excerpt: "How AI is revolutionizing medical diagnosis and treatment. From early disease detection to personalized medicine, explore the future of healthcare.",
    category: "Technology",
    date: "2024-02-18",
    author: "Dr. Robert Chen",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    id: 4,
    title: "Global Economic Trends 2024",
    excerpt: "Analysis of emerging markets, cryptocurrency developments, and international trade patterns shaping the world economy.",
    category: "Business",
    date: "2024-02-17",
    author: "anonymous",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  },
  {
    id: 5,
    title: "Revolutionary Breakthroughs in Quantum Computing",
    excerpt: "Latest developments in quantum computing and their potential impact on cryptography, drug discovery, and artificial intelligence.",
    category: "Technology",
    date: "2024-02-16",
    author: "Sarah Johnson",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  },
  {
    id: 6,
    title: "The Evolution of Remote Work Culture",
    excerpt: "How companies and employees are adapting to the new normal of hybrid work environments and digital collaboration.",
    category: "Business",
    date: "2024-02-15",
    author: "Mark Williams",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: 7,
    title: "Breakthrough in Renewable Energy Storage",
    excerpt: "Scientists develop new battery technology that could revolutionize how we store and use renewable energy.",
    category: "Science",
    date: "2024-02-14",
    author: "anonymous",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    id: 8,
    title: "The Future of Space Exploration",
    excerpt: "Latest developments in space technology and upcoming missions to Mars, the Moon, and beyond.",
    category: "Science",
    date: "2024-02-13",
    author: "Dr. Emily Parker",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    id: 9,
    title: "Cybersecurity Threats in the Digital Age",
    excerpt: "Understanding emerging cyber threats and how to protect yourself in an increasingly connected world.",
    category: "Technology",
    date: "2024-02-12",
    author: "Alex Thompson",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: 10,
    title: "The Impact of Social Media on Mental Health",
    excerpt: "Research findings on how social media usage affects mental well-being and recommendations for healthy digital habits.",
    category: "Health",
    date: "2024-02-11",
    author: "Dr. Maria Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const filteredArticles = mockArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Logo />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="cursor-pointer"
            >
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
