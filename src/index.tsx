import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Router from "./router";
import { Provider } from 'react-redux';
import { store } from './store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//provider是用于redux的store，browserRouter用于路由切换
root.render(
  <Provider store={store}>
    <BrowserRouter> 
     <Router/>
    </BrowserRouter>
  </Provider>
);


