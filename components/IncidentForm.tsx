// ===============================================
// components/IncidentForm.tsx
// ===============================================
'use client';

import { useEffect, useMemo, useState } from 'react';
import type { IncidentInput, IncidentType, Region, DataCategory } from '@/lib/rules';
import {
  toLocalDatetimeInputValue,
  parseLocalDatetime,
} from '@/lib/datetime';

type Props = {
  value: IncidentInput;
  onChange: (next: IncidentInput) => void;
};

const INCIDENT_TYPES: { label: string; value: IncidentType }[] = [
  { label: 'Ransomware', value: 'ransomware' },
  { label: 'Lost device', value: 'lost_device' },
  { label: 'Vendor breach', value: 'vendor_breach' },
  { label: 'Phishing', value: 'phishing' },
];

const DATA_OPTIONS: { label: string; value: DataCategory }[] = [
  { label: 'Customer PII', value: 'customer_pii' },
  { label: 'Health/PHI', value: 'health_phi' },
  { label: 'Payment data', value: 'payment_data' },
  { label: 'Employee data', value: 'employee_data' },
];

const REGION_OPTIONS: { label: string; value: Region }[] = [
  { label: 'EU (GDPR)', value: 'eu' },
  { label: 'California (CCPA/CPRA)', value: 'california' },
  { label: 'New York (NY SHIELD)', value: 'new_york' },
  { label: 'US – Other', value: 'us_other' },
];

export default function IncidentForm({ value, onChange }: Props) {
  // Why: Use form-local primitives for inputs that don't map 1:1 to types.
  const [discoveredAtStr, setDiscoveredAtStr] = useState(
    toLocalDatetimeInputValue(value.discoveredAt),
  );
  const [incidentType, setIncidentType] = useState<IncidentType>(
    value.incidentType,
  );
  const [dataCategories, setDataCategories] = useState<Set<DataCategory>>(
    new Set(value.dataCategories),
  );
  const [regions, setRegions] = useState<Set<Region>>(new Set(value.regions));

  const nextIncident = useMemo<IncidentInput>(
    () => ({
      discoveredAt: parseLocalDatetime(discoveredAtStr),
      incidentType,
      dataCategories: Array.from(dataCategories),
      regions: Array.from(regions),
    }),
    [discoveredAtStr, incidentType, dataCategories, regions],
  );

  useEffect(() => {
    onChange(nextIncident);
  }, [nextIncident, onChange]);

  const toggleSet = <T,>(
    setter: React.Dispatch<React.SetStateAction<Set<T>>>,
    current: Set<T>,
    val: T,
  ) => {
    const next = new Set(current);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onChange(nextIncident);
      }}
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-brx-text-heading">
          Incident discovered at
        </label>
        <input
          type="datetime-local"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-brx-text-heading focus:border-brx-blue focus:outline-none focus:ring-1 focus:ring-brx-blue"
          value={discoveredAtStr}
          onChange={(e) => setDiscoveredAtStr(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-brx-text-heading">Incident type</label>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-brx-text-heading focus:border-brx-blue focus:outline-none focus:ring-1 focus:ring-brx-blue"
          value={incidentType}
          onChange={(e) => setIncidentType(e.target.value as IncidentType)}
        >
          {INCIDENT_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-brx-text-heading">Data involved</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {DATA_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-brx-text-body transition-colors hover:border-brx-blue"
            >
              <input
                type="checkbox"
                className="accent-brx-blue"
                checked={dataCategories.has(opt.value)}
                onChange={() =>
                  toggleSet(setDataCategories, dataCategories, opt.value)
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-brx-text-heading">Regions affected</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {REGION_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-brx-text-body transition-colors hover:border-brx-blue"
            >
              <input
                type="checkbox"
                className="accent-brx-blue"
                checked={regions.has(opt.value)}
                onChange={() => toggleSet(setRegions, regions, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="submit"
          className="rounded-full bg-brx-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brx-blue-hover"
        >
          Generate timeline
        </button>
        <span className="text-xs text-brx-text-body">
          Updates automatically on change.
        </span>
      </div>
    </form>
  );
}
