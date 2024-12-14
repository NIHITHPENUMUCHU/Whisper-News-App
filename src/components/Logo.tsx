import { Newspaper } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Logo = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center gap-2">
      <Newspaper className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-whisper-500`} />
      <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-playfair font-semibold`}>
        Whisper News
      </span>
    </div>
  );
};