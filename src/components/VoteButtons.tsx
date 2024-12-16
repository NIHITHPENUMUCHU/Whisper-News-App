import { useState } from "react";
import { Button } from "./ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VoteButtonsProps {
  articleId: number;
  initialLikes: number;
  initialDislikes: number;
  onVoteChange?: () => void;
}

export const VoteButtons = ({ 
  articleId, 
  initialLikes, 
  initialDislikes,
  onVoteChange 
}: VoteButtonsProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const { toast } = useToast();

  const handleVote = async (voteType: 'like' | 'dislike') => {
    try {
      const { data: { ip } } = await (await fetch('https://api.ipify.org?format=json')).json();
      
      const { error } = await supabase
        .from('article_votes')
        .insert([
          { article_id: articleId, ip_address: ip, vote_type: voteType }
        ]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already voted",
            description: "You have already voted on this article",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      const newVotes = voteType === 'like' ? likes + 1 : dislikes + 1;
      
      await supabase
        .from('articles')
        .update({
          [voteType === 'like' ? 'likes' : 'dislikes']: newVotes
        })
        .eq('id', articleId);

      if (voteType === 'like') {
        setLikes(likes + 1);
      } else {
        setDislikes(dislikes + 1);
        if (dislikes + 1 >= 100) {
          await supabase
            .from('articles')
            .delete()
            .eq('id', articleId);
          
          toast({
            title: "Article Removed",
            description: "This article has been removed due to high number of dislikes",
          });
          
          if (onVoteChange) {
            onVoteChange();
          }
          return;
        }
      }

      toast({
        title: "Vote Recorded",
        description: `Your ${voteType} has been recorded`,
      });

      if (onVoteChange) {
        onVoteChange();
      }
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleVote('like')}
        className="flex items-center gap-2"
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleVote('dislike')}
        className="flex items-center gap-2"
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{dislikes}</span>
      </Button>
    </div>
  );
};