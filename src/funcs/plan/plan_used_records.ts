


// 取得 _ 方案使用紀錄：到店日期 ( 欄位：service_date )
export const get_PlanRecord_ServiceDate = ( record : any ) : string | null => {

    if( !record ) return null ;

    const service_Type = record?.service_type as "洗澡" | "美容" ;  // 服務類型
    const bath         = record?.bath ;          // 洗澡
    const beauty       = record?.beauty ;        // 美容

    if( service_Type === "洗澡" ) return bath?.service_date ;
    if( service_Type === "美容" ) return beauty?.service_date  ;
   
    return null ;

} ;