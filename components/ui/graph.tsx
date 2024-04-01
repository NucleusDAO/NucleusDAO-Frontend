'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianAxis,
} from 'recharts';

const data = [
  {
    name: 'Mon',
    sales: 4000,
    orders: 2400,
    amt: 2400,
  },
  {
    name: 'Tue',
    sales: 3000,
    orders: 1398,
    amt: 2210,
  },
  {
    name: 'Wed',
    sales: 2000,
    orders: 9800,
    amt: 2290,
  },
  {
    name: 'Thu',
    sales: 2780,
    orders: 3908,
    amt: 2000,
  },
  {
    name: 'Fri',
    sales: 1890,
    orders: 4800,
    amt: 2181,
  },
  {
    name: 'Sat',
    sales: 2390,
    orders: 3800,
    amt: 2500,
  },
  {
    name: 'Sun',
    sales: 590,
    orders: 4300,
    amt: 2100,
  },
];


const Graph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" className="pb-14">
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
        <CartesianGrid strokeDasharray="7 7" vertical={false} stroke="#292929CC" />
        <CartesianAxis tickSize={20} />
        <XAxis dataKey="name" axisLine={false} className='py-4' fontWeight={300} fontSize={14} />
        <YAxis className='text-[#9C9C9C]' axisLine={false} fontWeight={300} fontSize={14}  />
        
        <Tooltip cursor={{ stroke: '#C098F9', strokeWidth: 1.5, strokeDasharray: 5 }} />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#9050E9"
          activeDot={{ r: 8 }}
          strokeWidth={1.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
