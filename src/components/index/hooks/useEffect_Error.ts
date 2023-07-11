import { useFetch_Shop_Services_With_Delete_Error_On_ServiceDate  } from "hooks/react-query/service/useFetchServices" ;
import { useFetch_ExtraFees_By_PaymentDate } from "hooks/react-query/service/useFetchServices" ;
import { useRead_Services_GoneHome_UnPaid_By_Date } from "hooks/ajax_crud/useAjax_Read" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;


import moment from "moment" ;


// # 取得 _ 異常狀況 : 加總數
export const useEffect_Error_Sum = () : number => {
                 
    const shop_Id = useAccount_Shop_Id() ;                        // 目前登入者，所屬商店 id 
    const today   = moment( new Date() ).format( 'YYYY-MM-DD' ) ; // 今日
      

    // 1. 特定日期 ( 今日 ) : 異常 + 銷單
    const error_Delete_By_Date_Num = useFetch_Shop_Services_With_Delete_Error_On_ServiceDate( shop_Id , today ).length ;


    // 2. 取得 _ 特定日期，所有加價單
    const date_Extra_Fee    = useFetch_ExtraFees_By_PaymentDate( shop_Id , today ) ; 
    const extra_Fee_Deleted = date_Extra_Fee.filter( x => x?.is_delete === 1 ) ;    // 篩選出 _ 已經被刪除的加價單

   
    // 3. 取得、篩選出 : 在 '已回家(房)' 情況下，'應付金額' 與 '實付金額' 不符合 ( 即 : 實付金額為 0，或僅付部分實付金額 ) --> for 加總 _ 服務異常   
    const is_GoHome_UnPaid = useRead_Services_GoneHome_UnPaid_By_Date( shop_Id , today ) ;


    return error_Delete_By_Date_Num + ( is_GoHome_UnPaid.length ) + ( extra_Fee_Deleted.length )

} ;