'use client';

import type { Obligation } from '@/lib/rules';
import { formatLocalDateTime, humanizeDelta } from '@/lib/datetime';
import { useMounted } from '@/lib/hooks';

type Props = { obligations: Obligation[] };

export default function TimelineResults({ obligations }: Props) {
  const mounted = useMounted();

  if (!obligations.length) {
    return (
      <div className="text-sm text-brx-text-body">
        No example obligations matched this scenario.
        <div className="mt-4 rounded-md bg-gray-50 p-3 text-xs text-brx-text-body">
          This is a simplified, illustrative demo only and <strong>not legal advice</strong>.
        </div>
      </div>
    );
  }

  const mostUrgent = obligations[0];
  const urgentDelta = mounted ? humanizeDelta(mostUrgent.deadline) : null;

  const badge = urgentDelta
    ? urgentDelta.isOverdue
      ? 'bg-red-100 text-red-700 border-red-200'
      : 'bg-brx-blue/10 text-brx-blue border-brx-blue/20'
    : 'bg-gray-100 text-brx-text-body border-gray-200';

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-brx-blue/20 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-heading text-sm font-medium text-brx-text-heading">Most urgent obligation</h2>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${badge}`}>
            {urgentDelta ? (urgentDelta.isOverdue ? 'Overdue' : 'Upcoming') : '—'}
          </span>
        </div>
        <div className="space-y-1">
          <div className="font-heading text-base font-semibold text-brx-navy">{mostUrgent.name}</div>
          <div className="text-sm text-brx-text-body" suppressHydrationWarning>
            Deadline:{' '}
            {mounted ? formatLocalDateTime(mostUrgent.deadline) : mostUrgent.deadline.toISOString()}
            {mounted && urgentDelta ? ` (${urgentDelta.label})` : ''}
          </div>
          <div className="text-xs text-brx-text-body">Framework: <span className="font-medium text-brx-blue">{mostUrgent.framework}</span></div>
          <p className="mt-2 text-sm text-brx-text-body">{mostUrgent.description}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-brx-text-body">
            <tr>
              <th className="border-b border-gray-200 px-3 py-2">Requirement</th>
              <th className="border-b border-gray-200 px-3 py-2">Framework</th>
              <th className="border-b border-gray-200 px-3 py-2">Notify Who</th>
              <th className="border-b border-gray-200 px-3 py-2">Deadline</th>
              <th className="border-b border-gray-200 px-3 py-2">Time window</th>
            </tr>
          </thead>
          <tbody>
            {obligations.map((o) => {
              const d = mounted ? humanizeDelta(o.deadline) : null;
              return (
                <tr key={o.id} className="align-top hover:bg-gray-50 transition-colors">
                  <td className="border-b border-gray-200 px-3 py-3">
                    <div className="font-medium text-brx-text-heading">{o.name}</div>
                    <div className="text-xs text-brx-text-body">{o.description}</div>
                  </td>
                  <td className="border-b border-gray-200 px-3 py-3 text-brx-blue font-medium">{o.framework}</td>
                  <td className="border-b border-gray-200 px-3 py-3 text-brx-text-body">{o.notifyWho}</td>
                  <td className="border-b border-gray-200 px-3 py-3" suppressHydrationWarning>
                    <div className="text-brx-text-heading">{mounted ? formatLocalDateTime(o.deadline) : o.deadline.toISOString()}</div>
                    <div className={`text-xs ${d?.isOverdue ? 'text-red-600 font-medium' : 'text-brx-text-body'}`}>
                      {mounted && d ? d.label : '—'}
                    </div>
                  </td>
                  <td className="border-b border-gray-200 px-3 py-3 text-brx-text-body">{o.windowHours} hours from discovery</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-brx-text-body">
        This is a simplified, illustrative demo only and not legal advice.
      </p>
    </div>
  );
}