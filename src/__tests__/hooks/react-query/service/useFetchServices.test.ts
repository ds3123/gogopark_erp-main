/* eslint-disable jest/valid-title */
import { renderHook } from '@testing-library/react-hooks' ;
import { useFetch_Shop_Services_With_Delete_Error_On_ServiceDate  } from "hooks/react-query/service/useFetchServices"
import { wrapper } from "utils/tset_tools/React-Query-Wrapper" ;


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








