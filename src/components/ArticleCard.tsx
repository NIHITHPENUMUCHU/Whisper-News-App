import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { VoteButtons } from "./VoteButtons";

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl?: string;
  likes: number;
  dislikes: number;
  status?: string;
  onVoteChange?: () => void;
}

export const ArticleCard = ({
  id,
  title,
  excerpt,
  category,
  date,
  author,
  imageUrl,
  likes,
  dislikes,
  status,
  onVoteChange,
}: ArticleCardProps) => {
  const isArchived = status === "archived" || status === "deleted";

  return (
    <Card className={`overflow-hidden transition-shadow duration-300 animate-fade-in h-full flex flex-col ${
      isArchived ? 'opacity-75 hover:opacity-100' : 'hover:shadow-lg'
    }`}>
      {imageUrl && (
        <div className="w-full h-48 sm:h-40 lg:h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              !isArchived && 'hover:scale-105'
            }`}
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
        <h3 className={`font-playfair text-lg sm:text-xl font-semibold leading-tight ${
          !isArchived && 'hover:text-whisper-500'
        } transition-colors`}>
          {title}
        </h3>
        {status && (
          <Badge variant="secondary" className="mt-2">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">{excerpt}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            By {author === "anonymous" ? "Anonymous" : author}
          </p>
          {!isArchived && (
            <VoteButtons 
              articleId={id} 
              initialLikes={likes} 
              initialDislikes={dislikes}
              onVoteChange={onVoteChange}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};