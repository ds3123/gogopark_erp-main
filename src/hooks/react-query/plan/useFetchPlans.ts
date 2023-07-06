
import { useQuery } from "react-query" ;
import { planKeys } from "react-query/query-key/planKeys" ;
import { fetch_Pet_Plans , 
         fetch_Custom_Plans , 
         fetch_Plans_By_CreatedDate  , 
         fetch_Plans_By_PaymentDate ,
         fetch_Shop_Custom_Plan_By_Name ,
         fetch_Shop_Plan_UsedRecord_By_Id ,
         fetch_Shop_Used_Records_By_PlanId
        } from "utils/api/api_Plan" ;



// 取得 _ 特定寵物，所有 ( 主人購買 ) 方案
export const useFetch_Pet_Plans = ( pet_Serial : string  ) => {

   const fallback = [] as any[] ;  // 預設值

   const { data = fallback , isError } = useQuery( 
                                                   planKeys.pet_all_plans( pet_Serial ) , 
                                                   () => fetch_Pet_Plans( pet_Serial ) ,
                                                   { enabled : !!pet_Serial } 
                                                 ) ;

   return { data , isError }     

}



// 取得 _ 所有 : 自訂方案
export const useFetch_Custom_Plans = ( account_id : string ) => {

   const fallback = [] as any[] ;  // 預設值

   const { data = fallback } = useQuery( 
                                         planKeys.all_custom_plans( account_id ) , 
                                         () => fetch_Custom_Plans( account_id )
                                       ) ;

   return data      

}


// 取得 _ 特定 [ 建檔日期 ] ( 欄位 : created_at ) : 所有方案 --> NOTE : 方案沒有欄位 : 到店日期 ( service_date ) 
export const useFetch_Plans_By_CreatedDate = ( account_id : string , created_date : string ) => {

   // 預設值
   const fallback = [] as any[] ;  

   const { data = fallback } = useQuery( 
                                          planKeys.created_date( account_id , created_date ) , 
                                          () => fetch_Plans_By_CreatedDate( account_id , created_date ) 
                                        ) ;

   return data                                        

}


// 取得 _ 特定 [ 付款日期 ] ( 欄位 : payment_date ) : 所有方案
export const useFetch_Plans_By_PaymentDate = ( account_id : string , payment_date : string ) => {

   // 預設值
   const fallback = [] as any[] ;  

   const { data = fallback } = useQuery( 
                                          planKeys.payment_date( account_id , payment_date ) , 
                                          () => fetch_Plans_By_PaymentDate( account_id , payment_date ) 
                                        ) ;

   return data        

 
}


// 取得 _ 特定店家，特定名稱的自訂方案
export const useFetch_Shop_Custom_Plan_By_Name = ( account_id : string , custom_plan_name : string ) => {

   // 預設值
   const fallback = null as any ;  

   const { data = fallback } = useQuery( 
                                          planKeys.custom_plan_name( account_id , custom_plan_name ) , 
                                          () => fetch_Shop_Custom_Plan_By_Name( account_id , custom_plan_name ) ,
                                          { enabled : !!custom_plan_name } 
                                        ) ;

   return data        

 
}


// 取得 _ 特定店家，特定方案 : 使用紀錄 
export const useFetch_Shop_Plan_UsedRecord_By_Id = ( account_id : string , record_id : string ) => {

   // 預設值
   const fallback = null as any ;  

   const { data = fallback } = useQuery( 
                                          planKeys.plan_used_record_by_record_id( account_id , record_id ) , 
                                          () => fetch_Shop_Plan_UsedRecord_By_Id( account_id , record_id ) ,
                                          { enabled : !!record_id } 
                                        ) ;

   return data        


}


// 取得 _ 特定店家，特定方案，其所有使用紀錄
export const useFetch_Shop_Used_Records_By_PlanId = ( account_id : string , plan_id : string ) => {

   // 預設值
   const fallback = [] as any[] ;  

   const { data = fallback } = useQuery( 
                                          planKeys.plan_used_records_by_plan_id( account_id , plan_id ) , 
                                          () => fetch_Shop_Used_Records_By_PlanId( account_id , plan_id ) ,
                                          { enabled : !!plan_id } 
                                        ) ;

   return data        


}
