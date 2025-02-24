import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type CompletedTasksChartProps = {
  completedTasksData: {
    title: string;
    completed: number;
    notCompleted: number;
  }[];
};

export default function CompletedTasksChart({
  completedTasksData,
}: CompletedTasksChartProps) {
  return (
    <div>
      <h2 className="mb-4 text-stone-700 text-2xl font-bold">
        Completed and uncompleted tasks chart
      </h2>
      <BarChart width={1000} height={450} data={completedTasksData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" hide={true} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          name="Completed"
          dataKey="completed"
          stackId="tasks"
          fill="#82ca9d"
        />
        <Bar
          name="In progress"
          dataKey="notCompleted"
          stackId="tasks"
          fill="#8884d8"
        />
      </BarChart>
    </div>
  );
}
