import React from 'react';

import { ResponsiveLineCanvas } from '@nivo/line';

export default function MonthlyChart({ data, selectedMonths }) {

  if (data === null || data === undefined) {
    return (
      <p>Loading data...</p>
    )
  }

  if (data.length === 0) {
    return (
      <p>No data available.</p>
    )
  }

  const lengths = Object.values(data).map(x => x.length)
  const maxMonth = Object.keys(data)[lengths.indexOf(Math.max(...lengths))]

  var steps = []
  if (data[maxMonth]) {
    for (var i = 0; i < data[maxMonth].length; i += Math.floor(data[maxMonth].length / 4)) {
      steps.push(parseInt(data[maxMonth][i].x.substring(8, 10)))
    }
  }

  const chartData = selectedMonths.filter(x => x in data).map((monthYear) => ({
    id: monthYear,
    data: data[monthYear].map((xy) => ({ ...xy, x: parseInt(xy.x.substring(8, 10)) * 100 + parseInt(xy.x.substring(11)) }))
  }))

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveLineCanvas
        margin={{ bottom: 50, left: 60 }}
        colors={{ "scheme": "nivo" }}
        animate={true}
        data={chartData}
        enableSlices={'x'}
        gridXValues={steps}
        enablePoints={false}
        axisLeft={{
          legend: "Total views",
          legendOffset: 12
        }}
        axisBottom={{
          tickValues: steps,
          legend: "Day of the month",
          legendOffset: -12,
        }}
        useMesh={true}
        enableSlices={false}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateY: 50,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
          }
        ]}
      />
    </div>
  )
}