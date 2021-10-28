import React from 'react';

import { ResponsiveLineCanvas } from '@nivo/line';

import moment from 'moment';

export default function MonthlyChart({ data }) {

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

  return (
    <ResponsiveLineCanvas
      width={900}
      height={400}
      margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
      animate={true}
      data={[
        {
          id: 'fake corp. A',
          data,
        },
      ]}
      enableSlices={'x'}
      gridXValues={steps}
      colors={"#2563eb"}
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