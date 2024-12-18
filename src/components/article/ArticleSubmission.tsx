import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArticleForm, ArticleFormData } from "./ArticleForm";

export const ArticleSubmission = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: ArticleFormData) => {
    setIsSubmitting(true);

    try {
      const excerpt = formData.content.slice(0, 150) + "...";
      
      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title: formData.title,
            author: formData.isAnonymous ? "anonymous" : formData.author,
            category: formData.category,
            content: formData.content,
            excerpt: excerpt,
            image_url: formData.mediaUrls[0] || null,
            status: 'published'
          }
        ])
        .select();

      if (error) throw error;

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
    <div className="max-w-2xl mx-auto p-6">
      <ArticleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};