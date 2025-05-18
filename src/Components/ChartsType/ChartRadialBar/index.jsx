import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from 'recharts';

const ChartRadialBar = () => {
  const radialData = [
    { name: '18-24', uv: 31 },
    { name: '25-29', uv: 26 },
    { name: '30-34', uv: 28 },
    { name: '35-39', uv: 24 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart innerRadius="20%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
        <RadialBar dataKey="uv" cornerRadius={4} />
        <Tooltip />
        <Legend iconSize={10} />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default ChartRadialBar