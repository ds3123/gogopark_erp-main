/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */
import { render , screen } from "@testing-library/react" ;
import { storeFactory } from "store/tool";
import reducer_Service from "store/reducers/reducer_Service";
import reducer_Info    from "store/reducers/reducer_Info" ;
import reducer_Lodge   from "store/reducers/reducer_Lodge" ;
import reducer_Search  from "store/reducers/reducer_Search" 
import { Services_Box } from "./Services_Box";


// # Redux
import { Provider } from "react-redux" ;

// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;

// # Context Provider
import { AppContainerProvider } from "containers/contexts/appContainerContext" ;



// @ 洗美 / 方案
describe( "洗美與方案列表，是否顯示" , () => { 

   // # React-Query Client
   const queryClient = new QueryClient() ;
   

   // # Redux Store
   let store : any ;

   // 相關 ruducer
   const reducers_Obj = { 
                           Service : reducer_Service ,
                           Info    : reducer_Info ,
                           Lodge   : reducer_Lodge ,
                           Search  : reducer_Search 
                        } ; 

                                
   // 建立 store                      
   beforeEach( () => {

      store = storeFactory( reducers_Obj ) ;

      render( 
               
              <Provider store = { store }> 

                 <QueryClientProvider client = { queryClient } >

                    <AppContainerProvider>
              
                       <Services_Box /> 

                    </AppContainerProvider>   
              
                 </QueryClientProvider>
              
              </Provider>
                
            ) ;



   } )


   test( "洗美區塊初始畫面，預設顯示 _ 洗美列表 , 隱藏 _ 方案列表" , () => {

        
        const service_Component = screen.getByTestId( "service-component" ) ;
        const plan_Component    = screen.queryByTestId( "plan-component" ) ;
        
        expect( service_Component ).toBeInTheDocument() ;  
        expect( plan_Component ).not.toBeInTheDocument() ;  

   }) ; 

   test( "當 second_Nav_Tab 為 '方 案 時，顯示 _ 方案列表 , 隱藏 _ 洗美列表" , () => {

 

    
    
   }) ; 

}) ;







