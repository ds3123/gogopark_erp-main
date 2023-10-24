/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useFetch_Services_By_ServiceDate } from "hooks/react-query/service/useFetchServices" 
import { get_Finance_Plan_Services } from "fp/management/finance/plan/get_Plan_Services";
import { fetch_Shop_Used_Records_By_PlanId } from "utils/api/api_Plan" ;
import { get_UsePlan_ServiceAmount } from "fp/plans/read/get_Plan";

import { useState , useEffect } from 'react' ;


// 計算 _ 方案使用總計金額
export const useEffect_Get_UsePlan_Amount_Total = ( query_Date : string ) => {

    // 方案使用總計金額
    const [ amount , set_Amount ] = useState< number >( 0 ) ;

    // 店家 id
    const shop_Id                 = useAccount_Shop_Id();


    // 特定到店日期，所有服務 ( 基礎、洗澡、美容、安親、住宿 )
    const services_By_ServiceDate = useFetch_Services_By_ServiceDate( shop_Id , query_Date ) ; 


    // 取得 _ 所有金額 ( Promise )
    const get_Promise_Arr = () => {

        // 取得 _ 付款方式為「 方案 」的 洗澡單 或 美容單 ( 排除 _ 銷單 )
        const plan_Servcies = get_Finance_Plan_Services( services_By_ServiceDate ) ;

        const promise_Arr =  plan_Servcies.map( async( x ) => {

                                const plan_UseRecord = x?.plan ;                      // 方案 _ 使用紀錄
                                const plan_Id        = plan_UseRecord?.plan_id ;      // 方案 id
                                const plan_Type      = plan_UseRecord?.plan_type ;    // 方案類型 / 名稱 ( Ex. 包月洗澡 / 包月美容 )
                                const service_Type   = plan_UseRecord?.service_type ; // 服務類型 ( Ex. 洗澡 / 美容 )

                                // 取得 _ 此次使用紀，所屬方案內的所有使用紀錄 ( 為了取得使用紀錄所屬方案：價格 ) 
                                const all_Plan_UseRecords  = await fetch_Shop_Used_Records_By_PlanId( shop_Id , plan_Id ) 

                                // 用傳入的使用紀錄 id ,篩選以上所查詢的所有使用紀錄
                                const planRecord_With_Plan = await all_Plan_UseRecords.filter( ( x : any ) => x?.id === plan_UseRecord?.id )[ 0 ] ;

                                // 該使用紀錄的方案資料
                                const plan_Data            = planRecord_With_Plan?.plan ;

                                // 方案相關價格
                                const plan_Paid_Amount     = plan_Data?.amount_paid ;       // 實收金額
                                const plan_Adjust_Price    = plan_Data?.plan_adjust_price ; // 調製金額
                                const plan_Pickup_Fee      = plan_Data?.pickup_fee ;        // 接送費  
                                    
                                const plan_Total_Amount    = plan_Paid_Amount + plan_Adjust_Price + plan_Pickup_Fee ; // 總計金額

                                // 每次使用方案 ( 績效 ) 金額
                                const per_Service_Amount   = get_UsePlan_ServiceAmount( plan_Total_Amount , plan_Type , service_Type ) ;

                                return per_Service_Amount ;
        
                              }) ;

        return promise_Arr ;
    
    } ;

    // 加總金額 ( 解析所有 Promise )
    const handle_Promise_Arr = async( p_Arr : any[] ) => {
    
        const result = await Promise.all( p_Arr ) ;
        const total  = result.reduce(( accu , curr ) => accu + curr, 0);

        set_Amount( total ) ;
    
    } ;


    useEffect( () => {

      if( services_By_ServiceDate.length > 0 ){

          const p_Arr = get_Promise_Arr() ;

          handle_Promise_Arr( p_Arr )

      }  


    } , [ query_Date , shop_Id , services_By_ServiceDate ] ) ;



    
   return amount ;
    

} ;