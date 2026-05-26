import React, { useEffect, useState } from 'react';

type Insights = { min: number; max: number; avg: number; count?: number; median?: number };

export default function CountryInsights({ country }: { country: string }) {
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/insights/country/${country}`)
      .then((r) => r.json())
      .then((data) => { if (mounted) setInsights(data); })
      .catch(() => { if (mounted) setInsights(null); });
    return () => { mounted = false; };
  }, [country]);

  if (!insights) return <div>Loading insights...</div>;

  return (
    <div>
      <h3>Insights for {country}</h3>
      <div>Minimum: {insights.min}</div>
      <div>Maximum: {insights.max}</div>
      <div>Average: {insights.avg}</div>
      {typeof insights.count !== 'undefined' && <div>Count: {insights.count}</div>}
      {typeof insights.median !== 'undefined' && <div>Median: {insights.median}</div>}
    </div>
  );
}
