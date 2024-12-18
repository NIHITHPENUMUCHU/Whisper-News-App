import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { categories } from "../CategoryFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ArticleFormProps {
  onSubmit: (formData: ArticleFormData) => void;
  isSubmitting: boolean;
}

export interface ArticleFormData {
  title: string;
  author: string;
  category: string;
  content: string;
  mediaUrls: string[];
  links: string[];
  isAnonymous: boolean;
}

export const ArticleForm = ({ onSubmit, isSubmitting }: ArticleFormProps) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    author: "",
    category: "",
    content: "",
    mediaUrls: [],
    links: [],
    isAnonymous: false,
  });

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...urls],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, isAnonymous });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="space-y-2">
        <Label>Media (Images/Videos)</Label>
        <Input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaUpload}
          className="w-full"
        />
        {formData.mediaUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {formData.mediaUrls.map((url, index) => (
              <div key={index} className="relative">
                {url.includes('video') ? (
                  <video src={url} className="w-full h-32 object-cover rounded" controls />
                ) : (
                  <img src={url} alt="" className="w-full h-32 object-cover rounded" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-whisper-500 hover:bg-whisper-600 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Publishing..." : "Publish Article"}
      </Button>
    </form>
  );
};