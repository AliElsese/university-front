import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ChartLine = () => {

  const lineData = [
    { month: 'Jan', sales: 400 },
    { month: 'Feb', sales: 550 },
    { month: 'Mar', sales: 350 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ChartLine