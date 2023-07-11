/* eslint-disable jest/valid-title */
import { renderHook } from '@testing-library/react-hooks' ;
import { wrapper } from "utils/tset_tools/React-Query-Wrapper" ;
import { 
         useFetch_Shop_Services_With_Delete_Error_On_ServiceDate ,   
         useFetch_ExtraFees_By_PaymentDate
        } from "hooks/react-query/service/useFetchServices"


test( "useFetch_Shop_Services_With_Delete_Error_On_ServiceDate : 取得 _ 特定店家，特定服務日期，所有 【 預約 】與 【 轉異常 】服務單 " , async() => {

    const { result , waitForNextUpdate } = renderHook( () => useFetch_Shop_Services_With_Delete_Error_On_ServiceDate( "1" , "2023-07-11" ) , { wrapper } ) ;

    // 等待非同步 
    await waitForNextUpdate() ;

    expect( result.current ).toEqual( 
                                      [ 
                                        { service_type : "洗澡" } , 
                                        { service_type : "美容" } 
                                      ] 
                                     ) ;

}) ;


test( "useFetch_ExtraFees_By_PaymentDate : 取得 _ 所有特定 [ 付款日期 ] : 加價單" , async() => {


    const { result , waitForNextUpdate } = renderHook( () => useFetch_ExtraFees_By_PaymentDate( "1" , "2023-07-11" ) , { wrapper } ) ;

    // 等待非同步 
    await waitForNextUpdate() ;

    expect( result.current ).toEqual( 
                                      [ 
                                        { service_type : "洗澡" , is_delete : 1 } , 
                                        { service_type : "美容" , is_delete : 0 } , 
                                        { service_type : "洗澡" , is_delete : 1 } , 
                                      ] 
                                     ) ;



}) ;








