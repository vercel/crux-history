import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { CruxTimeseries } from '@/lib/types';

type Props = {
  data: CruxTimeseries;
};

// Array here represents comparison time in weeks
// e.g. 4 -> 4 weeks ago, 8 -> 8 weeks ago
const weeksToCompare = [4, 8, 12];

const MetricTrends = ({ data }: Props) => {
  const current = parseFloat(data[data.length - 1].p75);

  const trends = weeksToCompare.map(t => {
    const comparison = parseFloat(data[data.length - 1 - t].p75);
    const avg = (comparison + current) / 2;
    const pctChange = (current - comparison) / avg;

    return pctChange;
  });

  return (
    <div className="px-4 py-6">
      <h3 className="text-lg mb-3">&Delta; p75</h3>
      <div className="flex flex-col">
        <div>
          <p className="text-sm text-neutral-500">
            Current: <span className="text-white text-lg block">{current.toFixed(2)}</span>
          </p>
        </div>
        {weeksToCompare.map((t, i) => (
          <div key={i}>
            <p className="text-sm text-neutral-500">
              {t} weeks:{' '}
              <span className="text-white text-lg block">
                {trends[i].toFixed(2)}%
                {trends[i] > 0 && <FiArrowUp className="inline text-red-500" />}
                {trends[i] < 0 && <FiArrowDown className="inline text-green-500" />}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricTrends;
