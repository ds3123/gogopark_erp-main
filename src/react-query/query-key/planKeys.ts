



// # 查詢 _ 方案相關 Query Key
export const planKeys = {

    // 所有方案
    "all_plans"  : [ "all_plans" ] , 


    // 所有 : 自訂方案
    "all_custom_plans" : ( account_id : string ) =>  [ ...planKeys.all_plans , "custom" , account_id ] ,

      
    // 特定寵物，所有 ( 主人購買 ) 方案
    "pet_all_plans" : ( pet_Serial : string ) =>  [ ...planKeys.all_plans , "pet" , pet_Serial  ] ,
    

    // 特定 [ 付款日期 ] ( payment_date ) 所方案
    "payment_date" : ( account_id : string , payment_date : string ) =>  [ ...planKeys.all_plans , "payment_date" , account_id , payment_date ] ,
  

    // 特定 [ 建檔日期 ] ( created_date ) 所方案  --> NOTE : 方案沒有欄位 : 到店日期 ( service_date ) 
    "created_date" : ( account_id : string , created_date : string ) =>  [ ...planKeys.all_plans , "created_date" , account_id , created_date ] ,
  

    // 特定店家，特定名稱的自訂方案
    "custom_plan_name" : ( account_id : string , custom_plan_name : string ) =>  [  "custom_plan_name" , account_id , custom_plan_name ] ,
   

    // 特定店家，特定方案 : 使用紀錄
    "plan_used_record_by_record_id" : ( account_id : string , record_id : string ) =>  [  "plan_used_record_by_record_id" , account_id , record_id ] ,


    // 特定店家，特定方案，其所有使用紀錄
    "plan_used_records_by_plan_id" : ( account_id : string , plan_id : string ) =>  [  "plan_used_records_by_plan_id" , account_id , plan_id ] ,




}