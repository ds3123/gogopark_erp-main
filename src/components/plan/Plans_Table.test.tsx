/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */

import { render , screen , waitFor } from "@testing-library/react" ;


// Redux
import { storeFactory } from "store/tool";
import { Provider } from "react-redux" ;
import reducer_Plan from "store/reducers/reducer_Plan" ;
import Plans_Table from "./Plans_Table" ;

// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;



describe( "" , () => { 

   // # React-Query Client
   const queryClient = new QueryClient() ;
   

   // # Redux Store
   let store : any ;

    // <Plans_Table /> 相關 ruducer
    const reducers_Obj = { 
                            Plan : reducer_Plan ,
                         } ;   

    // 建立 store、渲染 <Second_Nav_Options />                         
    beforeEach( () => {

       store = storeFactory( reducers_Obj ) ; 

    }) ;                        



   test( "初始渲染 _ 當輸入 pageOfItems 數目為含有 4 筆資料的陣列時，資料列渲染 4 列" , () => {

         const mock_PageOfItems : any = { 
                                          data :[ {} , {} , {} , {} ]
                                        }  ;

         render( 
                  <Provider store = { store } >

                      <QueryClientProvider client = { queryClient } >

                          <Plans_Table data = { mock_PageOfItems }  /> 

                      </QueryClientProvider>

                  </Provider>  
               ) ;



         const plan_Rows = screen.getAllByTestId( "plan-list-row" ) ;

         expect( plan_Rows ).toHaveLength( 4 ) ;

         
   }) ; 

}) ;



