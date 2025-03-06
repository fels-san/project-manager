import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProjectDeadlinesChartProps = {
  projectDeadlinesData: {
    title: string;
    daysLeft: number;
  }[];
};

export default function ProjectDeadlinesChart({
  projectDeadlinesData,
}: ProjectDeadlinesChartProps) {
  return (
    <div>
      <h2 className="mb-4 text-stone-700 text-2xl font-bold">
        Projects chart with deadlines (in the next 30 days)
      </h2>
      <BarChart width={1000} height={450} data={projectDeadlinesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name="Days left" dataKey="daysLeft" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
