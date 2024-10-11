import {Task} from "../interfaces/interfaces.ts";
import {FormEvent, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {TasksContext} from "../context/tasksContext.tsx";
import {getUniqueId} from "../utils/utils.ts";
import TasksList from "./TasksList.tsx";
import FilterButton from "./FilterButton.tsx";

enum SortValues {
  Default,
  Completed,
  Uncompleted
}

function Tasks() {
  const tasks = useContext(TasksContext)

  if (!tasks) {
    throw new Error('Component Tasks must be used within a Provider')
  }

  const {value, setValue} = tasks;
  const [sort, setSort] = useState<SortValues>(SortValues.Default)
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setValue(JSON.parse(storedTasks));
    }
  }, [setValue])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(value));
  }, [value]);

  const handleFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const taskName = inputRef.current?.value
    if (taskName) {
      const task: Task = {
        id: getUniqueId(),
        name: taskName,
        completed: false
      }
      setValue([task, ...value]);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [setValue, value]);

  const handleButtonClick = (sort: SortValues) => setSort(sort)

  const filteredTasks = useMemo(() => {
    switch (sort) {
      case SortValues.Completed:
        return value.filter(task => task.completed);
      case SortValues.Uncompleted:
        return value.filter(task => !task.completed);
      default:
        return value;
    }
  }, [value, sort]);

  const taskCounts = useMemo(() => {
    return {
      total: value.length,
      completed: value.filter(task => task.completed).length,
      uncompleted: value.filter(task => !task.completed).length
    };
  }, [value]);

  return (
    <div className='shadow-lg bg-white'>
      <form onSubmit={handleFormSubmit} className='flex border-b-smoke border-b'>
        <button className='transition-all bg-smoke p-4 hover:bg-hover' type='submit'>Add</button>
        <input ref={inputRef} className='w-full p-4' maxLength={40} type="text" placeholder='What needs to be done?'
          name='add-task' />
      </form>
      <TasksList tasks={filteredTasks} />
      <div className='flex justify-center'>
        <FilterButton
          handler={() => handleButtonClick(SortValues.Default)}
          isActive={sort === SortValues.Default}
        >All ({taskCounts.total})</FilterButton>
        <FilterButton
          handler={() => handleButtonClick(SortValues.Completed)}
          isActive={sort === SortValues.Completed}
        >Completed ({taskCounts.completed})</FilterButton>
        <FilterButton
          handler={() => handleButtonClick(SortValues.Uncompleted)}
          isActive={sort === SortValues.Uncompleted}
        >Uncompleted ({taskCounts.uncompleted})</FilterButton>
      </div>
    </div>
  )
}

export default Tasks
