/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */
import { render , screen , fireEvent } from "@testing-library/react" ;
import { Click_Apply_Tag , Type_Available } from "./Click_Apply_Tag" ;

// Redux
import { storeFactory } from "store/tool" ;
import { Provider } from "react-redux" ;
import reducer_Plan from "store/reducers/reducer_Plan" ;
import reducer_Service from "store/reducers/reducer_Service" ;


// Redux-Mock-Store
import configureStore from 'redux-mock-store' ; 
import thunk from 'redux-thunk' ;
import { click_Cutomer_Use_Plan_Tag } from "store/actions/action_Plan" ; 


// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;


// 建立 _ 所要 mock 的 store
const middlewares : any[] = [ thunk ] ;
const mockStore           = configureStore( middlewares ) ;


// 建立 store
let store : any ;

const reducers_Obj = { 
                       Plan    : reducer_Plan ,
                       Service : reducer_Service
                     } ;   

store = storeFactory( reducers_Obj ) ;

// # React-Query Client
const queryClient = new QueryClient() ;


// 選染元件、回傳取得元素                       
const render_Component = ( mock_Props : any ) => {

   render( 
           <Provider store = { store } > 

               <QueryClientProvider client = { queryClient } >

                  <Click_Apply_Tag { ...mock_Props } /> 

               </QueryClientProvider>

           </Provider>
         ) ;  

   const click_apply_plan = screen.queryByTestId( "click_apply_plan" ) ; // 點選使用
   const used_num_stat    = screen.queryByTestId( "used_num_stat" ) ;    // 點選後，已使用情形

   return { click_apply_plan , used_num_stat }

} 


test( "" , () => {


}) ;


// describe( "尚未點選 或 點選其他方案頁籤" , () => { 

//    describe( "尚未點選 ( click_Index 為 null ) 使用方案時" , () => { 

//       // 模擬輸入屬性
//       let mock_Props : Type_Available = {


//          tag_Index    : 0 ,      // 目前標籤索引
//          click_Index  : null ,   // 所點選標籤索引 ( 尚未點選 ) 

//          clicked_Plan : {} ,     // 所點選方案
   
//          used_Num     : 1 ,      // 已使用次數 
//          quota_Num    : 3 ,      // 額度次數
   
//          used_Amount  : 400 ,    // 已使用金額
//          quota_Amount : 1200 ,   // 額度金額

//       } ;
       
//       test( "顯示 _ 點選使用方案，隱藏 _ 點選後顯示已使用次數" , () => {

//          const { click_apply_plan , used_num_stat } = render_Component( mock_Props ) ;

//          expect( click_apply_plan ).toBeInTheDocument() ;
//          expect( used_num_stat ).not.toBeInTheDocument() ;

//       }) ; 

//       // test( "當目前為新增洗澡下，有 3 次額度 ( 共計 1200 元 )，已經使用 1 次 ( 金額 300 元 ) ，顯示 -> 洗澡使用情形、餘額、點選使用" , () => {

//       //    const { click_apply_plan } = render_Component( mock_Props ) ;
//       //    expect( click_apply_plan ).toHaveTextContent( "洗澡使用情形 : 1 / 3 ( 餘額 : 800 元 ) 點選使用" ) ;
         
//       // }) ;
      
//    }) ;
   
//    describe( "點選 _ 其他方案使用頁籤 ( 目前索引 tag_Index 為 0 , 點選使用的方案索引 click_Index 為 1 ) 時" , () => { 

//       // 模擬輸入屬性
//       let mock_Props : Type_Available = {

//                tag_Index    : 0 ,   // 目前標籤索引
//                click_Index  : 1 ,   // 所點選標籤索引 ( 點選其他方案 ) 

//                clicked_Plan : {} ,  // 所點選方案
         
//                used_Num     : 0 ,   // 已使用次數 
//                quota_Num    : 4 ,   // 額度次數
         
//                used_Amount  : 200 , // 已使用金額
//                quota_Amount : 400 , // 額度金額

//       } ;
   
//       test( "點選其他方案使用頁籤 ( 目前索引 tag_Index 為 0 , 點選使用的方案索引 click_Index 為 1 ) 時" , () => {

//          const { click_apply_plan , used_num_stat } = render_Component( mock_Props ) ;
   
//          expect( click_apply_plan ).toBeInTheDocument() ;
//          expect( used_num_stat ).not.toBeInTheDocument() ;
      
//       }) ;
   
//    }) ;
   
// }) ;


// describe( "已經點選此方案頁籤" , () => { 

//    // 模擬輸入屬性
//    let mock_Props : Type_Available = {

//          clicked_Plan : {} ,     // 所點選方案  

//          tag_Index    : 1 ,      // 目前標籤索引
//          click_Index  : 1 ,      // 所點選標籤索引 ( 尚未點選 ) 

//          used_Num     : 1 ,      // 已使用次數 
//          quota_Num    : 3 ,      // 額度次數

//          used_Amount  : 400 ,    // 已使用金額
//          quota_Amount : 1200 ,   // 額度金額

//    } ;

//    test( "目前頁籤，為所點選使用的方案頁籤 ( 目前索引 tag_Index 為 1 , 點選使用的方案索引 click_Index 為 1 )" , () => {

//       const { click_apply_plan , used_num_stat } = render_Component( mock_Props ) ;
      
//       expect( click_apply_plan ).not.toBeInTheDocument() ;
//       expect( used_num_stat ).toBeInTheDocument() ;

//    }) ; 

