import { Default } from "../layout/default"
import { Router } from "./service/Router"

function App() {

  return (
    <Default 
      render={() => <Router />}
    />
  )
}

export default App
