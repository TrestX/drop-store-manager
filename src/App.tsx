import React from 'react';
import Main from './features/main/Main';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Provider } from 'react-redux';
import store from './redux/Store';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div >
    </Provider >
  );
}

export default App;
