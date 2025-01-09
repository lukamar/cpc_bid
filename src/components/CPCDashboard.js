'use client';

import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Card from './ui/card';

const data = [
  { name: 'Jan', CPC: 1.2, Profit: 200 },
  { name: 'Feb', CPC: 1.5, Profit: 250 },
  { name: 'Mar', CPC: 1.1, Profit: 300 },
  { name: 'Apr', CPC: 1.3, Profit: 270 },
];

const CPCDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">CPC Optimization Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="CPC Trends">
          <LineChart width={400} height={300} data={data}>
            <Line type="monotone" dataKey="CPC" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Card>
        <Card title="Profit Simulation">
          <LineChart width={400} height={300} data={data}>
            <Line type="monotone" dataKey="Profit" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Card>
      </div>
    </div>
  );
};

export default CPCDashboard;
