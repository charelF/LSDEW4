import { ResponsiveLine } from "@nivo/line"
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
      data: data[date][currentHour].map((val, idx) => ({ y: val.y, x: cumsums[idx]})),
    }
  })

  console.log(chartData)

  //return (<></>)
  return (
    //<ResponsiveLine
    <ResponsiveLineCanvas
      width={900}
      height={400}
      margin={{ top: 20, right: 20, bottom: 160, left: 80 }}
      animate={true}
      data={chartData}
      colors={{"scheme": "nivo"}}
      enablePoints={false}
      gridXValues={[0.1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]}
      gridYValues={[0, 10, 100, 1000, 10000, 100000, 1000000, 10000000]}
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
        max: 0,
        min: 10000000,
      }}
      axisBottom={{
        tickValues: [0.1, 10, 100, 1000, 10000, 100000, 1000000, 10000000],
        legendOffset: -12,
      }}
      axisLeft={{
        tickValues: [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000],
        legendOffset: 12,
      }}
      useMesh={true}
    />

  )
}