import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const JobSubmission = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salaryRange: "",
    applicationUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("jobs").insert([
        {
          title: formData.title,
          company: formData.company,
          location: formData.location,
          description: formData.description,
          requirements: formData.requirements,
          salary_range: formData.salaryRange,
          application_url: formData.applicationUrl,
          status: "active",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your job posting has been submitted successfully.",
      });

      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: "",
        salaryRange: "",
        applicationUrl: "",
      });
    } catch (error) {
      console.error("Error submitting job:", error);
      toast({
        title: "Error",
        description: "Failed to submit job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
          placeholder="Enter job title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          required
          placeholder="Enter company name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
          placeholder="Enter job location"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          placeholder="Enter job description"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) =>
            setFormData({ ...formData, requirements: e.target.value })
          }
          placeholder="Enter job requirements"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="salaryRange">Salary Range</Label>
        <Input
          id="salaryRange"
          value={formData.salaryRange}
          onChange={(e) =>
            setFormData({ ...formData, salaryRange: e.target.value })
          }
          placeholder="e.g., $50,000 - $70,000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationUrl">Application URL</Label>
        <Input
          id="applicationUrl"
          value={formData.applicationUrl}
          onChange={(e) =>
            setFormData({ ...formData, applicationUrl: e.target.value })
          }
          placeholder="Enter application URL"
          type="url"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-whisper-500 hover:bg-whisper-600 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Job Posting"}
      </Button>
    </form>
  );
};