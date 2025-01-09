'use client';

import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './ui/card';

const CPCDashboard = () => {
  const [inputs, setInputs] = useState({
    targetCPA: 2.00,
    conversionRate: 2,
    targetROAS: 150,
    competitionFactor: 1,
    dailyBudget: 1000,
  });

  const handleInputChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: parseFloat(value) }));
  };

  const calculateOptimalCPC = () => {
    const baselineCPC = (inputs.targetCPA * (inputs.conversionRate / 100)) * (inputs.targetROAS / 100);
    return (baselineCPC * inputs.competitionFactor).toFixed(3);
  };

  const calculateDailyMetrics = () => {
    const cpc = calculateOptimalCPC();
    const clicks = Math.floor(inputs.dailyBudget / cpc);
    const conversions = Math.floor(clicks * (inputs.conversionRate / 100));
    const revenue = conversions * inputs.targetCPA * (inputs.targetROAS / 100);
    const profit = revenue - inputs.dailyBudget;

    return {
      clicks,
      conversions,
      revenue: revenue.toFixed(2),
      profit: profit.toFixed(2),
      roas: ((revenue / inputs.dailyBudget) * 100).toFixed(1),
    };
  };

  const generateSimulationData = () => {
    const optimalCPC = parseFloat(calculateOptimalCPC());
    const data = [];

    for (let i = 0.5; i <= 1.5; i += 0.1) {
      const cpc = optimalCPC * i;
      const clicks = inputs.dailyBudget / cpc;
      const conversions = clicks * (inputs.conversionRate / 100);
      const revenue = conversions * inputs.targetCPA * (inputs.targetROAS / 100);
      const profit = revenue - inputs.dailyBudget;

      data.push({
        cpcFactor: i.toFixed(1),
        profit: profit.toFixed(0),
      });
    }

    return data;
  };

  const metrics = calculateDailyMetrics();
  const simulationData = generateSimulationData();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">CPC Optimization Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Input Section */}
        <Card title="Inputs">
          <div className="space-y-4">
            {Object.keys(inputs).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="number"
                  className="w-full border rounded p-2"
                  step="0.01"
                  value={inputs[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          <Card title="Optimal CPC">
            <div className="text-blue-600 text-3xl font-bold">${calculateOptimalCPC()}</div>
          </Card>
          <Card title="Metrics">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
              {Object.keys(metrics).map((key) => (
                <div key={key} className="text-center">
                  <div className="text-sm font-medium capitalize">{key}</div>
                  <div className="text-xl font-semibold">${metrics[key]}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Simulation Graph */}
      <Card title="Profit Simulation">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={simulationData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="cpcFactor" label={{ value: 'CPC Factor', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default CPCDashboard;
