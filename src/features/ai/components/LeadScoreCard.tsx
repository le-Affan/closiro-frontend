import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface LeadScoreCardProps {
  score: number; // 0 to 100
  trend: 'up' | 'down' | 'stable';
  factors: string[];
}

export function LeadScoreCard({ score, trend, factors }: LeadScoreCardProps) {
  return (
    <Card className="border-none shadow-none rounded-none border-b border-neutral-100">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center justify-between">
          <span>Lead Score</span>
          <span className="text-xs text-neutral-400 font-normal">Powered by AI</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-end space-x-3 mb-4">
          <span className="text-4xl font-bold text-neutral-900">{score}</span>
          <span className={`text-sm mb-1 font-medium ${
            trend === 'up' ? 'text-success-600' : trend === 'down' ? 'text-error-600' : 'text-neutral-500'
          }`}>
            {trend === 'up' ? '↑ Increasing' : trend === 'down' ? '↓ Decreasing' : '→ Stable'}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-neutral-700">Key Factors:</p>
          <ul className="text-xs text-neutral-600 space-y-1 list-disc list-inside">
            {factors.map((factor, idx) => (
              <li key={idx}>{factor}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
