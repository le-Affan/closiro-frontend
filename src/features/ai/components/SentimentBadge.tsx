import React from 'react';
import { cn } from '@/lib/utils';
import { Chip } from '@/components/ui/chip';

interface SentimentBadgeProps {
  sentiment: 'Happy' | 'Neutral' | 'Frustrated' | 'Angry';
  score: number; // 0 to 100
}

export function SentimentBadge({ sentiment, score }: SentimentBadgeProps) {
  const getSentimentVariant = (s: string) => {
    switch (s) {
      case 'Happy': return 'success';
      case 'Neutral': return 'outline';
      case 'Frustrated': return 'warning';
      case 'Angry': return 'destructive';
      default: return 'outline';
    }
  };

  const getEmoji = (s: string) => {
    switch (s) {
      case 'Happy': return '😊';
      case 'Neutral': return '😐';
      case 'Frustrated': return '😩';
      case 'Angry': return '😡';
      default: return '😐';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Chip variant={getSentimentVariant(sentiment)}>
        <span className="mr-1">{getEmoji(sentiment)}</span>
        {sentiment}
      </Chip>
      <span className={cn("text-xs font-medium", 
        score >= 80 ? "text-success-600" :
        score <= 40 ? "text-error-600" :
        "text-neutral-500"
      )}>
        {score}% Score
      </span>
    </div>
  );
}
