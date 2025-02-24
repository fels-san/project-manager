export type Employee = {
  name: string;
  position?: string;
  birthDate?: Date;
  companyStartYear?: Date;
  phone?: string;
  email?: string;
  isSelected?: boolean;
};

export type Task = {
  title: string;
  isCompleted: boolean;
  id: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  startDate: string;
  team: string[];
  tag: string[];
  isCompleted: boolean;
  isSelected: boolean;
  taskCounter: number;
  tasks: Task[];
};