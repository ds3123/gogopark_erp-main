
import { useFetch_Shop_Services_GoneHome_By_ServiceDate } from "hooks/react-query/service/useFetchServices" ;
import {  get_ServiceOrder_NotComplete_Paid } from "fp/services/read/get_ServiceOrder" ;


/*

   # 各類服務單

*/



// # 取得 _ 在 到店狀態 ( shop_status ) '已回家(房)' 下， 尚未完成付款 ( 即 : 實付金額為 0，或僅付部分實付金額 ) 服務單 < T >
export const useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid = ( shop_Id : string , payment_Date : string ) : any[] => {

    // 取得 _ 特定日期，到店狀態為 : 已回家(房)
    const goneHome_Services = useFetch_Shop_Services_GoneHome_By_ServiceDate( shop_Id , payment_Date ) ;
  
    // 篩選 _ 尚未完成付款
    return get_ServiceOrder_NotComplete_Paid( goneHome_Services ) ;
  
} ; 