import { Project } from "../types/types";

export function getEmployeeProjectsCount(
  employeeName: string,
  projects: Project[]
) {
  return projects.filter((project) =>
    project.team.some((employee) => employee === employeeName)
  ).length;
}

export function formatDateAge(birthDate: Date | undefined) {
  if (!birthDate) return null;

  const now = new Date();

  const age = now.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() >= birthDate.getDate());
  const finalAge = hasBirthdayPassed ? age : age - 1;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${birthDate.getDate()} ${
    months[birthDate.getMonth()]
  }. ${birthDate.getFullYear()}`;

  return `${formattedDate} (${finalAge} years old)`;
}

export function formatDateISO(date: string) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateLong(date: string) {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return d ? d.toLocaleDateString("en-US", options) : null;
}
