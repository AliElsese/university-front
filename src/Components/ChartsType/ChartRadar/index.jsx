import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';

const ChartRadar = () => {
  const radarData = [
    { subject: 'Math', A: 120 },
    { subject: 'Physics', A: 98 },
    { subject: 'Chemistry', A: 86 },
    { subject: 'Biology', A: 99 },
    { subject: 'English', A: 85 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default ChartRadar