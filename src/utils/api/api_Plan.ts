
import axios from 'utils/axios' ;


// @ 方案、方案使用紀錄 相關 API ( 資料表 : plans , plan_used_records )

// [ GET ] ---------------


// 取得 _ 特定寵物，所有 ( 主人購買 ) 方案 ( for React Query )
export const fetch_Pet_Plans = ( pet_Serial : string ) => {

                 if( pet_Serial ){

                    return axios.get( `plans/show_Single_Pet_Plans/${ pet_Serial }` ).then( res => res.data ) ; 
                    
                 }

                 return []

             } 

// 取得 _ 店家：所有方案 ( for React Query )
export const fetch_Shop_All_Plans = ( account_id : string ) => 
               axios.get( `/plans/show_shop_all_plans/${ account_id }` ).then( res => res.data ) ; 


// 取得 _ 所有 : 自訂方案 ( for React Query )
export const fetch_Custom_Plans = ( account_id : string ) => 
                axios.get( `/custom_plans/show_shop_custom_plans/${ account_id }` ).then( res => res.data ) ; 
      
   

// 取得 _ 特定 [ 建檔日期 ] ( 欄位 : created_at ) 所有方案 ( for React Query )
export const fetch_Plans_By_CreatedDate = ( account_id : string , created_date : string ) => 
                axios.get< any[] >( `/plans/show_plans_by_date/${ account_id }/${ created_date }` ).then( res => res.data ) ;


                 
// 取得 _ 特定 [ 付款日期 ] ( 欄位 : payment_date ) 所有方案 ( for React Query )
export const fetch_Plans_By_PaymentDate = ( account_id : string , payment_date : string ) => 
                axios.get< any[] >( `/plans/show_plans_by_paymentdate/${ account_id }/${ payment_date }` ).then( res => res.data ) ;



// 取得 _ 特定店家，特定名稱的自訂方案 ( for React Query )
export const fetch_Shop_Custom_Plan_By_Name = ( account_id : string , custom_plan_name : string ) => 
                axios.get< any >( `/custom_plans/show_shop_custom_plan_by_name/${ account_id }/${ custom_plan_name }` ).then( res => res.data ) ;



// 取得 _ 特定店家，特定方案 : 使用紀錄 ( for React Query )
export const fetch_Shop_Plan_UsedRecord_By_Id = ( account_id : string , record_id : string ) => 
                axios.get< any >( `/plan_records/show_sigle_plan_used_record_with_service/${ account_id }/${ record_id }` ).then( res => res.data ) ;




// 取得 _ 特定店家，特定方案，其所有使用紀錄 ( for React Query )
export const fetch_Shop_Used_Records_By_PlanId = ( account_id : string , plan_id : string ) => 
                axios.get< any >( `/plan_records/show_shop_used_records_by_planid/${ account_id }/${ plan_id }` ).then( res => res.data ) ;





// [ POST ] ---------------


// 新增 _ 方案 ( for React Query )
export const create_Plan = ( obj : any ) => axios.post( "/plans" , obj ) ;


// 新增 _ 自訂方案 ( for React Query )
export const create_Custom_Plan = async( obj : any ) => await axios.post( "/custom_plans" , obj ) ;


// 新增 _ 方案使用紀錄 ( for React Query )
export const create_Plan_Record = async( obj : any ) => await axios.post( "/plan_records" , obj ) ;




// [ PUT ] ---------------

export const update_Plan_Record_By_Id = ( id : string , obj : any ) => 
                  axios.put( `/plan_records/${ id }` , obj ) ;




// [ DELETE ] ---------------

// 刪除 _ 方案 ( for React Query )
export const delete_Plan = async( id : string ) => await axios.delete( `/plans/${ id }` ) ;


// 刪除 _ 自訂方案 ( for React Query )
export const delete_Custom_Plan = async( id : string ) => await axios.delete( `/custom_plans/${ id }` ) ;



// 刪除 _ 方案紀錄
export const delete_Plan_Record = ( id : string ) => axios.delete( `/plan_records/${ id }` ) ;

