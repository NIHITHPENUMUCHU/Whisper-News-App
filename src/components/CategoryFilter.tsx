import { Button } from "./ui/button";

export const categories = [
  "All",
  "World",
  "Sports",
  "Technology",
  "Entertainment",
  "Science",
  "Health",
] as const;

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className={`transition-all ${
            selectedCategory === category
              ? "bg-whisper-500 text-white hover:bg-whisper-600"
              : "hover:bg-whisper-50"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};