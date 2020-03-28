import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import TaskPageComponent from './components/TaskPage/TaskPage';

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <TaskPageComponent />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
