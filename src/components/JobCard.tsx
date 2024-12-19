import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string;
  salaryRange?: string;
  applicationUrl?: string;
}

export const JobCard = ({
  title,
  company,
  location,
  description,
  requirements,
  salaryRange,
  applicationUrl,
}: JobCardProps) => {
  const handleApply = () => {
    if (applicationUrl) {
      window.open(applicationUrl, '_blank');
    } else {
      window.open(`mailto:${company.toLowerCase().replace(/\s+/g, '')}@example.com?subject=Application for ${title}`);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge variant="outline" className="bg-whisper-50 text-whisper-700">
            {company}
          </Badge>
          {salaryRange && (
            <span className="text-sm text-gray-500">{salaryRange}</span>
          )}
        </div>
        <h3 className="font-playfair text-lg sm:text-xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{location}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 line-clamp-3">{description}</p>
        {requirements && (
          <div className="text-sm text-gray-600">
            <strong>Requirements:</strong>
            <p className="mt-1">{requirements}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleApply}
          className="w-full flex items-center justify-center gap-2"
        >
          Apply Now
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};