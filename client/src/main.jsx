import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
)
