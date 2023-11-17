import { useFetch_Plans_By_PaymentDate } from "hooks/react-query/plan/useFetchPlans" 


/*

   @ 洗澡美容：預收款

*/


// 取得 _ 特定日期 ( 付款日期 )，購買方案 : < 洗澡美容：預收款 >
export const useEffect_Get_Advance_Receipt_Data = ( shop_Id : string , query_Date : string ) : any[] => {

    // 所有方案 
    const all_Plans = useFetch_Plans_By_PaymentDate( shop_Id , query_Date ) ;      

    return all_Plans ;

}