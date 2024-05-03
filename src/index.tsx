import ReactDOM from 'react-dom' ;
import App from 'containers/App' ;
import reportWebVitals from './reportWebVitals' ;
import { ToastContainer } from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css' ;

// # Redux
import { createStore , applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux' ;
import { thunk } from 'redux-thunk' ;

import root_Reducer from "store/reducers/root_Reducer" ;


// # CSS
import 'css/app.scss' ;
import 'css/style.scss' ;

// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;
import { ReactQueryDevtools } from 'react-query/devtools' ;

import { queryClient } from './react-query/queryClient' ; // 自訂 queryClient


// Redux Store
export const store = createStore( root_Reducer , applyMiddleware( thunk ) ) ;


 
// React-Query Client
// const queryClient = new QueryClient() ;


ReactDOM.render(
                  <Provider store = { store } >

                      <ToastContainer
                          position        = "bottom-left"
                          autoClose       = { 5000  }
                          hideProgressBar = { false }
                          newestOnTop     = { false }
                          closeOnClick
                          rtl             = { false }
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                      />

                      { /* React Calendar 在嚴格模式中，有問題 2021.06.21 */ }
                      { /* <React.StrictMode> <App /> </React.StrictMode > */}

                      <QueryClientProvider client = { queryClient } >

                         <App />

                         <ReactQueryDevtools />       

                      </QueryClientProvider>

                  </Provider> ,
                  document.getElementById('root')
               ) ;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
