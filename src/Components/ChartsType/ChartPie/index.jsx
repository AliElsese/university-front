import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const ChartPie = ({ keys, values, colors }) => {

  const [data, setData] = useState([])

  const getData = () => {
    const newValues = []
    values.forEach((el, index) => {
      newValues.push({
        name: keys[index],
        value: el
      })
    });
    setData(newValues)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`pie-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ChartPie