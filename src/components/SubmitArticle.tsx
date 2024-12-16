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
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const SubmitArticle = () => {
  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAddLink = () => {
    if (newLink) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, newLink],
      }));
      setNewLink("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const excerpt = formData.content.slice(0, 150) + "...";
      
      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title: formData.title,
            author: isAnonymous ? "anonymous" : formData.author,
            category: formData.category,
            content: formData.content,
            excerpt: excerpt,
            image_url: formData.mediaUrls[0] || null,
            status: 'published'
          }
        ])
        .select();

      if (error) throw error;

      if (data && data[0] && formData.links.length > 0) {
        const articleId = data[0].id;
        const linksToInsert = formData.links.map(url => ({
          article_id: articleId,
          url,
        }));

        const { error: linksError } = await supabase
          .from('article_links')
          .insert(linksToInsert);

        if (linksError) throw linksError;
      }

      toast.success("Article published successfully!");
      navigate('/');
    } catch (error) {
      console.error('Error submitting article:', error);
      toast.error("Failed to publish article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Publishing..." : "Publish Article"}
      </Button>
    </form>
  );
};