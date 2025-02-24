import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EmployeeLoadChartProps = {
  employeeLoadData: {
    name: string;
    projectCount: number;
  }[];
};

export default function EmployeeLoadChart({
  employeeLoadData,
}: EmployeeLoadChartProps) {
  return (
    <div>
      <h2 className="mb-4 text-stone-700 text-2xl font-bold">
        Employees by Project Chart
      </h2>
      <BarChart width={1000} height={450} data={employeeLoadData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide={true} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name="Number of projects" dataKey="projectCount" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
