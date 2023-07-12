/* eslint-disable react-hooks/exhaustive-deps */

import { sort_Data_By_UpdatedDate } from 'utils/data/sort_data' ;
import { useFetch_Shop_Services_With_Delete_Error_On_ServiceDate } from "hooks/react-query/service/useFetchServices" ;
import { useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid  } from "hooks/data/useService" ;
import { useFetch_ExtraFees_By_PaymentDate } from "hooks/react-query/service/useFetchServices" ;


/*

   # 加總 _ 服務異常 ~ 

    * 所有異常資料 _ 4 種類型 : 

        1. 轉異常
        2. 銷單 
        3. 已回家( 房 ) 情況下，應收金額與實收金額不符合 
        4. 被刪除的加價單 

*/ 
export const useEffect_Service_Error = ( shop_Id : string , service_Date : string ) => {


    // 取得 _ 特定服務日期，[ 銷單 ] 與 [ 轉異常 ] 服務資料
    const services_Delete_Error = useFetch_Shop_Services_With_Delete_Error_On_ServiceDate( shop_Id , service_Date ) ;
    

    // 取得 _ 已回家( 房 ) 情況下，應付金額 與 實付金額 不符合   
    const is_GoHome_UnPaid      = useEffect_ServiceOrder_Is_GoneHome_NotCompletePaid( shop_Id , service_Date ) ;
   

    // 取得 _ 特定日期，所有加價單
    const date_Extra_Fee        = useFetch_ExtraFees_By_PaymentDate( shop_Id , service_Date ) ; 

    // -------

    // 篩選出 _ 已經被刪除的加價單
    const extra_Fee_Deleted     = date_Extra_Fee.filter( x => x?.is_delete === 1 ) ;  


    
    // 加上額外取得資料 
    const error_Arr = services_Delete_Error.concat( is_GoHome_UnPaid , extra_Fee_Deleted ) ;


    // 依據 _ 更新時間欄位( updated_at ) , 降冪( desc ) 排序
    const _error_Arr = sort_Data_By_UpdatedDate( error_Arr , 'desc' ) ;


    return _error_Arr


} ;