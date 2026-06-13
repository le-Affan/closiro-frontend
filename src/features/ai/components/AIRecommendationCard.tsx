import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BoltIcon from '@mui/icons-material/Bolt';

interface Recommendation {
  id: string;
  text: string;
  actionText?: string;
}

interface AIRecommendationCardProps {
  recommendations: Recommendation[];
}

export function AIRecommendationCard({ recommendations }: AIRecommendationCardProps) {
  return (
    <Card className="border-info-200 bg-info-50/50 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center text-info-900">
          <BoltIcon sx={{ width: 16, height: 16 }} className="mr-2" />
          Next Best Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {recommendations.map(rec => (
          <div key={rec.id} className="flex flex-col space-y-2 p-3 bg-white rounded-md border border-info-100">
            <p className="text-sm text-neutral-800">{rec.text}</p>
            {rec.actionText && (
              <Button size="sm" variant="outline" className="w-fit text-xs h-7 border-info-200 text-info-700 hover:bg-info-50">
                {rec.actionText}
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
