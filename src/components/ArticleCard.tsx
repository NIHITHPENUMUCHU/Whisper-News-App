import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl?: string;
}

export const ArticleCard = ({
  title,
  excerpt,
  category,
  date,
  author,
  imageUrl,
}: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in h-full flex flex-col">
      {imageUrl && (
        <div className="w-full h-48 sm:h-40 lg:h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge variant="outline" className="bg-whisper-50 text-whisper-700">
            {category}
          </Badge>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h3 className="font-playfair text-lg sm:text-xl font-semibold leading-tight hover:text-whisper-500 transition-colors">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="space-y-2 flex-grow">
        <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">{excerpt}</p>
        <p className="text-sm text-gray-500">
          By {author === "anonymous" ? "Anonymous" : author}
        </p>
      </CardContent>
    </Card>
  );
};