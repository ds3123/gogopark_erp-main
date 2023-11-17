/* eslint-disable react-hooks/exhaustive-deps */
import { useState , useEffect , useMemo } from 'react' ;
import { useFetch_Services_By_ServiceDate } from "hooks/react-query/service/useFetchServices" 
import { get_Finance_Plan_Services } from "fp/management/finance/plan/get_Plan_Services";
import { sort_ObjAttr } from 'fp/tool';
import { fetch_Shop_Used_Records_By_PlanId } from "utils/api/api_Plan" ;
import { get_UsePlan_ServiceAmount } from "fp/plans/read/get_Plan" ;
import { useAccount_Shop_Id } from 'hooks/data/useAccount' 
import { useDispatch } from 'react-redux';
import { set_Is_Fetching_Deduct_Advance_Receipt_Done } from 'store/actions/action_Finance';


/*

   @ 洗澡美容：扣 _ 預收款

*/


// 取得 _ 特定日期 ( 到店日期 )，使用方案的資料 : 洗澡美容：扣 _ 預收款
export const useEffect_Get_UsePlan_Data = ( shop_Id : string , query_Date : string ) : any[] => {

   // 特定到店日期，所有服務 ( 基礎、洗澡、美容、安親、住宿 )
   const services_By_ServiceDate = useFetch_Services_By_ServiceDate( shop_Id , query_Date ) ; 

   // 取得 _ 付款方式為「 方案 」的 洗澡單 或 美容單 ( 排除 _ 銷單 )
   const plan_Servcies  = get_Finance_Plan_Services( services_By_ServiceDate ) ;
 
   // 依照 q_code 排序
   const _plan_Servcies = sort_ObjAttr( 'q_code' , 'asc' )( plan_Servcies ) ;

   return _plan_Servcies ;

} ;


// 取得 _ 特定日期，使用方案 : 總計金額
export const useEffect_Get_UsePlan_ServiceAmount_Total = ( data : any[] , query_Date : string ) : number => {

    
    const dispatch = useDispatch() ; 

    const shop_Id  = useAccount_Shop_Id() ;

    // 方案使用總計金額
    const [ amount , set_Amount ] = useState< number >( 0 ) ;


    // 取得 _ 所有金額 ( Promise )
    const get_Promise_Arr = ( data : any[] ) => {

        const promise_Arr =  data.map( async( x ) => {

                                const plan_UseRecord = x?.plan ;                      // 方案 _ 使用紀錄
                                const plan_Id        = plan_UseRecord?.plan_id ;      // 方案 id
                                const plan_Type      = plan_UseRecord?.plan_type ;    // 方案類型 / 名稱 ( Ex. 包月洗澡 / 包月美容 )
                                const service_Type   = plan_UseRecord?.service_type ; // 服務類型 ( Ex. 洗澡 / 美容 )

                                // 取得 _ 此次使用紀，所屬方案內的所有使用紀錄 ( 為了取得使用紀錄所屬方案：價格 ) 
                                const all_Plan_UseRecords  = await fetch_Shop_Used_Records_By_PlanId( shop_Id , plan_Id ) 

                                // 用傳入的使用紀錄 id ,篩選以上所查詢的所有使用紀錄
                                const planRecord_With_Plan = all_Plan_UseRecords.filter( ( x : any ) => x?.id === plan_UseRecord?.id )[ 0 ] ;

                                // 該使用紀錄的方案資料
                                const plan_Data            = planRecord_With_Plan?.plan ;

                                // 方案：實收金額
                                const plan_Paid_Amount     = plan_Data?.amount_paid ;       
                               
                                
                                // 每次使用方案 ( 績效 ) 金額
                                const per_Service_Amount   = get_UsePlan_ServiceAmount( plan_Paid_Amount , plan_Type , service_Type ) ;

                                return per_Service_Amount ;
        
                              }) ;

        return promise_Arr ;
    
    } ;

    // 加總金額 ( 解析所有 Promise )
    const handle_Promise_Arr = async( p_Arr : any[] ) => {
    
        const result = await Promise.all( p_Arr ) ;
        const total  = result.reduce(( accu , curr ) => accu + curr, 0 ) ;

        
        // 關閉下載中圖示
        dispatch( set_Is_Fetching_Deduct_Advance_Receipt_Done( true ) ) ;

        // 設定金額
        set_Amount( total ) ;
    
    } ;


    useEffect( () => {

      if( data.length > 0 ){

          const p_Arr = get_Promise_Arr( data ) ;

          handle_Promise_Arr( p_Arr )

      }else{

        // 關閉下載中圖示
        // dispatch( set_Is_Fetching_Deduct_Advance_Receipt_Done( false ) ) ;

        // 設定金額
        set_Amount( 0 ) ;


      }  

    } , [ data , query_Date ] ) ;


    return amount ;

} ;