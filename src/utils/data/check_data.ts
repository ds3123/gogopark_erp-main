
import { set_Is_Customer_Relatives_Info } from "store/actions/action_Search"


// @ 用以檢查、判斷資料 


 /*

    # 檢查 _ 方案是否使用完畢 
    

 */ 
 export const check_Plan_Done = ( plan_Type : string , records : any[] , custom_Plan : any , current_Tab : string ) : boolean  => {


    // 從已使用紀錄中，篩選出 _ 已使用 ( 未被銷單 is_delete === 0 ) 洗澡/美容 次數
    const bath_Num   = records.filter( ( x : any ) => x?.service_type === '洗澡' && x?.is_delete === 0 ).length ;
    const beauty_Num = records.filter( ( x : any ) => x?.service_type === '美容' && x?.is_delete === 0 ).length ;
   
    // 為自訂方案
    const is_Custom_Plan = plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ;


    // # 已使用完( true )

    // 在新增洗澡下
    if( current_Tab === '洗澡' && plan_Type === '包月洗澡'  && bath_Num === 4 ) return true ;
    if( current_Tab === '洗澡' && plan_Type === '包月美容'  && bath_Num === 3 ) return true ;
    if( current_Tab === '洗澡' && is_Custom_Plan && bath_Num === custom_Plan?.bath_num ) return true ;

    // 在新增美容下
    if( current_Tab === '美容' && plan_Type === '包月美容'  && beauty_Num === 1 ) return true ;
    if( current_Tab === '美容' && is_Custom_Plan && beauty_Num === custom_Plan?.beauty_num ) return true ;


    // # 未使用完( false )
    return false

 } ; 



// 判斷 _ 搜尋字串，是否為客戶關係人的 手機號碼 或 室內電話 -> 若是，在搜尋框下，加上提醒文字 
export const check_Is_Customer_Relative_Info = ( _filter : any[] , search_Keyword : string , dispatch : any ) => {


   try{
 
       if( _filter.length > 0 ){
 
         _filter.forEach( ( x : any ) => {
     
             const cus_Name  = x['name'] ;
             const relatives = x['customer_relation'] ;
     
             if( relatives && relatives.length > 0 ){
     
                 dispatch( set_Is_Customer_Relatives_Info( '' ) )
     
                 relatives.forEach( ( y : any ) => {

                      
                        console.log( 'df' , y['is_archive'] )


                       // 檢查 _ 姓名
                       if( y['name'] && y['name'].includes( search_Keyword ) ){

                           const isArchive = y['is_archive'] === 1 ? " ( 此關係人資料，已封存 ) " : "" ;
                           dispatch( set_Is_Customer_Relatives_Info( `* 符合 _ ${ cus_Name } 關係人 ( ${ y['name'] } / ${ y['tag'] } ) 的：姓名欄位 ${ isArchive }`  ) )
                                                
                       }

                       // 檢查 _ 手機號碼
                       if( y['mobile_phone'] && y['mobile_phone'] === search_Keyword ){

                           const isArchive = y['is_archive'] === 1 ? " ( 此關係人資料，已封存 ) " : "" ;
                           dispatch( set_Is_Customer_Relatives_Info( `* 符合 _ ${ cus_Name } 關係人 ( ${ y['name'] } / ${ y['tag'] } ) 的：手機號碼欄位 ${ isArchive }`  ) )
                                                   
                       }

                       // 檢查 _ 家用電話 
                       if( y['tel_phone'] && y['tel_phone'] === search_Keyword ){
                           
                           const isArchive = y['is_archive'] === 1 ? " ( 此關係人資料，已封存 ) " : "" ;
                           dispatch( set_Is_Customer_Relatives_Info( `* 符合 _ ${ cus_Name } 關係人 ( ${ y['name'] } / ${ y['tag'] } ) 的：家用電話欄位 ${ isArchive }`  ) )
                                                
                       }

                 } )    
     
            }
             
         })
 
 
       }else{
     
         // 清除文字 
         dispatch( set_Is_Customer_Relatives_Info( '' ) ) ;
     
       }
 
 
   }catch( err ){
 
       console.log( `錯誤位置 : chack_data.ts --> ${ err }` )
 
   }
 
 
 } ;
 

