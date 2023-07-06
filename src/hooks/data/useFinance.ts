/* eslint-disable react-hooks/exhaustive-deps */

import { useState , useEffect } from 'react'
import { cal_Paid_Amount_Total , cal_Extra_Fee_Total , cal_Use_Plan_Amount_Total , cal_Cash_Total } from 'utils/data/calculate_data'
import { useSelector } from "react-redux"
import { filter_Finance_Basic_Bath_Beauty , filter_Finance_Care_Lodge , filter_Finance_Plan } from 'utils/data/filter_data'
import { useAccount_Shop_Id } from './useAccount'
import { useFetch_Services_By_ServiceDate , useFetch_Services_By_PaymentDate , useFetch_ExtraFees_By_PaymentDate } from "hooks/react-query/service/useFetchServices" 
import { useFetch_Plans_By_CreatedDate , useFetch_Plans_By_PaymentDate } from "hooks/react-query/plan/useFetchPlans" 
import { useFetch_Others_By_CreatedDate } from "hooks/react-query/other/useFetchOther" 



// @ 處理 管理區 > 財務管理
type Payment_Method = '綜合' | '現金' | '信用卡' | '第三方支付' ;
type Date_Type      = '付款日期' | '到店日期' ; 



type Finance_Data = {

   date_Type               : Date_Type , 
   payment_Method          : Payment_Method ,

   services_By_PaymentDate : any[] ,
   plans_BY_PaymentDate    : any[] ,
   extraFee_By_PaymentDate : any[] ,

   services_By_Date        : any[] ,
   plans_By_Date           : any[]

}




const process_Finance_Data = ( data_Obj : Finance_Data ) => {

   const { 
           date_Type , 
           payment_Method ,

           services_By_Date ,  
           plans_By_Date , 

           services_By_PaymentDate , 
           extraFee_By_PaymentDate , 
           plans_BY_PaymentDate 
         } = data_Obj ;


   let date_Services  = [] ; // 所有服務
   let date_Plans     = [] ; // 所有方案

   let date_ExtraFees = [] ; // 所有加價單

   
   if( date_Type === '付款日期' ){

      date_Services  = services_By_PaymentDate ; // 付款日期 _ 所有服務 
      date_Plans     = plans_BY_PaymentDate ;    // 付款日期 _ 方案
      date_ExtraFees = extraFee_By_PaymentDate ; // 付款日期 _ 所有加價單

   }

   if( date_Type === '到店日期' ){

      date_Services = services_By_Date ;        // 到店日期 _ 所有服務
      date_Plans    = plans_By_Date ;           // 到店日期 _ 方案 

   }


   // 篩選 _ 各區塊資料
   const s_Data = filter_Finance_Basic_Bath_Beauty( date_Services , payment_Method , date_Type ) ;  // 基礎、洗澡、美容 ( 現金支付 )
   const c_Data = filter_Finance_Care_Lodge( date_Services , payment_Method , date_Type ) ;         // 安親、住宿 
   const p_Data = filter_Finance_Plan( date_Plans , date_Services , payment_Method , date_Type  ) ; // 方案、服務( 預收 )
   const u_Data = filter_Finance_Basic_Bath_Beauty( date_Services , '方案' , date_Type ) ;           // 基礎、洗澡、美容 ( 使用方案 )

   return { s_Data , c_Data , p_Data , u_Data , date_ExtraFees }


} ;





