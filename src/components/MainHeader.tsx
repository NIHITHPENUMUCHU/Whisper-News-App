import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { PenLine, Filter, Search, Archive } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { SubmitArticle } from "./SubmitArticle";

interface MainHeaderProps {
  onSearch: (query: string) => void;
  onArchiveClick: () => void;
  isMobile: boolean;
}

export const MainHeader = ({ onSearch, onArchiveClick, isMobile }: MainHeaderProps) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2"
              onClick={onArchiveClick}
            >
              <Archive className="h-4 w-4" />
              Archived Articles
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            {isMobile ? (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="top" className="w-full p-4">
                    <SearchBar onSearch={onSearch} />
                  </SheetContent>
                </Sheet>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[50vh]">
                    <div className="py-4">
                      {/* CategoryFilter component will be passed as children if needed */}
                    </div>
                  </SheetContent>
                </Sheet>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onArchiveClick}
                  className="md:hidden"
                >
                  <Archive className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <SearchBar onSearch={onSearch} />
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-whisper-500 hover:bg-whisper-600 text-white whitespace-nowrap">
                  <PenLine className="mr-2 h-4 w-4" />
                  {isMobile ? "Submit" : "Submit Article"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <SubmitArticle />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};