import React from 'react';
import { Activity } from 'lucide-react';

export const LiveEventFeed = ({ events = [], maxItems = 6, title = "Live Operations Feed", subtitle = "Replay-Derived Events" }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Activity size={16} className="text-railway-blue" />
          {title}
        </h3>
        <span className="text-xs text-muted">{subtitle}</span>
      </div>
      <div className="event-feed-list">
        {events.slice(0, maxItems).map(ev => (
          <div key={ev.id} className={`event-feed-item event-${ev.type || 'normal'}`}>
            <span className="event-time">{ev.time}</span>
            <span className="event-train">{ev.train}</span>
            <span className="event-desc">{ev.event}</span>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-xs text-muted text-center p-3">No active event telemetry</div>
        )}
      </div>
    </div>
  );
};

export default LiveEventFeed;
