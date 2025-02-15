import { createRoot } from 'react-dom/client'
import App from './components/App'
import { BrowserRouter } from 'react-router'


import './assets/css/index.scss'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
