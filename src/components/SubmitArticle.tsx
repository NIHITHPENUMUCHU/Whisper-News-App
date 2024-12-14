import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { categories } from "./CategoryFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SubmitArticle = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      ...formData,
      author: isAnonymous ? "anonymous" : formData.author,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <Label htmlFor="title">Article Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
          className="w-full"
          placeholder="Enter your article title"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="author">Author Name</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <label
              htmlFor="anonymous"
              className="text-sm text-gray-500 cursor-pointer"
            >
              Post Anonymously
            </label>
          </div>
        </div>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
          disabled={isAnonymous}
          required={!isAnonymous}
          className="w-full"
          placeholder={isAnonymous ? "Anonymous" : "Enter your name"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.slice(1).map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Article Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
          className="min-h-[200px]"
          placeholder="Write your article content here..."
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-whisper-500 hover:bg-whisper-600 text-white"
      >
        Submit Article for Review
      </Button>
    </form>
  );
};