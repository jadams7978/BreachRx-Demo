// ===============================================
// components/BreachTimelineExplorer.tsx
// ===============================================
'use client';

import { useMemo, useState } from 'react';
import IncidentForm from './IncidentForm';
import TimelineResults from './TimelineResults';
import {
  DEFAULT_INCIDENT_INPUT,
  getMatchedObligations,
  type IncidentInput,
} from '@/lib/rules';

export default function BreachTimelineExplorer() {
  const [incident, setIncident] = useState<IncidentInput>(
    DEFAULT_INCIDENT_INPUT,
  );

  const obligations = useMemo(
    () => getMatchedObligations(incident),
    [incident],
  );

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <IncidentForm value={incident} onChange={setIncident} />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <TimelineResults obligations={obligations} />
      </div>
    </section>
  );
}