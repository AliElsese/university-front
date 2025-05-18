import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const ChartScatter = () => {
  const scatterData = [
    { x: 30, y: 200 },
    { x: 100, y: 400 },
    { x: 170, y: 300 },
    { x: 250, y: 500 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 10 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" />
        <YAxis type="number" dataKey="y" name="weight" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={scatterData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default ChartScatter