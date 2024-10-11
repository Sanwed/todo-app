import {Task} from "../interfaces/interfaces.ts";
import TaskCard from "./TaskCard.tsx";

function TasksList({tasks}: { tasks: Task[] }) {
  return (
    tasks.length ? (<ul className='h-[300px] overflow-y-auto'>
      {tasks.map((task: Task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </ul>) : <p className='p-3 h-[300px]'>Добавьте свою первую задачу</p>
  )
}

export default TasksList
