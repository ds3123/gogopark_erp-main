import { useFetch_Services_By_PaymentDate  } from "hooks/react-query/service/useFetchServices" 
import { useFetch_ExtraFees_By_PaymentDate } from "hooks/react-query/service/useFetchServices" 
import { get_Receivable_Services_Data } from "fp/management/finance/service/get_Finance_Services" 
import { get_Receivable_LodgeCare_Data } from "fp/management/finance/service/get_Finance_Services"
import { is_Delete } from "fp/state" 


// 取得資料 _ < 洗澡美容：應收款 > ＆ < 住宿安親：應收款 > 
export const useEffect_Get_Services_By_PaymentDate = ( shop_Id : string , query_Date : string ) => {


    // 所有服務 ( 基礎、洗澡、美容、安親、住宿 )
    const all_Services  = useFetch_Services_By_PaymentDate( shop_Id , query_Date ) ; 
    
    // 取得 _ 所有加價單 
    const all_ExtraFees = useFetch_ExtraFees_By_PaymentDate( shop_Id , query_Date ) ; 
    

    // -------------------


    // 篩選 _ 未銷單、現金支付，且為「基礎單」、「洗澡單」、「美容單」
    const filter_Services  = get_Receivable_Services_Data( all_Services ) ;

    // 篩選 _ 加價單：未刪單
    const filter_ExtraFees = all_ExtraFees.filter( x => !is_Delete( x ) ) ;


    // -------------------


    // < 洗澡美容：應收款 > 資料 _ 洗澡美容：應收款 ( 加上 _ 加價單 )
    const service_Receivable_Data = filter_Services.concat( filter_ExtraFees ) ;

    // < 住宿安親：應收款 > 資料，篩選 _ 未銷單、現金支付，且為：「當日住宿」、「預約住宿」、「當日安親」、「預約安親」
    const lodgeCare_Receivable_Data = get_Receivable_LodgeCare_Data( all_Services ) ;


    return { service_Receivable_Data , lodgeCare_Receivable_Data } ;


} ;