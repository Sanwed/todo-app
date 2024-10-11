import Tasks from "./components/Tasks.tsx";
import {Provider} from "./context/tasksContext.tsx";


function App() {

  return (
    <Provider>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='min-w-[500px]'>
          <h1 className='text-8xl text-smoke mb-5 text-center'>todos</h1>
          <Tasks />
        </div>
      </div>
    </Provider>
  )
}

export default App
