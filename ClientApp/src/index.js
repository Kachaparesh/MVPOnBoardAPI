import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App'
//import * as serviceWorker from './serviceWorker'
import registerServiceWorker from './registerServiceWorker';
//step 1
import { Provider } from 'react-redux'
import storeFactory from './store'
import { fetchSaleData } from './actions'


const initialState = (localStorage["sale-store"]) ?
    JSON.parse(localStorage["sale-store"]) :
    {}

const saveState = () => 
    localStorage["sale-store"] = JSON.stringify(store.getState())

// const handleError = error => {
// 	store.dispatch(
// 		addError(error.message)
// 	)
// }

const store = storeFactory()
store.subscribe(saveState)
store.dispatch(fetchSaleData())

//window.React = React
//window.store = store

// window.addEventListener("error", handleError)
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

const rootElement = document.getElementById('root');
ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
  {/* Step 2 */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
registerServiceWorker();