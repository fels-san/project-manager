import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import { useAppSelector } from "../hooks";

import {
  getCompletedTasksData,
  getEmployeeLoadData,
  getEmployeePositionData,
  getEmployeeStartYearData,
  getProjectDeadlinesData,
  getProjectsByMonthData,
} from "../utils/statistics";

import CompletedTasksChart from "../components/grap/CompletedTasksChart";
import EmployeePositionChart from "../components/grap/EmployeePositionChart";
import EmployeeStartYearChart from "../components/grap/EmployeeStartYearChart";
import ProjectDeadlinesChart from "../components/grap/ProjectDeadlinesChart";
import EmployeeLoadChart from "../components/grap/EmployeeLoadChart";
import ProjectsByMonthChart from "../components/grap/ProjectsByMonthChart";

export default function Statistic() {
  const employees = useAppSelector((state) => state.employees.employees);
  const projects = useAppSelector((state) => state.projects.projects);

  const completedTasksData = getCompletedTasksData(projects);
  const employeePositionData = getEmployeePositionData(employees);
  const employeeStartYearData = getEmployeeStartYearData(employees);
  const projectDeadlinesData = getProjectDeadlinesData(projects);
  const employeeLoadData = getEmployeeLoadData(employees, projects);
  const projectsByMonthData = getProjectsByMonthData(projects);

  console.log(projectsByMonthData);

  return (
    <div className="box-border w-full h-full flex flex-col py-12 pl-10 pr-44 bg-stone-50 overflow-y-auto gap-10">
      <CompletedTasksChart completedTasksData={completedTasksData} />
      <ProjectDeadlinesChart projectDeadlinesData={projectDeadlinesData} />
      <ProjectsByMonthChart projectsByMonthData={projectsByMonthData} />
      <EmployeeLoadChart employeeLoadData={employeeLoadData} />
      <EmployeePositionChart employeePositionData={employeePositionData} />
      <EmployeeStartYearChart employeeStartYearData={employeeStartYearData} />
    </div>
  );
}
