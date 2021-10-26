import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

export default function MonthlyChart({ data }) {
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
        <XAxis dataKey="xs" />
        <YAxis domain={[-3, 3]} />
        <Legend align="right" verticalAlign="top" />
        <Line type="monotone" dataKey="ys" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}