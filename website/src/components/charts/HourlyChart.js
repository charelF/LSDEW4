import { ResponsiveLine } from "@nivo/line"

export default function HourlyChart({ data, selectedDates, currentHour }) {

  if (!data || data.length === 0) {
    console.log(data)
    return (
      <p>Loading data...</p>
    )
  }

  const chartData = selectedDates.filter(x => x in data).map((date) => ({
    id: date,
    data: data[date][currentHour],
  }))

  console.log(chartData)

  //return (<></>)
  return (
    <ResponsiveLine
      width={900}
      height={400}
      margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      animate={true}
      data={chartData}
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