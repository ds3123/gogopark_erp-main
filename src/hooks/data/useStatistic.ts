/* eslint-disable react-hooks/exhaustive-deps */


// 各類服務 ( 基礎、洗澡、美容 )，今日次數統計
export const useStatistic_Service_Num_Today = ( data : any[] ) => {

    // 預約
    const a_Basic_Num  = data.filter( x => x['service_type'] === '基礎' && x['service_status'] === '預約_未來' ).length ;
    const a_Bath_Num   = data.filter( x => x['service_type'] === '洗澡' && x['service_status'] === '預約_未來' ).length ;
    const a_Beauty_Num = data.filter( x => x['service_type'] === '美容' && x['service_status'] === '預約_未來' ).length ;

    // 現場
    const s_Basic_Num  = data.filter( x => x['service_type'] === '基礎' && x['service_status'] === '已到店' ).length ;
    const s_Bath_Num   = data.filter( x => x['service_type'] === '洗澡' && x['service_status'] === '已到店' ).length ;
    const s_Beauty_Num = data.filter( x => x['service_type'] === '美容' && x['service_status'] === '已到店' ).length ;


    return {
               
             // 預約
             'a_basic'  : a_Basic_Num ,
             'a_bath'   : a_Bath_Num ,
             'a_beauty' : a_Beauty_Num ,

             // 現場
             's_basic'  : s_Basic_Num ,
             's_bath'   : s_Bath_Num ,
             's_beauty' : s_Beauty_Num ,

           }
  
} ;