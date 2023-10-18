
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


 // 取得 _ 使用此次方案，所花費 ( 佔有 ) 金額
 export const get_Use_Plan_Amount = ( current : string , plan : any , used_Amount : number ) => {

    const plan_Total_price = plan['plan_fee_total'] ;  // 方案總計價格
 
    // # 計算 _ 此次所花費的金額 ( 四捨五入 ) 
    let current_Amount = 0 ;   

    // * 預設方案
    if( current === '洗澡' && plan['plan_type'] === '包月洗澡' ) current_Amount = Math.round( plan_Total_price / 4 ) ;  
    if( current === '洗澡' && plan['plan_type'] === '包月美容' ) current_Amount = Math.round( plan_Total_price / 5 ) ;         // 若為 "包月美容"， 1 次美容計為 2 次 ( 洗澡 3  , 美容 2 ) 
    if( current === '美容' && plan['plan_type'] === '包月美容' ) current_Amount = Math.round( ( plan_Total_price / 5 ) * 2 ) ; // 若為 "包月美容"， 1 次美容計為 2 次 ( 洗澡 3  , 美容 2 ) 

    // * 客製方案
    const is_Custom_Plan = plan['plan_type'] !== '包月洗澡' && plan['plan_type'] !== '包月美容' ;

    let bath_Num       = 0 ;
    let beauty_Num     = 0 ;

    if( is_Custom_Plan ){
        bath_Num       = plan?.custom_plan?.bath_num ;   // 洗澡次數
        beauty_Num     = plan?.custom_plan?.beauty_num ; // 美容次數
    }
   
    if( current === '洗澡' && is_Custom_Plan && bath_Num )   current_Amount = Math.round( plan_Total_price / bath_Num ) ; 
    if( current === '美容' && is_Custom_Plan && beauty_Num ) current_Amount = Math.round( plan_Total_price / beauty_Num ) ;        

    // ------------------------------------------------     
    
    // console.log( 'ccc' , current_Amount  ) ;

    //const balance      = plan_Total_price - used_Amount ;    // 計算 _ 剩餘金額         
    //if( current_Amount > balance ) return balance ;          // 要設定的此次金額，比剩餘金額大 --> 設定剩餘金額

    //console.log( 'ddd' , current_Amount  ) ;

    return current_Amount ;

 } ;

 // 取得 _ 已使用紀錄的金額  再確認是否有用 ? 2023.01.05
 export const get_Plan_Used_Amount = ( plan_Records : any[] ) => {

    if( !plan_Records ) return 0 ;

    let used_Amount = 0 ;
    plan_Records.forEach( ( x : any ) => used_Amount += x['service_price'] ) ;

    return used_Amount ; 

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



       