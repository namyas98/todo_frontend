import TodoList from "./features/TodoList/TodoList"
import {useTitle} from './features/useTitle'
function App() {
  useTitle()
  return (
    <TodoList/>
  )
}

export default App;
