import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";

type EmployeePositionChartProps = {
  employeePositionData: {
    position: string;
    count: number;
  }[];
};

export default function EmployeePositionChart({
  employeePositionData,
}: EmployeePositionChartProps) {
  return (
    <div>
      <h2 className="mb-4 text-stone-700 text-2xl font-bold">
        Chart of the number of employees by position
      </h2>
      <RadarChart
        outerRadius={90}
        width={1000}
        height={400}
        data={employeePositionData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="position" />
        <PolarRadiusAxis />
        <Radar
          name="Employees"
          dataKey="count"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </div>
  );
}
