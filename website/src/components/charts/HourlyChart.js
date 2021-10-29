import { ResponsiveLineCanvas } from "@nivo/line"

import { BasicTooltip } from "@nivo/tooltip"

function HourlyTooltip({ point: { color, data: { x, y }}}) {
  return (
    <BasicTooltip
      id={"Page #" + x.toString()}
      value={y}
      color={color}
      enableChip
    />
  );
}

export default function HourlyChart({ data, selectedDates, currentHour }) {

  if (!data || data.length === 0) {
    return (
      <p>Loading data...</p>
    )
  }

  const chartData = selectedDates.filter(x => x in data).map((date) => {
    var cumsums = [];
    var cumsum = 0;
    if (data[date][currentHour]) {
      for (var i = 0; i < data[date][currentHour].length; i++) {
        cumsum += data[date][currentHour][i].x;
        cumsums.push(cumsum)
      }
      return {
        id: date,
        data: data[date][currentHour].map((val, idx) => ({ y: val.y, x: cumsums[idx] })),
      }
    }
    return {
      id: date,
      data: []
    }
  })

  const dataPointCount = chartData.map((lines) => lines.data.length).reduce((x, y) => x + y, 0)
  if (dataPointCount === 0) {
    return (
      <p className="text-center my-40 font-medium">No available data.</p>
    )
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveLineCanvas
        margin={{ top: 10, bottom: 50, left: 60, right: 30 }}
        animate={true}
        type={"point"}
        data={chartData}
        colors={{ "scheme": "nivo" }}
        enablePoints={false}
        gridXValues={[10, 100, 1000, 10000, 100000, 1000000]}
        gridYValues={[0, 10, 100, 1000, 10000, 100000, 1000000]}
        xScale={{
          type: 'log',
          base: 10,
          max: 'auto',
          min: 1,
        }}
        yScale={{
          type: 'symlog',
          base: 10,
          max: 'auto',
          reverse: true,
          max: 0,
          min: 100000,
        }}
        axisBottom={{
          tickValues: [10, 100, 1000, 10000, 100000, 1000000],
          legend: 'Page',
          legendOffset: -12,
        }}
        axisLeft={{
          tickValues: [0, 10, 100, 1000, 10000, 100000, 100000],
          legend: "Total views",
          legendOffset: 12,
        }}
        tooltip={HourlyTooltip}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateY: 50,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 95,
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