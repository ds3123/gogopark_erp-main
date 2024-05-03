



// * Redux
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux' ;
import { thunk } from 'redux-thunk' ;
import root_Reducer from "store/reducers/root_Reducer" ;

// React Query
import { QueryClient, QueryClientProvider } from 'react-query'


// 實體化
const store       = createStore( root_Reducer , applyMiddleware( thunk ) ) ;
const queryClient = new QueryClient() ;



// # 需包覆 Redux , ReactQuery 時使用
export const redux_reactquery_wrapper = ( { children } : any ) => {

    return <Provider store = { store } >

              <QueryClientProvider client = { queryClient } >

                 { children }
            
               </QueryClientProvider>

           </Provider>
   
}

 