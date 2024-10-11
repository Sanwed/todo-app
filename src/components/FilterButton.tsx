import {Filter} from "../interfaces/interfaces.ts";


function FilterButton({handler, isActive, children}: Filter) {
  return (
    <button
      onClick={handler}
      className={`${isActive ? 'bg-active' : 'bg-smoke'} transition-all w-1/3 p-3 border-r-2 border-r-white hover:bg-hover`}
    >
      {children}
    </button>
  )
}

export default FilterButton
