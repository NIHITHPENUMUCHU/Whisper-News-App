import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="search"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 w-full bg-white border-gray-200 focus:border-whisper-500 transition-colors"
      />
    </div>
  );
};