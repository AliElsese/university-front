import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Bar,
  Line,
} from 'recharts';

const ChartComposed = () => {
  const composedData = [
    { name: 'Page A', uv: 400, pv: 240, amt: 240 },
    { name: 'Page B', uv: 300, pv: 456, amt: 240 },
    { name: 'Page C', uv: 300, pv: 139, amt: 240 },
    { name: 'Page D', uv: 200, pv: 980, amt: 240 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={composedData}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ChartComposed