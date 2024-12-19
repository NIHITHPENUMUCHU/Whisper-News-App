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
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      const { data: { ip } } = await (await fetch('https://api.ipify.org?format=json')).json();
      
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('article_votes')
        .select('*')
        .eq('article_id', articleId)
        .eq('ip_address', ip)
        .single();

      if (existingVote) {
        toast({
          title: "Already voted",
          description: "You have already voted on this article",
          variant: "destructive",
        });
        return;
      }

      // Record the vote
      const { error: voteError } = await supabase
        .from('article_votes')
        .insert([
          { article_id: articleId, ip_address: ip, vote_type: voteType }
        ]);

      if (voteError) {
        throw voteError;
      }

      // Update article vote count
      const newVotes = voteType === 'like' ? likes + 1 : dislikes + 1;
      const { error: updateError } = await supabase
        .from('articles')
        .update({
          [voteType === 'like' ? 'likes' : 'dislikes']: newVotes
        })
        .eq('id', articleId);

      if (updateError) {
        throw updateError;
      }

      if (voteType === 'like') {
        setLikes(likes + 1);
      } else {
        setDislikes(dislikes + 1);
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
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleVote('like')}
        className="flex items-center gap-2"
        disabled={isVoting}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleVote('dislike')}
        className="flex items-center gap-2"
        disabled={isVoting}
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{dislikes}</span>
      </Button>
    </div>
  );
};