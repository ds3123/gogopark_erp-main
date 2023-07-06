
import { useFetch_Shop_Customers_With_Pets } from "hooks/react-query/customer/useFetchCustomers" ;
import { useFetch_Shop_Pets_With_Customers } from "hooks/react-query/pet/useFetchPets" ;
import { useFetch_Shop_Services_With_Error } from "hooks/react-query/service/useFetchServices" ;



// 取得 _ 特定店家，所有設定 _ < 拒接 >，狀態為 "處理中" : 客戶數量   
export const useEffect_Shop_Customer_Reject_Process_Num = ( shop_Id : string ) : number => {

   // 特定店家所有客戶
   const shop_Customers = useFetch_Shop_Customers_With_Pets( shop_Id ) ;

   // 篩選出 _ 拒接 : 審核中
   const _shop_Customers = shop_Customers?.filter( ( x : any ) => x?.rejected_status === '審核中' ) ;

   return _shop_Customers.length

} ;


// 取得 _ 特定店家，所有設定 _ < 拒接 >，狀態為 "處理中" : 寵物數量   
export const useEffect_Shop_Pet_Reject_Process_Num = ( shop_Id : string ) : number => {

    // 特定店家所有寵物
    const shop_Pets = useFetch_Shop_Pets_With_Customers( shop_Id ) ;
 
    // 篩選出 _ 拒接 : 審核中
    const _shop_Pets = shop_Pets?.filter( ( x : any ) => x?.rejected_status === '審核中' ) ;
 
    return _shop_Pets.length
 
} ;


// 取得 _ 特定店家，所有設定 _ < 轉異常 >，狀態為 "未處理" ( 錯誤處理紀錄數 service_error = 0 ) : 服務數量 ( 基礎、洗澡、美容、安親、住宿 )
export const useEffect_Shop_Service_Error_Process_Num = ( shop_Id : string ) : number => {


    // 特定店家所有寵物
    const shop_Servcie_Errors = useFetch_Shop_Services_With_Error( shop_Id ) ;

    if( shop_Servcie_Errors && shop_Servcie_Errors?.length > 0 ){

        // 篩選出所有服務異常 : 未處理
        const _shop_Servcie_Errors = shop_Servcie_Errors?.filter( ( x : any ) => x?.service_error?.length === 0 ) ;
       
        return _shop_Servcie_Errors.length

    }
 
    return 0 

    
} ;


// 加總 _ 特定店家，拒接客戶 ( 審核中 ) 、拒接寵物 ( 審核中 ) 、服務異常 ( 處理紀錄為 0 ) 的共計數
export const useEffect_Shop_Alert_Total_Num = ( shop_Id : string ) : number => {


    // # 紅點顯示待處理數量
    const customer_Reject_Process_Num  = useEffect_Shop_Customer_Reject_Process_Num( shop_Id ) ; // 客戶 ( 拒接 "處理中" : 數量 )   
    const pet_Reject_Process_Num       = useEffect_Shop_Pet_Reject_Process_Num( shop_Id ) ;      // 寵物 ( 拒接 "處理中" : 數量 )    
    const service_Error_In_Process_Num = useEffect_Shop_Service_Error_Process_Num( shop_Id ) ;   // 服務 ( 異常 "未處理" : 數量 )   
  

    // 回傳 _ 加總
    return customer_Reject_Process_Num + pet_Reject_Process_Num + service_Error_In_Process_Num

} ;
