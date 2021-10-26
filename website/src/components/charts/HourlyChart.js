import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HourlyChart({ data }) {
  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 70,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" scale="log" />
        <YAxis datakey="y" scale="log" domain={['auto', 'auto']} />
        <Tooltip />
        <Legend align="right" verticalAlign="top" />
        <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="y2" stroke="#ff0000" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}