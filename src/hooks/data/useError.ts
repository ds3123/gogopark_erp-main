import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import moment from "moment" ;
import { useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid  } from "hooks/data/useService" ;
import { useEffect_Deleted_ExtraFees_By_ServiceDate } from "hooks/data/useExtra" ;
import { useFetch_Shop_Services_With_Delete_Error_On_ServiceDate } from "hooks/react-query/service/useFetchServices" ;



/*

   # 異常情況

*/



// # 取得 _ 異常狀況 : 加總數
export const useEffect_Error_Sum = () : number => {
                 
    const shop_Id = useAccount_Shop_Id() ;                        // 目前登入者，所屬商店 id 
    const today   = moment( new Date() ).format( 'YYYY-MM-DD' ) ; // 今日
      

    // 1. 特定日期 ( 今日 ) : 異常 + 銷單
    const error_Delete_By_Date_Num     = useFetch_Shop_Services_With_Delete_Error_On_ServiceDate( shop_Id , today ).length ;

    // 2. 取得 _ 被刪除 _ 加價單 : 數量
    const deleted_ExtraFee_Num         = useEffect_Deleted_ExtraFees_By_ServiceDate( shop_Id , today ).length ; 
    
   
    // 3. 取得、篩選出 : 在 '已回家(房)' 情況下，'應付金額' 與 '實付金額' 不符合 ( 即 : 實付金額為 0，或僅付部分實付金額 ) --> for 加總 _ 服務異常 < T >  
    const goneHome_NotCompletePaid_Num = useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid( shop_Id , today ).length ;


    return error_Delete_By_Date_Num + goneHome_NotCompletePaid_Num + deleted_ExtraFee_Num 

} ;