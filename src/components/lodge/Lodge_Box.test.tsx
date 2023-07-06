/* eslint-disable jest/valid-title */
/* eslint-disable react/jsx-pascal-case */
import { Provider } from "react-redux" ;
import { render , screen } from "@testing-library/react" ;
import { storeFactory } from "store/tool" ;

import reducer_Service from "store/reducers/reducer_Service" ;
import reducer_Info    from "store/reducers/reducer_Info" ;
import reducer_Lodge   from "store/reducers/reducer_Lodge" ; 
import reducer_Care    from "store/reducers/reducer_Care" ;
import reducer_Search  from "store/reducers/reducer_Search" ;

import { Lodge_Box } from "./Lodge_Box" ;
// import { set_Service_Second_Nav_Tab as set_Second_Nav }  from "store/actions/action_Service" ;


// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;


// # Context Provider
import { AppContainerProvider } from "containers/contexts/appContainerContext" ;





// @ 住宿 / 安親 容器元件 <Lodge_Box />
describe( "住宿區塊" , () => { 

    // # React-Query Client
    const queryClient = new QueryClient() ;
   

    // # Redux Store
    let store : any ;

    // <Services_Box /> 相關 ruducer
    const reducers_Obj = { 
                            Service : reducer_Service ,
                            Info    : reducer_Info ,
                            Lodge   : reducer_Lodge ,
                            Care    : reducer_Care ,
                            Search  : reducer_Search
                         } ;   

    // 建立 store 、 渲染 <Lodge_Box />                      
    beforeEach( () => {

       store = storeFactory( reducers_Obj ) ;

       render( 
                <Provider store = { store } >
                    
                    <QueryClientProvider client = { queryClient } >

                        <AppContainerProvider>
                    
                             <Lodge_Box /> 
                    
                        </AppContainerProvider>


                    </QueryClientProvider>
                      
                </Provider> 
             ) ;

    }) ;                      


    test( "" , () => {
    
    
    }) ;


    // # 此行為已修改，廢除此測試 ? 2023.01.04
    // test( "初始畫面，預設先顯示 _ 住宿列表 , 隱藏 _ 安親列表" , () => {

    //     const lodge_Component = screen.getByTestId( "lodge-component" ) ;
    //     const care_Component  = screen.queryByTestId( "care-component" ) ;
        
    //     expect( lodge_Component ).toBeInTheDocument() ;  
    //     expect( care_Component ).not.toBeInTheDocument() ;  

    // }) ;


    
    // test( "點選 _ 第二層 : 住宿頁籤，顯示 _ 住宿列表 , 隱藏 _ 安親列表" , () => {

    //     store.dispatch( set_Second_Nav( '住 宿' ) ) ; // 點選 _ 住宿頁籤 

    //     const lodge_Component = screen.getByTestId( "lodge-component" ) ;
    //     const care_Component  = screen.queryByTestId( "care-component" ) ;
        
    //     expect( lodge_Component ).toBeInTheDocument() ;  
    //     expect( care_Component ).not.toBeInTheDocument() ;  
    
    // }) ;


    // # 此行為已修改，廢除此測試 ? 2023.01.04
    // test( "點選 _ 第二層 : 安親頁籤，顯示 _ 安親列表 , 隱藏 _ 住宿列表" , () => {
    
    //     store.dispatch( set_Second_Nav( '安 親' ) ) ; // 點選 _ 安親頁籤 

    //     const lodge_Component = screen.queryByTestId( "lodge-component" ) ;
    //     const care_Component  = screen.getByTestId( "care-component" ) ;
        
    //     expect( lodge_Component ).not.toBeInTheDocument() ;  
    //     expect( care_Component ).toBeInTheDocument() ;  


    // }) ;


}) ;



