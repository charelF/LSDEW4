import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Domain A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Domain B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Domain C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Domain D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Domain E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Domain F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Domain G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Example() {
  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend align="right" verticalAlign="top" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
}