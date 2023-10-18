/* eslint-disable jest/valid-title */


import { renderHook , act } from '@testing-library/react-hooks' ;
import { wrapper } from "utils/test_tools/React-Query-Wrapper" ;
import { useEffect_Deleted_ExtraFees_By_ServiceDate } from "hooks/data/useExtra" ;
 

describe( "加價項目 ( Extar Item )" , () => { 

    test( "useEffect_Deleted_ExtraFees_By_ServiceDate : 取得 _ 特定日期，被刪除 _ 加價單 : 數量 " , async() => {
    

          const {  result , waitForNextUpdate }  = renderHook( () =>  useEffect_Deleted_ExtraFees_By_ServiceDate( "1" , "2023-07-11" ) , { wrapper } ) ;

          await waitForNextUpdate();

          expect( result.current ).toEqual( [
                                                { service_type : "洗澡" , is_delete : 1 } , 
                                                { service_type : "洗澡" , is_delete : 1 } , 
          
                                            ])



    }) ;

}) ; 


describe( "加價美容" , () => { 




}) ; 









