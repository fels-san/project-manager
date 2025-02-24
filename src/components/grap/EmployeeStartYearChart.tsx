import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EmployeeStartYearChartProps = {
  employeeStartYearData: {
    year: string;
    count: number;
  }[];
};

export default function EmployeeStartYearChart({
  employeeStartYearData,
}: EmployeeStartYearChartProps) {
  return (
    <div>
      <h2 className="mb-4 text-stone-700 text-2xl font-bold">
        Employee distribution chart by year of commencement of work
      </h2>
      <BarChart width={1000} height={450} data={employeeStartYearData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name="Employees" dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
