import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <DndProvider backend={HTML5Backend}>
    <React.StrictMode>
      <Provider store={store} stabilityCheck='never'>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </DndProvider>
);
