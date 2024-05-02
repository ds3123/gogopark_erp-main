/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect , useState } from "react" 
import moment from "moment" 
import { get_Date_Cal } from "utils/time/date"

import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useFetch_Shop_Custom_Plan_By_Name } from "hooks/react-query/plan/useFetchPlans"






// @ 方案開始、結束日期
const Plan_Start_End = ( { data } : { data : any }  ) => {


    // 目前登入者，所屬店家 id
    const shop_Id  = useAccount_Shop_Id() ;


    // 方案使用天數 ( 預設 90 天 )
    const [ plan_Period , set_Plan_Period ] = useState( 90 ) ;


    // 方案 : 開始、截止 使用日期
    const [ plan_Date , set_Plan_Date ] = useState({
                                                     start : '' , // 開始、第 1 次使用日期
                                                     end   : ''   // 方案截止日期
                                                    }) ;

    
    // 方案使用紀錄
    const plan_used_records = data['plan_used_records'] ;


    // 取得 _ 目前所選擇 : 方案類型 ( 下拉選單 ) 的資料 
    const custom_Plan = useFetch_Shop_Custom_Plan_By_Name( shop_Id , data?.plan_type ) ; 



  
    // 設定 _ 方案使用天數
    useEffect( () => {
          
        /*
           
          預設方案( Ex. 包月洗澡 / 包月美容 ) ： 90 天
          自訂方案                         ： 依照所設定的天數
        
        */

        if( custom_Plan ) set_Plan_Period( custom_Plan?.plan_name ? custom_Plan?.plan_period : 90 ) ;
 
    } , [ custom_Plan ] ) ;


  

    // 計算 _ 第 1 筆使用紀錄 、 方案使用 _ 開始 / 結束日期
    useEffect( () => {

        // 排除 _ 已銷單的紀錄
        const valid_Records = plan_used_records?.filter( ( x : any ) => x?.is_delete === 0 ) ;

        if( valid_Records?.length > 0 ){
  
            // 第 1 筆使用紀錄
            const first_Record = valid_Records[ 0 ] ;

            // 方案使用 _ 開始日期 ( 第 1 筆紀錄的建立日期 )
            const start_Date   = first_Record[ 'created_at' ].slice( 0 , 10 ) ;
  
            // 方案使用 _ 結束日期 ( 根據第 1 筆紀錄建立日期，往後推算方案使用天數 )
            const End_Date     = moment( get_Date_Cal( start_Date , plan_Period ) ).format( "YYYY-MM-DD" ) ;
  
            set_Plan_Date({ ...plan_Date , start : start_Date , end : End_Date }) ;
  
        }
  
      } , [ plan_Period ] ) ;
    

   return <>
   
             <td style={{ width:"120px" }}> { plan_Date['start'] ? plan_Date['start'] : "尚未使用" } </td>
             <td style={{ width:"120px" }}> { plan_Date['end'] ? plan_Date['end'] : "尚未使用"   }   </td>
             <td> { plan_Period } </td>
   
          </> 

} ;

export default Plan_Start_End
       