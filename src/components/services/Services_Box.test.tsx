/* eslint-disable jest/valid-title */
/* eslint-disable react/jsx-pascal-case */

import { Provider } from "react-redux" ;
import { render , screen } from "@testing-library/react" ;
import { storeFactory } from "store/tool";
import reducer_Service from "store/reducers/reducer_Service";
import reducer_Info    from "store/reducers/reducer_Info";
import reducer_Lodge   from "store/reducers/reducer_Lodge";
import reducer_Plan    from "store/reducers/reducer_Plan";
import reducer_Search  from "store/reducers/reducer_Search" ;

import { Services_Box } from "./Services_Box";
// import { set_Service_Second_Nav_Tab as set_Second_Nav }  from "store/actions/action_Service" ;


// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;


// # Context Provider
import { AppContainerProvider } from "containers/contexts/appContainerContext" ;


// @ 洗美 / 方案 容器元件 <Services_Box />
describe( "洗美區塊" , () => { 

   // # React-Query Client
   const queryClient = new QueryClient() ;
   
   // # Redux Store
   let store : any ;

   // <Services_Box /> 相關 ruducer
   const reducers_Obj = { 
                           Service : reducer_Service ,
                           Info    : reducer_Info ,
                           Lodge   : reducer_Lodge ,
                           Plan    : reducer_Plan ,
                           Search  : reducer_Search
                        } ; 

   // 建立 store 、 渲染 <Services_Box />                      
   beforeEach( () => {

      store = storeFactory( reducers_Obj ) ;

      render( 
              <Provider store = { store } > 

                 <QueryClientProvider client = { queryClient } >

                    <AppContainerProvider>
               
                       <Services_Box /> 

                    </AppContainerProvider>   

                 </QueryClientProvider>    
                    
              </Provider> 
            ) ;

   }) ;



   test( "" , () => {
   
   
   }) ;

   // # 該行為已改變，刪除該測試 ？ 2023.01.04

   // test( "初始畫面，預設先顯示 _ 洗美列表 , 隱藏 _ 方案列表" , () => {

   //      const service_Component = screen.getByTestId( "service-component" ) ;
   //      const plan_Component    = screen.queryByTestId( "plan-component" ) ;

   //      expect( service_Component ).toBeInTheDocument() ;  
   //      expect( plan_Component ).not.toBeInTheDocument() ;  

   // }) ; 

//    test( "點選 _ 第二層 : 洗美頁籤，顯示 _ 洗美列表 , 隱藏 _ 方案列表" , () => {

//        store.dispatch( set_Second_Nav( '洗 美' ) ) ;  // 點選 _ 洗美頁籤 

//        const service_Component = screen.getByTestId( "service-component" ) ;
//        const plan_Component    = screen.queryByTestId( "plan-component" ) ;

//        expect( service_Component ).toBeInTheDocument() ;  
//        expect( plan_Component ).not.toBeInTheDocument() ; 
   
//    }) ;


 // # 該行為已改變，刪除該測試 ？ 2023.01.04
//    test( "點選 _ 第二層 : 方案頁籤，顯示 _ 方案列表 , 隱藏 _ 洗美列表" , () => {

//        store.dispatch( set_Second_Nav( '方 案' ) ) ;  // 點選 _ 方案頁籤 

//        const service_Component = screen.queryByTestId( "service-component" ) ;
//        const plan_Component    = screen.getByTestId( "plan-component" ) ;

//        expect( service_Component ).not.toBeInTheDocument() ;  
//        expect( plan_Component ).toBeInTheDocument() ; 
     

//    }) ;
   

}) ;













