/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */
import { render } from "@testing-library/react" ;

// Rddux
import { storeFactory } from "store/tool";
import { Provider } from "react-redux" ;
import reducer_Service from "store/reducers/reducer_Service";

import Second_Nav_Options from "./Second_Nav_Options" ;
//import { set_Service_Second_Nav_Tab as set_Second_Nav }  from "store/actions/action_Service" ;


// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;

// # Context Provider
import { AppContainerProvider } from "containers/contexts/appContainerContext" ;



describe( "點選 _ 第二層 : 功能選項標籤 ( Ex. 洗美、方案 ; 住宿、安親 )" , () => { 

   let store : any ;

   const mock_Data_Type = 'service' ;

    // <Services_Box /> 相關 ruducer
    const reducers_Obj = { 
                            Service : reducer_Service ,
                         } ;   

    // 建立 store、渲染 <Second_Nav_Options />                         
   //  beforeEach( () => {

   //     store = storeFactory( reducers_Obj ) ;

   //     render( <Provider store = { store } > <Second_Nav_Options data_Type = { mock_Data_Type }  /> </Provider> ) ;

   //  }) ;   



    
    test( "" , () => {
    
    
    }) ;

   /*
   
     set_Second_Nav 行爲已修改，刪除以下測試 ? 2023.01.04
   
   */


   // test( "點選 _ '洗 美' 頁籤，store state ( service_Second_Nav_Tab ) 更新為 : '洗 美'" , () => {

   //    store.dispatch( set_Second_Nav( '洗 美' )  ) ;

   //    const second_Nav_Tab_State = store.getState().Service.service_Second_Nav_Tab ;

   //    expect( second_Nav_Tab_State ).toBe( '洗 美' ) ;

   // }) ; 


   // test( "點選 _ '方 案' 頁籤，store state ( service_Second_Nav_Tab ) 更新為 : '方 案'" , () => {

   //    store.dispatch( set_Second_Nav( '方 案' )  ) ;

   //    const second_Nav_Tab_State = store.getState().Service.service_Second_Nav_Tab ;

   //    expect( second_Nav_Tab_State ).toBe( '方 案' ) ;

   // }) ; 


   // test( "點選 _ '住 宿' 頁籤，store state ( service_Second_Nav_Tab ) 更新為 : '住 宿'" , () => {

   //    store.dispatch( set_Second_Nav( '住 宿' )  ) ;

   //    const second_Nav_Tab_State = store.getState().Service.service_Second_Nav_Tab ;

   //    expect( second_Nav_Tab_State ).toBe( '住 宿' ) ;

   // }) ; 

   // test( "點選 _ '安 親' 頁籤，store state ( service_Second_Nav_Tab ) 更新為 : '安 親'" , () => {

   //    store.dispatch( set_Second_Nav( '安 親' )  ) ;

   //    const second_Nav_Tab_State = store.getState().Service.service_Second_Nav_Tab ;

   //    expect( second_Nav_Tab_State ).toBe( '安 親' ) ;

   // }) ; 



}) ;



