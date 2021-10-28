import React from 'react';

import { ResponsiveLineCanvas } from '@nivo/line';

import moment from 'moment';

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

  var steps = []
  var labels = []
  for (var i = 0; i < data.length; i += Math.floor(data.length / 8)) {
    steps.push(data[i].x)
    labels.push(moment.unix(data[i].x).format("YYYY-MM-dd"))
  }

  const chartData = selectedMonths.filter(x => x in data).map((monthYear) => ({
    id: monthYear,
    data: data[monthYear].map((xy) => ({ ...xy, x: parseInt(xy.x.substring(8, 10)) * 100 + parseInt(xy.x.substring(11)) }))
  }))

  return (
    <ResponsiveLineCanvas
      width={900}
      height={400}
      margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
      colors={{ "scheme": "nivo" }}
      animate={true}
      data={chartData}
      enableSlices={'x'}
      gridXValues={steps}
      enablePoints={false}
      axisBottom={{
        tickValues: steps,
        legendOffset: -12,
      }}
      useMesh={true}
      enableSlices={false}
    />

  )
}