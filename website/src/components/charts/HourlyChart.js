import { ResponsiveLineCanvas } from "@nivo/line"

export default function HourlyChart({ data, selectedDates, currentHour }) {

  if (!data || data.length === 0) {
    console.log(data)
    return (
      <p>Loading data...</p>
    )
  }

  const chartData = selectedDates.filter(x => x in data).map((date) => {
    var cumsums = [];
    var cumsum = 0;
    for (var i = 0; i < data[date][currentHour].length; i++) {
      cumsum += data[date][currentHour][i].x;
      cumsums.push(cumsum)
    }
    return {
      id: date,
      data: data[date][currentHour].map((val, idx) => ({ y: val.y, x: cumsums[idx] })),
    }
  })


  // TODO(gm): sort on y

  return (
    <ResponsiveLineCanvas
      width={900}
      height={400}
      margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      animate={true}
      type={"point"}
      data={chartData}
      colors={{ "scheme": "nivo" }}
      enablePoints={false}
      gridXValues={[0.1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]}
      gridYValues={[0, 10, 100, 1000, 10000, 100000, 1000000, 10000000]}
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
        min: 10000000,
      }}
      axisBottom={{
        tickValues: [0.1, 10, 100, 1000, 10000, 100000, 1000000, 10000000],
        legendOffset: -12,
        legend: 'views',
      }}
      axisLeft={{
        tickValues: [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000],
        legendOffset: 12,
      }}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />

  )
}