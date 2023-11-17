
import { 
         is_PaymentMethod_Cash ,
         is_PaymentMethod_Plan , 
         is_ServiceType_Bath ,
         is_ServiceType_Beauty ,
         is_Delete
       } from "fp/state" ;


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


// 取得 _ 寵物個別調整後：包月洗澡 或 包月美容價格
export const get_Pet_Plan_Adjust_Price = ( petData : any , planType : '包月洗澡' | '包月美容' ) : number | null => {

    // 該寵物方案調整價格
    const pet_month_bath_price   = petData?.month_bath_price ;     
    const pet_month_beauty_price = petData?.month_beauty_price ;

    // 依照方案類型，決定 _ 該寵物方案調整價格
    const pet_plan_adjust_price  = ( planType && planType === "包月洗澡" && pet_month_bath_price )   ? pet_month_bath_price :
                                   ( planType && planType === "包月美容" && pet_month_beauty_price ) ? pet_month_beauty_price :
                                   null ;

    return pet_plan_adjust_price ;

} ;


