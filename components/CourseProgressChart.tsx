import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Course } from '../types';

interface ChartProps {
  data: Course[];
}

const CourseProgressChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = data.map(course => ({
    name: course.title.length > 15 ? course.title.substring(0, 12) + '...' : course.title,
    progress: course.progress ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="name" tick={{ fill: '#4A5568', fontSize: 12 }} />
        <YAxis tick={{ fill: '#4A5568', fontSize: 12 }} unit="%" />
        <Tooltip
          contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
          labelStyle={{ color: '#1A202C' }}
        />
        <Legend wrapperStyle={{ color: '#4A5568', fontSize: '14px' }} />
        <Bar dataKey="progress" fill="#4299E1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CourseProgressChart;