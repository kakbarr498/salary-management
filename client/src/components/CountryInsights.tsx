import React, { useEffect, useState } from 'react';

type Insights = { min: number; max: number; avg: number; count?: number; median?: number };

export default function CountryInsights({ country, jobTitle }: { country: string; jobTitle?: string }) {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [jobAvg, setJobAvg] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/insights/country/${country}`)
      .then((r) => r.json())
      .then((data) => { if (mounted) setInsights(data); })
      .catch(() => { if (mounted) setInsights(null); });
    return () => { mounted = false; };
  }, [country]);

  useEffect(() => {
    if (!jobTitle) return;
    let mounted = true;
    fetch(`/api/insights/job/${encodeURIComponent(jobTitle)}/country/${country}`)
      .then((r) => r.json())
      .then((data) => { if (mounted && typeof data.avg === 'number') setJobAvg(data.avg); })
      .catch(() => { if (mounted) setJobAvg(null); });
    return () => { mounted = false; };
  }, [country, jobTitle]);

  if (!insights) return <div>Loading insights...</div>;

  return (
    <div className="insights-panel">
      <h3>Insights for {country}</h3>
      <div>Minimum: {insights.min.toFixed(2)}</div>
      <div>Maximum: {insights.max.toFixed(2)}</div>
      <div>Average: {insights.avg.toFixed(2)}</div>
      {typeof insights.count !== 'undefined' && <div>Count: {insights.count}</div>}
      {typeof insights.median !== 'undefined' && <div>Median: {insights.median.toFixed(2)}</div>}
      {jobTitle && (jobAvg === null ? <div>Loading {jobTitle} avg...</div> : <div>Avg for {jobTitle}: {jobAvg.toFixed(2)}</div>)}
    </div>
  );
}
