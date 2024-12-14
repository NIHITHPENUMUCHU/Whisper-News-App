import { Newspaper } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Newspaper className="w-8 h-8 text-whisper-500" />
      <span className="text-2xl font-playfair font-semibold">Whisper News</span>
    </div>
  );
};