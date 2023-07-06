

type Status = {

    plan_type         : string ;
    plan_used_records : any[] ;
    custom_plan       : any

}


type Return = {

    quota_Bath   : number ;
    quota_Beauty : number ;
    used_Bath    : number ;
    used_Beauty  : number ;

}




// 方案使用情形 ( 統計數字 ) < T >
export const useEffect_Plan_Used_Status = ( plan : Status ) : Return => {


    const {
            plan_type ,         // 方案類型 ( 名稱 )
            plan_used_records , // 該方案 "所有" 使用紀錄
            custom_plan         // 自訂方案 ( 若為預設方案：包月洗澡 / 包月美容 ，該值為 null )
          } = plan ;

           
    // 該方案 "有效" 使用紀錄 ( 扣除 _ 被銷單 is_delete === 1， )
    const valid_Used_Records = plan_used_records?.filter( ( x : any ) => x[ "is_delete" ] === 0 ) ;

    // 有效 : 洗澡單數 / 美容單數 
    const valid_Bath_Num     = valid_Used_Records?.filter( ( x : any ) => x[ "service_type" ] === "洗澡" ).length ; 
    const valid_Beauty_Num   = valid_Used_Records?.filter( ( x : any ) => x[ "service_type" ] === "美容" ).length ;  


    // --------------------------------


    // 預設方案 : 包月洗澡
    if( plan_type === "包月洗澡" &&  !custom_plan ){

        return {
                   quota_Bath   : 4 ,
                   quota_Beauty : 0 ,
                   used_Bath    : valid_Bath_Num ,
                   used_Beauty  : 0 
               }

     }      

    // 預設方案 : 包月美容
    if( plan_type === "包月美容" &&  !custom_plan ){

        return {
                   quota_Bath   : 3 ,
                   quota_Beauty : 1 ,
                   used_Bath    : valid_Bath_Num ,
                   used_Beauty  : valid_Beauty_Num 
               }

    }  
    

    // 自訂方案
    if( ( plan_type !== "包月洗澡" && plan_type !== "包月美容" ) && custom_plan ){

        return {
                   quota_Bath   : custom_plan?.bath_num ,
                   quota_Beauty : custom_plan?.beauty_num ,
                   used_Bath    : valid_Bath_Num ,
                   used_Beauty  : valid_Beauty_Num 
               }

    }  


    // 預設
    return {
              quota_Bath   : 0 ,
              quota_Beauty : 0 ,
              used_Bath    : 0 ,
              used_Beauty  : 0 
            }


    
    
} ;