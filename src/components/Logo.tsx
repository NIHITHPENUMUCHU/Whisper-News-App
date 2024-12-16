import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl font-playfair font-bold text-whisper-900">Whisper News</span>
    </Link>
  );
};