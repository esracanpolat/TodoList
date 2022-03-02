import React from 'react';
import Index from './components/Index';
import configureStore from './Redux/store';
import { Provider } from "react-redux";
import Header from './components/Header';

function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Header />
      <Index />
    </Provider>
  );
}

export default React.memo(App);
