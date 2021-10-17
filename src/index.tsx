import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store,{ persistor } from './store/index';
import { PersistGate } from 'redux-persist/lib/integration/react';
import * as dayjs from 'dayjs';
import reportWebVitals from '@/reportWebVitals';
import 'dayjs/locale/zh-cn';
import '@/theme/app.less';
import App from './App';
dayjs.locale('zh-cn');

ReactDOM.render(
  <React.StrictMode>
       <Provider store={ store }>
         <PersistGate loading={null} persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
