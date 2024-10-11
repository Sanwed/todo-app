import {createContext, FC, ReactNode, useState} from "react";
import {Task, TaskContext} from "../interfaces/interfaces.ts";

export const TasksContext = createContext<TaskContext | undefined>(undefined);

export const Provider: FC<{ children: ReactNode }> = ({children}) => {
  const [value, setValue] = useState<Task[]>([])

  return (
    <TasksContext.Provider value={{value, setValue}}>
      {children}
    </TasksContext.Provider>
  )
}
