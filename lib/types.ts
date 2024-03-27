export type FormFactor = 'PHONE' | 'DESKTOP'

export type CruxMetric = {
  histogramTimeseries: {
    start: number;
    end?: number;
    densities: number[];
  }[];
  percentilesTimeseries: {
    p75s: number[]
  };
}

export type CruxCollectionPeriod = {
  firstDate: {
    year: number;
    month: number;
    day: number;
  };
  lastDate: {
    year: number;
    month: number;
    day: number;
  }
}

export type CruxData = {
  record: {
    key: {
      formFactor?: string;
      origin: string;
    },
    metrics: {
      cumulative_layout_shift?: CruxMetric;
      experimental_time_to_first_byte?: CruxMetric;
      first_contentful_paint?: CruxMetric;
      first_input_delay?: CruxMetric;
      interaction_to_next_paint?: CruxMetric;
      largest_contentful_paint?: CruxMetric;
    }
    collectionPeriods: CruxCollectionPeriod[];
  }
}

export type CruxChart = {
  title?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}



// datasets: [
//   {
//     label: 'Dataset 1',
//     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     backgroundColor: 'rgb(255, 99, 132)',
//   },
//   {
//     label: 'Dataset 2',
//     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     backgroundColor: 'rgb(75, 192, 192)',
//   },
//   {
//     label: 'Dataset 3',
//     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     backgroundColor: 'rgb(53, 162, 235)',
//   },
// ],