//    // test( "當目前為新增洗澡下，有 3 次額度，已使用過 1 次，目前已使用狀況顯示 -> 洗澡已使用 : 2 / 3" , () => {
   
//    //    const { used_num_stat } = render_Component( mock_Props ) ;
//    //    expect( used_num_stat ).toHaveTextContent( /洗澡已使用 : 2 \/ 3/i )
   
//    // }) ;

// }) ;


// describe( "點選 _ 使用方案" , () => { 

//    test( "點選 _ 尚未點選標籤 ( current_Tag_Index !== clicked_Tag_Index ) -> 觸發 _ 設定方案相關資訊 Action : set_Click_Use_Plan_Tag() " , () => {

//       // 觸發設定方案相關資訊 Action Action : set_Click_Use_Plan_Tag() 下，所額外觸發的各個 Actions 
//       const expect_Result = [
//                               { type : 'SET_CURRENT_PLAN_TAG_INDEX'     , current_Plan_Tag_Index     : 0 } ,
//                               { type : 'SET_CURRENT_PLAN_ID'            , current_Plan_Id            : 434 } ,
//                               { type : 'SET_CURRENT_PLAN_TYPE'          , current_Plan_Type          : "包月洗澡" } ,
//                               { type : 'SET_CURRENT_PLAN_SERVICE_PRICE' , current_Plan_Service_Price : 400 } ,
//                               { type : 'SET_CURRENT_PLAN_NOTE'          , current_Plan_Note          : "[ 預設 ] 包月洗澡下，洗澡第 3 次" } ,
//                               { type : 'SET_USE_PLAN'                   , is_Plan_Used               : true }
//                             ] ;

//       // 創建 mock 的 store
//       const m_Store = mockStore() ;  

//       const clicked_Plan = {
//                               id                : 434 ,           // 方案 id 
//                               plan_type         : "包月洗澡" ,     // 方案類型 ( 預設 )  
//                               plan_used_records : [               // 方案已經使用紀錄 
//                                                     { service_type : "洗澡" , service_price : 250 } ,
//                                                     { service_type : "洗澡" , service_price : 300 } ,
//                                                   ] ,
//                               plan_fee_total    : 1600            // 方案購買總價格 
//                            }


//       // dispatch action ( current_Tag_Index = 0 , clicked_Tag_Index = 1 )
//       m_Store.dispatch( click_Cutomer_Use_Plan_Tag( "洗澡" , 0 , 1 , clicked_Plan ) as any ) ;

//       expect( m_Store.getActions() ).toHaveLength( 6 ) ;
//       expect( m_Store.getActions() ).toEqual( expect_Result ) ;

//    }) ; 

//    test( "點選 _ 尚未點選標籤 ( current_Tag_Index === clicked_Tag_Index ) -> 觸發 _ 重設方案相關資訊 Action : set_Reset_Use_Plan_Tag() " , () => {

//        // 觸發 _ 回復方案相關資訊 Action Action : set_Reset_Use_Plan_Tag() 下，所額外觸發的各個 Actions  
//        const expect_Result = [
//                                  { type : 'SET_CURRENT_PLAN_TAG_INDEX'     , current_Plan_Tag_Index     : null } ,
//                                  { type : 'SET_CURRENT_PLAN_ID'            , current_Plan_Id            : "" } ,
//                                  { type : 'SET_CURRENT_PLAN_TYPE'          , current_Plan_Type          : "" } ,
//                                  { type : 'SET_CURRENT_PLAN_SERVICE_PRICE' , current_Plan_Service_Price : 0 } ,
//                                  { type : 'SET_CURRENT_PLAN_NOTE'          , current_Plan_Note          : "" } ,
//                                  { type : 'SET_USE_PLAN'                   , is_Plan_Used               : false }
//                                ] ;

//       // 創建 mock 的 store
//       const m_Store = mockStore() ;  

//       // dispatch action ( current_Tag_Index = 1 , clicked_Tag_Index = 1 )
//       m_Store.dispatch( click_Cutomer_Use_Plan_Tag( "洗澡" , 1 , 1 , {} ) as any ) ;


//       expect( m_Store.getActions() ).toHaveLength( 6 ) ;
//       expect( m_Store.getActions() ).toEqual( expect_Result ) ;

                               
   
//    }) ;

//    // 尚未完成
//    test( "點選 ( onClick ) " , () => {

//       // 模擬輸入屬性
//       let mock_Props  : Type_Available = {
         
//             tag_Index    : 0 ,      // 目前標籤索引
//             click_Index  : null ,   // 所點選標籤索引 ( 尚未點選 ) 
//             clicked_Plan : {        // 所點選方案
//                               plan_type         : "包月洗澡" ,
//                               plan_used_records : [
//                                                     { service_type : "洗澡" , service_price : 250 } ,
//                                                     { service_type : "洗澡" , service_price : 300 } ,
//                                                   ] ,
//                               plan_fee_total    : 1200 
//                            } ,     

//             used_Num     : 1 ,      // 已使用次數 
//             quota_Num    : 3 ,      // 額度次數

//             used_Amount  : 400 ,    // 已使用金額
//             quota_Amount : 1200 ,   // 額度金額

//       } ;

//       render_Component( mock_Props ) ;

//       const btn_click_use_plan = screen.getByTestId( "btn_click_use_plan" ) ; 

//       fireEvent.click( btn_click_use_plan ) ;

//       const newStates = store.getState() ;

//       // console.log( "newStates" , newStates ) ;
   
//    }) ;


// }) ;








   
   
   
   







