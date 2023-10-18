/* eslint-disable no-whitespace-before-property */
/* eslint-disable jest/valid-title */


import { renderHook , act } from '@testing-library/react-hooks' ;
import { wrapper } from "utils/test_tools/React-Query-Wrapper" ;

import { useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid } from "hooks/data/useService" ;





describe( "" , () => { 

    test( "useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid : 取得 _ 在到店狀態 ( shop_status ) '已回家(房)' 下， 尚未完成付款 ( 即 : 實付金額為 0，或僅付部分實付金額 ) 服務單" , async() => {
    
        const { result , waitForNextUpdate } = renderHook( () => useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid( "1" , "2023-07-11" )  , { wrapper } ) ;

        await waitForNextUpdate();
 
        expect( result.current ).toEqual( [ { shop_status : "已回家( 房 )" , amount_payable : 400 , amount_paid : 300 }  ]  )


    }) ;



}) ; 




