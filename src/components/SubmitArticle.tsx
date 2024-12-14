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
import { toast } from "sonner";

export const SubmitArticle = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
    mediaUrls: [] as string[],
    links: [] as string[],
  });
  const [newLink, setNewLink] = useState("");

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these files to a server
      // For now, we'll create object URLs
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...urls],
      }));
    }
  };

  const handleAddLink = () => {
    if (newLink) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, newLink],
      }));
      setNewLink("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      ...formData,
      author: isAnonymous ? "anonymous" : formData.author,
    });
    toast.success("Article submitted for review!");
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

      <div className="space-y-2">
        <Label>Add Links</Label>
        <div className="flex gap-2">
          <Input
            type="url"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter URL"
            className="flex-1"
          />
          <Button type="button" onClick={handleAddLink}>Add</Button>
        </div>
        {formData.links.length > 0 && (
          <ul className="list-disc pl-5 space-y-1">
            {formData.links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-whisper-500 hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}
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