import { CruxData, CruxChart, FormFactor } from './types';

export async function getCruxData(
  origin: string,
  formFactor: FormFactor
): Promise<CruxData & { error?: any }> {
  const body = {
    origin,
    formFactor,
  };

  const res = await fetch(
    `https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );

  return await res.json();
}

export function transformToChartData(data: CruxData, metric: string): CruxChart {
  const labels = data.record.collectionPeriods.map(
    p => `${p.lastDate.year}-${p.lastDate.month}-${p.lastDate.day}`
  );

  const dataForMetric = data.record.metrics[metric];
  const datasets = [
    {
      label: dataForMetric.histogramTimeseries[2].end
        ? `${dataForMetric.histogramTimeseries[2].start}-${dataForMetric.histogramTimeseries[2].end}`
        : `>${dataForMetric.histogramTimeseries[2].start}`,
      data: dataForMetric.histogramTimeseries[2].densities,
      backgroundColor: 'rgb(255, 2, 90)',
    },
    {
      label: dataForMetric.histogramTimeseries[1].end
        ? `${dataForMetric.histogramTimeseries[1].start}-${dataForMetric.histogramTimeseries[1].end}`
        : `>${dataForMetric.histogramTimeseries[1].start}`,
      data: dataForMetric.histogramTimeseries[1].densities,
      backgroundColor: 'rgb(255, 200, 0)',
    },
    {
      label: dataForMetric.histogramTimeseries[0].end
        ? `${dataForMetric.histogramTimeseries[0].start}-${dataForMetric.histogramTimeseries[0].end}`
        : `>${dataForMetric.histogramTimeseries[0].start}`,
      data: dataForMetric.histogramTimeseries[0].densities,
      backgroundColor: 'rgb(0, 128, 64)',
    },
  ];

  return {
    labels,
    datasets,
  };
}
