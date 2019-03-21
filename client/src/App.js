import React, { Component } from 'react';
import {BrowserRouter as Router, Route  } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
const middleware = [thunk];
const store = createStore(rootReducer,{},compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

class App extends Component {
  render() {
    return (
        <Provider store={store}>
        <Router>
      <div className="App">

        <Navbar />
          <Route exact path='/' component={Landing} />
            <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        <Footer />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
