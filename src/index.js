import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Home} from './pages/Home';
import {Visualize} from './pages/Visualize';

function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = 'visualize' element = {<Visualize />} />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);