import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import MapProvider from './providers/MapProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  // </React.StrictMode>
)
