import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProjectsByMonthChartProps = {
  projectsByMonthData: {
    month: string;
    count: number;
  }[];
};

export default function ProjectsByMonthChart({
  projectsByMonthData,
}: ProjectsByMonthChartProps) {
  return (
    <div>
      <h2 className="mb-4 text-stone-700 text-2xl font-bold">
        Chart of number of projects by month
      </h2>
      <LineChart width={1000} height={450} data={projectsByMonthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          name="Projects"
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
        />
      </LineChart>
    </div>
  );
}
