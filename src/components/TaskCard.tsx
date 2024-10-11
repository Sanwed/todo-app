import {Task} from "../interfaces/interfaces.ts";
import {useCallback, useContext} from "react";
import {TasksContext} from "../context/tasksContext.tsx";

function Check({className}: { className: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <g clipPath="url(#a)">
        <path d="M0 8.51 5.48 14 16 3.49 14.49 2l-9.01 9-3.99-3.99L0 8.51Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

function TaskCard({id, name, completed}: Task) {
  const tasks = useContext(TasksContext)

  if (!tasks) {
    throw new Error('Component TaskCard must be used within a Provider')
  }

  const {value, setValue} = tasks;

  const handleChangeInput = useCallback(() => {
    const taskIndex = value.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      const updatedTasks = [...value]
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        completed: !updatedTasks[taskIndex].completed
      }
      setValue(updatedTasks)
    }
  }, [id, setValue, value])

  const handleDelete = useCallback(() => {
    const updatedTasks = value.filter(task => task.id !== id);
    setValue(updatedTasks);
  }, [id, setValue, value]);

  return (
    <li id={`task-${id}`}>
      <label className='cursor-pointer flex p-4 gap-4 items-center'>
        <input onChange={handleChangeInput} type="checkbox" id={`${id}`} className='hidden peer'
          defaultChecked={completed} />
        <span
          className='transition-all w-6 h-6 flex justify-center items-center rounded-lg border border-smoke peer-checked:bg-smoke hover:border-primary'>
          <Check className='fill-white w-4 h-4' />
        </span>
        <p className='transition-all peer-checked:line-through peer-checked:text-smoke'>{name}</p>
        <button onClick={handleDelete} className='transition-all ml-auto relative w-4 h-4 hover:scale-125'>
          <div className='absolute w-full h-0.5 bg-red-600 top-1/2 left-1/2 -translate-x-1/2 rotate-45'></div>
          <div className='absolute w-full h-0.5 bg-red-600 top-1/2 left-1/2 -translate-x-1/2 -rotate-45'></div>
        </button>
      </label>
    </li>
  )
}

export default TaskCard