// 取得 _ 各區塊資料
export const useFinance_Get_Section_Data = ( payment_Method : Payment_Method ) => {


     // 所點選 _ 日期類型 ( 付款日期 / 到店日期 )
     const date_Type : Date_Type = useSelector( ( state : any ) => state.Finance.finance_Query_Date_Type ) ; 

     // 所查詢 _ 報表日期
     const query_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; 

     
     // -------------------------------------

     // # 取得 _ 特定報表日期．對應所有購買資料

        const shop_Id                 = useAccount_Shop_Id() ;                                       // 目前登入者，所屬商店 Id
  
        // * 依：付款日期 ( 欄位 : payment_date )
        const services_By_PaymentDate  = useFetch_Services_By_PaymentDate( shop_Id , query_Date ) ;   // 所有服務 ( 基礎、洗澡、美容、安親、住宿 )
        const plans_BY_PaymentDate     = useFetch_Plans_By_PaymentDate( shop_Id , query_Date ) ;      // 所有方案 
        const extraFees_By_PaymentDate = useFetch_ExtraFees_By_PaymentDate( shop_Id , query_Date ) ;  // 所有加價單 

    
        // * 依：到店日期 ( 欄位 : service_date / created_at )
        const services_By_Date        = useFetch_Services_By_ServiceDate( shop_Id , query_Date , ) ; // 所有服務 ( 基礎、洗澡、美容、安親、住宿 )
        const plans_By_Date           = useFetch_Plans_By_CreatedDate( shop_Id , query_Date ) ;      // 所有方案 
        const others_By_Date          = useFetch_Others_By_CreatedDate( shop_Id , query_Date ) ;     // 所有其他( 收入 / 支出 ) 



     // # 各區塊報表資料
     const [ data_Obj , set_Data_Obj ] = useState< I_Finance_Section_1 >({
                                                                           service_Data             : [] ,  // 洗澡美容 : 應收款
                                                                           use_Plan_Data            : [] ,  // 洗澡美容 : 扣 _ 預收款
                                                                           plan_Data                : [] ,  // 洗澡美容 : 預收款      
                                                                           care_Lodge_Data          : [] ,  // 住宿安親 : 應收款
                                                                           others_By_Date           : [] ,  // 其他    : 收入、支出
                                                                           extra_Fee_By_PaymentDate : [] ,  // 洗澡美容 : 加價單     
                                                                        }) ;

                                                                          

     // 依照查詢日期類型( 付款日期 / 到店日期 )，切換資料查詢欄位、篩選 _ 服務資料                                    
     useEffect( () => {


        const data_Obj = {
                           date_Type               : date_Type , 
                           payment_Method          : payment_Method ,
                        
                           services_By_PaymentDate : services_By_PaymentDate ,
                           extraFee_By_PaymentDate : extraFees_By_PaymentDate ,
                           plans_BY_PaymentDate    : plans_BY_PaymentDate ,

                           services_By_Date        : services_By_Date ,
                           plans_By_Date           : plans_By_Date
                        } ;


        const { s_Data , c_Data , p_Data , u_Data , date_ExtraFees } = process_Finance_Data( data_Obj ) ;



        // 設定 state
        set_Data_Obj({ ...data_Obj , service_Data    : s_Data ,  
                                     use_Plan_Data   : u_Data ,  
                                     plan_Data       : p_Data ,      
                                     care_Lodge_Data : c_Data ,  
                                     others_By_Date  : others_By_Date ,  
                                     extra_Fee_By_PaymentDate : date_ExtraFees
                     })
  

  
        // 回復預設值
        return () => set_Data_Obj({ ...data_Obj , service_Data    : [] ,  
                                                  use_Plan_Data   : [] ,  
                                                  plan_Data       : [] ,      
                                                  care_Lodge_Data : [] ,  
                                                  others_By_Date  : [] ,  
                                                  extra_Fee_By_PaymentDate : []
                                                  
                                  }) ;

    
     } , [ date_Type , query_Date , services_By_Date , plans_By_Date , others_By_Date , services_By_PaymentDate , plans_BY_PaymentDate , extraFees_By_PaymentDate ] ) ;
     


     return data_Obj

    
}



// 取得 _ 各區塊小計金額
export const useFinance_Section_Total = ( { service_Data , use_Plan_Data , plan_Data , care_Lodge_Data , others_By_Date , extra_Fee_By_PaymentDate } : I_Finance_Section_1 ) : I_Return_Finance_Section_Total => {

   const s_Total  = cal_Paid_Amount_Total( service_Data ) ;        // 洗澡美容：應收款  
   const u_Total  = cal_Use_Plan_Amount_Total( use_Plan_Data ) ;   // 洗澡美容：扣 _ 預收款
   const p_Total  = cal_Paid_Amount_Total( plan_Data ) ;           // 洗澡美容：預收款 ( 購買方案 ) 
   const l_Total  = cal_Paid_Amount_Total( care_Lodge_Data ) ;     // 住宿安親：應收款 
   const cI_Total = cal_Cash_Total( others_By_Date , '收入'  ) ;    // 其他   ：收入
   const cE_Total = cal_Cash_Total( others_By_Date , '支出'  ) ;    // 其他   ：支出

   const eF_Total = cal_Extra_Fee_Total( extra_Fee_By_PaymentDate ) ; // 加價單

   const sum_Total = s_Total + eF_Total + p_Total + l_Total + cI_Total - cE_Total ;  // 總計收入 ( 右上角 ) 


   return { 

            Sum_Total          : sum_Total ,
         
            Service_Receivable : s_Total ,
            Deduct_Advance     : u_Total ,
            Advance_Receipt    : p_Total ,
            Lodge_Receivable   : l_Total ,
            Cash_Income        : cI_Total , 
            Cash_Expenditure   : cE_Total ,

            Extra_Fee          : eF_Total ,
            
          }


} ;