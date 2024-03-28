import { HistoricalCruxChart } from "@/components/historical-crux-chart";
import { getCruxData, transformToChartData } from "@/lib/crux-data";

const origin = 'https://openai.com'

export default async function Home() {
  const res  = await getCruxData(origin, 'DESKTOP');

  const clsData = transformToChartData(res, "cumulative_layout_shift");
  const ttfbData = transformToChartData(res, "experimental_time_to_first_byte");
  const fcpData = transformToChartData(res, "first_contentful_paint");
  const lcpData = transformToChartData(res, "largest_contentful_paint");
  const fipData = transformToChartData(res, "first_input_delay");
  const itnpData = transformToChartData(res, "interaction_to_next_paint");

  return (
    <main className="p-12">

      <div className="w-2/3 mx-auto space-y-4">
      <h1 className="text-3xl mb-4">
        Historical CrUX Data for: <span className="text-blue-500">{res.record.key.origin}</span>
      </h1>
        {res.record.key.formFactor && <p>Platform: {res.record.key.formFactor}</p>}
        <HistoricalCruxChart title="Cumulative layout shift" cruxChart={clsData}/>
        <HistoricalCruxChart title="Time to first byte" cruxChart={ttfbData}/>
        <HistoricalCruxChart title="First contentful paint" cruxChart={fcpData}/>
        <HistoricalCruxChart title="Largest contentful paint" cruxChart={lcpData}/>
        <HistoricalCruxChart title="First input delay" cruxChart={fipData}/>
        <HistoricalCruxChart title="Interaction to next paint" cruxChart={itnpData}/>
      </div>
    </main>
  );
}
