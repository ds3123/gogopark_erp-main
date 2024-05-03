import { useState , useEffect } from "react" 
import { sort_Data_By_CreatedDate } from 'utils/data/sort_data'




// 取得 _ 洗澡次數、美容次數
export const usePlan_Bath_Beauty_Num = ( serviceData : any ) => {


    // 洗澡次數、美容次數
    const [ service_Num , set_Service_Num ] = useState({ 'bath' : 0 , 'beauty' : 0 }) ;


    useEffect( () => {
      
        const pType = serviceData['plan_type'] ;   // 方案類型
        const cPlan = serviceData['custom_plan'] ; // 自訂方案

        
        if( pType === '包月洗澡' ){

           set_Service_Num( { ...service_Num , 'bath' : 4  , 'beauty' : 0 } ) ; 

        }else if( pType === '包月美容' ){

           set_Service_Num( { ...service_Num , 'bath' : 3  , 'beauty' : 1 } ) ; 

        }else{  // 自訂方案

           if( cPlan ) set_Service_Num( { ...service_Num , 'bath' : cPlan['bath_num']  , 'beauty' : cPlan['beauty_num'] } ) ; 

        } 

           
    } , [ serviceData ] ) ;

    return service_Num

}


// < T > 取得 _  各類型( 預設方案 : 包月洗澡、包月美容 / 自訂方案 ) 方案 : 共計價格
export const usePlan_Get_Plan_Price = ( data : any ) => {

    const pet         = data?.pet ;
    const plan_Type   = data?.plan_type ;          // 方案類型( Ex. 包月洗澡、包月美容... )

    const self_Adjust = data?.plan_adjust_price ;  // 自行調整
    const pickup      = data?.pickup_fee ;         // 接送費

    
    // 預設方案 : 包月洗澡
    if( plan_Type === '包月洗澡' && pet?.month_bath_price )   return pet?.month_bath_price + self_Adjust + pickup ;
    
    // 預設方案 : 包月美容
    if( plan_Type === '包月美容' && pet?.month_beauty_price ) return pet?.month_beauty_price + self_Adjust + pickup ;
    
    // 自訂方案
    return data?.plan_fee_total ? data?.plan_fee_total : 0 ;  

} ;



/*
   < T >
        1. 取得 _ 將特定寵物 : 所有購買方案，依照 "預設方案" ( '包月洗澡' 或 '包月美容' ) 、"自訂方案"，予以分類
        2. 方案排序 _ 依照 "建檔日期" 欄位 ( created_at ）: 新 -> 舊 

*/ 
export const usePlan_Filter_By_Type = ( current : "洗澡" | "美容" , pet_All_Plans : any[] ) => { 

    // 方案使用紀錄標籤
    const [ plan_Tags , set_Plan_Tags ] = useState< any[] >( [] ) ;

    useEffect( () => {
      
        if( pet_All_Plans.length > 0 ){
        
            // 篩選 _ 預設方案 ( 包月洗澡、包月美容 ) ＆ 自訂方案
            const month_Bath   = pet_All_Plans.filter( ( x : any ) => x['plan_type'] === '包月洗澡' ) ;
            const month_Beauty = pet_All_Plans.filter( ( x : any ) => x['plan_type'] === '包月美容' ) ;
            const custom_Plans = pet_All_Plans.filter( ( x : any ) => x['plan_type'] !== '包月洗澡' && x['plan_type'] !== '包月美容' ) ;

            /*

                # 合併陣列 :
                  1. 在新增洗澡、美容中，皆合併 _ 自訂方案 ( custom_Plans )   
                  2. 在新增洗澡中，也可使用方案 "包月美容" 下的洗澡 --> 亦合併 : month_Beauty
            
            */ 
    
            const plan_Bath   = month_Bath.concat( month_Beauty , custom_Plans ) ;  // for 新增 _ 洗澡
            const plan_Beauty = month_Beauty.concat( custom_Plans ) ;               // for 新增 _ 美容  
            
            // 排序 _ 依照 "建檔日期" 欄位 ( created_at ）: 新 -> 舊 
            const sort_Plan_Bath   = sort_Data_By_CreatedDate( plan_Bath , "desc" ) ;
            const sort_Plan_Beauty = sort_Data_By_CreatedDate( plan_Beauty , "desc" ) ;

            // 設定 _ 回傳 state                         
            if( current === '洗澡' ) set_Plan_Tags( sort_Plan_Bath ) ;
            if( current === '美容' ) set_Plan_Tags( sort_Plan_Beauty ) ;
    
          }


    } , [ current , pet_All_Plans ] ) ;

  return plan_Tags 

}
