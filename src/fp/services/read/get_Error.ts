import { 
         is_Delete , 
         is_Error ,
         is_NotComplete_Paid ,
         is_Extra_ServiceOrder
       } from 'fp/state' ;
import { get_ServiceOrderId } from "fp/services/read/get_ServiceOrder" ;



/*
    
   # 錯誤相關處理
     1. 銷單
     2. 轉異常
     3. 尚未完全付款
     4. 刪除 _ 加價單

*/



// #  取得 _ 服務異常表欄位值


// 服務類別 < T >
export const get_ServiceOrder_Error_ServiceType = ( serviceOrder : any ) : string => {

    const serviceType     = serviceOrder?.service_type ;
    const qCode           = serviceOrder?.q_code ;


    const eBasic  = serviceOrder?.basic ;
    const eBath   = serviceOrder?.bath ;
    const eBeauty = serviceOrder?.beauty ;


    const extra_ServiceId = eBasic  ? eBasic?.basic_id :
                            eBath   ? eBath?.bath_id :
                            eBeauty ? eBeauty?.beauty_id :
                            "" ;
   
    const extra_Qcode     = eBasic  ? eBasic?.q_code :
                            eBath   ? eBath?.q_code :
                            eBeauty ? eBeauty?.q_code :
                            "" ; 

   return !is_Extra_ServiceOrder( serviceOrder ) ? `${ serviceType } Q${ qCode } ( ${ get_ServiceOrderId( serviceOrder ) } )` :
           is_Extra_ServiceOrder( serviceOrder ) ? `${ serviceType } Q${ extra_Qcode } ( ${ extra_ServiceId } )` : 
           "" ;
} ; 



// 異常說明 < T >
export const get_ServiceOrder_Error_Note = ( serviceOrder : any ) : string => {


    const extra      = serviceOrder?.extra_fee_id ;  // 加價單 id
    const paid       = serviceOrder?.amount_paid ;   // 實付金額
    const errorCause = serviceOrder?.error_cause ;   // 異常理由


    return ( !is_Extra_ServiceOrder( serviceOrder ) && is_Delete( serviceOrder ) ) ? "銷 單" :  // 銷單
           is_Error( serviceOrder )  ? errorCause :                                            // 轉異常
           ( is_NotComplete_Paid( serviceOrder ) && paid === 0 ) ? "尚未付款" :                 // 尚未完全付款   
           ( is_NotComplete_Paid( serviceOrder ) && paid !== 0 ) ? "僅付部分金額" :              // 尚未完全付款  
            is_Extra_ServiceOrder( serviceOrder ) ? `刪除 _ 加價單 ( id : ${ extra } )`  :      // 刪除 _ 加價單  
           "" ;

} ;


// 寵物資訊 < T >
export const get_ServiceOrder_Error_PetInfo = ( serviceOrder : any ) => {

    const pet         = serviceOrder?.pet ;         // 寵物 
    const pet_Name    = serviceOrder?.pet_name ;    // 寵物名  
    const pet_Species = serviceOrder?.pet_species ; // 寵物品種 

    return !is_Extra_ServiceOrder( serviceOrder ) ? `${ pet?.name } ( ${ pet?.species } )` :
           is_Extra_ServiceOrder( serviceOrder ) ? `${ pet_Name} ( ${ pet_Species } )` :
           "" ;

}


