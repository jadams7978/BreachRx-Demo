import { addHours, truncateToMinute } from './datetime';

export type IncidentType = 'ransomware' | 'lost_device' | 'vendor_breach' | 'phishing';
export type DataCategory = 'customer_pii' | 'health_phi' | 'payment_data' | 'employee_data';
export type Region = 'eu' | 'california' | 'new_york' | 'us_other';

export type IncidentInput = {
  discoveredAt: Date;
  incidentType: IncidentType;
  dataCategories: DataCategory[];
  regions: Region[];
};

export type Obligation = {
  id: string;
  name: string;
  framework: string;
  notifyWho: string;
  windowHours: number;
  deadline: Date;
  description: string;
};

type Rule = {
  id: string;
  name: string;
  framework: string;
  notifyWho: string;
  windowHours: number;
  description: string;
  applies: (incident: IncidentInput) => boolean;
};

const RULES: Rule[] = [
  {
    id: 'gdpr-72h',
    name: 'Notify Supervisory Authority (GDPR)',
    framework: 'GDPR',
    notifyWho: 'EU Supervisory Authority',
    windowHours: 72,
    description:
      'Report certain personal data breaches without undue delay and, where feasible, within 72 hours.',
    applies: (i) =>
      i.regions.includes('eu') &&
      (i.dataCategories.includes('customer_pii') ||
        i.dataCategories.includes('employee_data') ||
        i.dataCategories.includes('payment_data')),
  },
  {
    id: 'ccpa-30d',
    name: 'Notify Affected Consumers (CCPA/CPRA)',
    framework: 'CCPA/CPRA',
    notifyWho: 'California consumers + AG where applicable',
    windowHours: 30 * 24,
    description: 'Consumer notification obligations may apply depending on the nature of the breach.',
    applies: (i) => i.regions.includes('california') && i.dataCategories.includes('customer_pii'),
  },
  {
    id: 'hipaa-60d',
    name: 'Notify Individuals (HIPAA Breach Rule)',
    framework: 'HIPAA',
    notifyWho: 'Affected individuals; HHS; media (where applicable)',
    windowHours: 60 * 24,
    description: 'Notification of unsecured PHI breaches to individuals and regulators.',
    applies: (i) => i.dataCategories.includes('health_phi'),
  },
  {
    id: 'nyshield-30d',
    name: 'Notify Affected New York Residents (NY SHIELD)',
    framework: 'NY SHIELD',
    notifyWho: 'NY residents; possibly NYAG and agencies',
    windowHours: 30 * 24,
    description: 'State-level consumer notification obligations for certain data breaches.',
    applies: (i) => i.regions.includes('new_york') && i.dataCategories.includes('customer_pii'),
  },
  {
    id: 'vendor-24h',
    name: 'Notify Customer per Vendor Contract',
    framework: 'Contractual',
    notifyWho: 'Upstream customer / DPA contact',
    windowHours: 24,
    description: 'Contractual clause requiring notice of vendor incidents within a short window.',
    applies: (i) => i.incidentType === 'vendor_breach',
  },
];

export const DEFAULT_INCIDENT_INPUT: IncidentInput = {
  // Why: stabilize seconds to avoid minute-boundary mismatches.
  discoveredAt: truncateToMinute(new Date()),
  incidentType: 'ransomware',
  dataCategories: ['customer_pii'],
  regions: ['eu'],
};

export function getMatchedObligations(incident: IncidentInput): Obligation[] {
  const matched = RULES.filter((r) => r.applies(incident)).map<Obligation>((r) => ({
    id: r.id,
    name: r.name,
    framework: r.framework,
    notifyWho: r.notifyWho,
    windowHours: r.windowHours,
    deadline: addHours(incident.discoveredAt, r.windowHours),
    description: r.description,
  }));
  matched.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
  return matched;
}