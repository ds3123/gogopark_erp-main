/* eslint-disable jest/valid-title */

import { render , fireEvent , waitFor , screen } from "@testing-library/react" ;
import { renderHook , act } from '@testing-library/react-hooks' ;
import { useRead_Services_GoneHome_UnPaid_By_Date 


       } from "./useAjax_Read" ;


import { get_Services_Have_Gone_Home_By_Date } from "utils/api/api_Service"
import Test from "components/test/Test"


/*

   @ 測試檔案 : useAjax_Read.tsx 

*/



// eslint-disable-next-line jest/valid-title
describe( "" , () => { 

   test( "" , () => {
   
   
   }) ;

   // test( "取得 : 特定日期，到店狀態為 : 已回家( 房 )" , async() => {

   //   const { result , waitForNextUpdate } = renderHook( () => useRead_Services_GoneHome_UnPaid_By_Date( "1" , "2023-01-03" ) )  ;
		
   //   await waitForNextUpdate() ; 

   //   expect( result.current ).toHaveLength( 1 ) ;  


   // }) ; 


   // eslint-disable-next-line jest/valid-title
   // test( "" , async() => {
   
   //    const res = await get_Services_Have_Gone_Home_By_Date( "1" , "2022-09-05" ) ;
         
   //    expect( res.data ).toHaveLength( 1 ) ;

   // }) ;


   // test( "服務類型" , async() => {
      
   //    const { findByTestId } = render( <Test /> ) ;

   //    const service_Type = await findByTestId( "service_Type" ) ;  

   //    // expect( service_Type ).toBeInTheDocument() ;
      
      
   //    // expect( service_Type ).toHaveTextContent( "1234" )
      
   // }) ;


}) ;





