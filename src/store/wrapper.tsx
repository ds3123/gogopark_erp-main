
// Redux
import { Store, AnyAction } from 'redux' ;
import { Provider } from "react-redux" ;

// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;

// # React-Query Client
const queryClient = new QueryClient() ;



// 渲染 Hook 時，若有使用 Redux 相關 context( 例如 useSelector, useDispatch )，使用此函式以回傳 _ 包覆元件所需的 wrapper
export const get_Hook_Redux_Wrapper = ( store : Store< any , AnyAction > ) : React.FC => {

    return ( { children } : { children? : React.ReactNode } ) => <Provider store={ store }> 

                                                                     <QueryClientProvider client = { queryClient } >
    
                                                                          { children } 

                                                                     </QueryClientProvider>   
                                                                      
                                                                 </Provider> ; 
     
}
