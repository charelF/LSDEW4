import { ResponsiveLine } from "@nivo/line"

export default function HourlyChart({ data }) {

  if (!data || data.length === 0) {
    return (
      <p>Loading data...</p>
    )
  }

  //var steps = []
  //for (var i = 0; i < data.length; i += Math.floor(data.length / 10)) {
  //  steps.push(data[i].x)
  //}

  console.log("hourly data", data)

  return (
    <ResponsiveLine
      width={900}
      height={400}
      margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      animate={true}
      data={[
        {
          id: 'fake corp. A',
          data,
        },
      ]}
      colors={"#2563eb"}
      enablePoints={false}
      gridYValues={[10, 100, 1000, 10000, 100000, 1000000, 10000000]}
      gridXValues={[0, 10, 100, 1000, 10000, 100000, 1000000, 10000000]}
      xScale={{
        type: 'log',
        base: 10,
        max: 'auto',
      }}
      yScale={{
        type: 'symlog',
        base: 10,
        max: 'auto',
        reverse: true,
      }}
      axisBottom={{
        tickValues: [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000],
        legendOffset: -12,
      }}
      axisLeft={{
        tickValues: [10, 100, 1000, 10000, 100000, 1000000, 10000000],
        legendOffset: 12,
      }}
      useMesh={true}
    />

  )
}