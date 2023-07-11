
import { useFetch_ExtraFees_By_PaymentDate } from "hooks/react-query/service/useFetchServices" ;
import { is_Delete } from 'fp/state' ;



/*

   # 加價項目
   # 加價美容

*/


// # 取得 _ 特定日期，被刪除 _ 加價單 : 數量 < T >
export const useEffect_Deleted_ExtraFees_By_ServiceDate = ( shop_Id : string , payment_Date : string ) : any[] => {

    const date_ExtraFee = useFetch_ExtraFees_By_PaymentDate( shop_Id , payment_Date ) ; 

    return date_ExtraFee.filter( is_Delete ) ;  // 篩選出 _ 已經被刪除的加價單

} ;