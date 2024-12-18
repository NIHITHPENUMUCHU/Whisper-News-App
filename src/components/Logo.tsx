import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Newspaper className="h-8 w-8 text-whisper-500" />
      <span className="text-2xl font-playfair font-bold text-whisper-900">Whisper News</span>
    </Link>
  );
};