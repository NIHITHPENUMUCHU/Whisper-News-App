import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
}

export const ArticleCard = ({
  title,
  excerpt,
  category,
  date,
  author,
}: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-whisper-50 text-whisper-700">
            {category}
          </Badge>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h3 className="font-playfair text-xl font-semibold leading-tight hover:text-whisper-500 transition-colors cursor-pointer">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-600 line-clamp-3">{excerpt}</p>
        <p className="text-sm text-gray-500">
          By {author === "anonymous" ? "Anonymous" : author}
        </p>
      </CardContent>
    </Card>
  );
};