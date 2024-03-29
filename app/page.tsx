import { HistoricalCruxChart } from '@/components/historical-crux-chart';
import QueryForm from '@/components/query-form';
import { getCruxData, transformToChartData } from '@/lib/crux-data';

const default_url = 'https://vercel.com';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const url = searchParams['url'];
  const formFactor = searchParams['formFactor'];
  const queryType = searchParams['queryType'];

  const res = await getCruxData(url || default_url, formFactor || 'DESKTOP', queryType || 'origin');

  let clsData;
  let ttfbData;
  let fcpData;
  let lcpData;
  let fipData;
  let itnpData;

  if (res.error === undefined) {
    clsData = transformToChartData(res, 'cumulative_layout_shift');
    ttfbData = transformToChartData(res, 'experimental_time_to_first_byte');
    fcpData = transformToChartData(res, 'first_contentful_paint');
    lcpData = transformToChartData(res, 'largest_contentful_paint');
    fipData = transformToChartData(res, 'first_input_delay');
    itnpData = transformToChartData(res, 'interaction_to_next_paint');
  }

  return (
    <main className="p-12">
      <div className="w-2/3 max-w-[960px] mx-auto space-y-4">
        <QueryForm />
        <h1 className="text-3xl mb-4">
          Historical CrUX Data for: <span className="text-blue-500">{url}</span>
        </h1>
        {formFactor && <p>Platform: {formFactor}</p>}
        {res.error ? (
          <pre>{JSON.stringify(res.error, null, 2)}</pre>
        ) : (
          <>
            <HistoricalCruxChart
              title="Cumulative layout shift"
              cruxChart={clsData}
            />
            <HistoricalCruxChart
              title="Time to first byte (experimental)"
              cruxChart={ttfbData}
            />
            <HistoricalCruxChart
              title="First contentful paint"
              cruxChart={fcpData}
            />
            <HistoricalCruxChart
              title="Largest contentful paint"
              cruxChart={lcpData}
            />
            <HistoricalCruxChart
              title="First input delay"
              cruxChart={fipData}
            />
            <HistoricalCruxChart
              title="Interaction to next paint"
              cruxChart={itnpData}
            />
          </>
        )}
      </div>
    </main>
  );
}
