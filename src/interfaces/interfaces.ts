import {ReactNode} from "react";

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface TaskContext {
  value: Task[];
  setValue: (value: Task[]) => void;
}

export interface Filter {
  handler: () => void,
  isActive: boolean,
  children: ReactNode,
}
