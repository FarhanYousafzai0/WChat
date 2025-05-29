import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import {Provider} from 'react-redux'
import App from './App.jsx'
import { store } from './App/store.js'

createRoot(document.getElementById('root')).render(
 
<Provider store={store}>
<App />
</Provider>
    
)
