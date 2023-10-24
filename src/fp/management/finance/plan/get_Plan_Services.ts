
import { 
         is_PaymentMethod_Cash ,
         is_PaymentMethod_Plan , 
         is_ServiceType_Bath ,
         is_ServiceType_Beauty ,
         is_Delete
       } from "fp/state";


// 取得 _ 付款方式為「 方案 」的 洗澡單 或 美容單 < T >
export const get_Services_Paid_By_Plan = ( data : any[] ) : any[] => {

    return data.filter(  
                        x => ( is_ServiceType_Bath( x ) || is_ServiceType_Beauty( x ) ) &&
                              is_PaymentMethod_Plan( x )
                      ) ;

} ;


// 取得 _ 付款方式為「 現金 」的 洗澡單 或 美容單 < T >
export const get_Services_Paid_By_Cash = ( data : any[] ) : any[] => {

    return data.filter(  
                        x => ( is_ServiceType_Bath( x ) || is_ServiceType_Beauty( x ) ) &&
                            is_PaymentMethod_Cash( x )
                      ) ;



} ;


// 取得 _  洗澡美容 : 扣預收款 ( 財務管理 ) < T >
export const get_Finance_Plan_Services = ( data : any[] ) : any[] => { 

    // 取得 _ 付款方式為「 方案 」的 洗澡單 或 美容單
    const plan_Service = get_Services_Paid_By_Plan( data ) ;

    // 排除 _ 銷單
    return plan_Service.filter( x => !is_Delete( x ) ) ;

}




