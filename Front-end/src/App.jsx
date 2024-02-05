// src/App.js
import { RouterProvider } from 'react-router-dom';
import './App.css'

import router from './router';

function App() {
  return (
    <RouterProvider router={router} fallbackElement={null}/>
  );
}

export default App;
