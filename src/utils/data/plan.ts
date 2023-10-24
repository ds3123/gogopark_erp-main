
// # for 點選 _ 使用方案 ( 預設、自訂 ) ------------------


// 取得 _ 方案使用額度
export const get_Plan_Quota_Num = ( current : string , plan : any ) => {

    // 預設方案
    if( current === '洗澡' && plan['plan_type'] === '包月洗澡' ) return 4 ;  
    if( current === '洗澡' && plan['plan_type'] === '包月美容' ) return 3 ;
    if( current === '美容' && plan['plan_type'] === '包月美容' ) return 1 ;
    
    // 自訂方案
    if( current === '洗澡' && plan['custom_plan'] ) return plan['custom_plan']['bath_num'] ;  
    if( current === '美容' && plan['custom_plan'] ) return plan['custom_plan']['beauty_num'] ;  
    
} ;
 
// 取得 _ 已使用次數  < ! 再確認 > 已使用次數 ( 資料表 : plan_used_records )
export const get_Plan_Used_Num = ( current : string , plan_Records : any[] ) => {

    if( !plan_Records ) return 0 ;

    return plan_Records.filter( ( x : any ) => x['service_type'] === current ).length

} ; 


// 取得 _ 方案備註
export const get_Plan_Used_Note = ( current : string , plan_Type : string , used_Num : number ) => {

    // 預設方案 
    if( current === '洗澡' && plan_Type === '包月洗澡' ) return `[ 預設 ] 包月洗澡下，洗澡第 ${ used_Num + 1 } 次` ;
    if( current === '洗澡' && plan_Type === '包月美容' ) return `[ 預設 ] 包月美容下，洗澡第 ${ used_Num + 1 } 次` ;
    if( current === '美容' && plan_Type === '包月美容' ) return `[ 預設 ] 包月美容下，美容第 ${ used_Num + 1 } 次` ;
    

    // 客製方案
    const is_Custom_Plan = plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ;  
    
    if( current === '洗澡' && is_Custom_Plan ) return `[ 自訂 ] ${ plan_Type }下，洗澡第 ${ used_Num + 1 } 次` ;
    if( current === '美容' && is_Custom_Plan ) return `[ 自訂 ] ${ plan_Type }下，美容第 ${ used_Num + 1 } 次` ;

    return ''




} ;



       