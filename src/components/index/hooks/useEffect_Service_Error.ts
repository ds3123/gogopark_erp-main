/* eslint-disable react-hooks/exhaustive-deps */

import { useState , useEffect } from 'react' ;
import { sort_Data_By_UpdatedDate } from 'utils/data/sort_data' ;




// @ 加總 _ 服務異常
export const useEffect_Service_Error = ( services_Delete_Error : any[] , is_GoHome_UnPaid : any[] , date_Extra_Fee : any[] ) => {

    // 所有異常資料 _ 4 種類型 :「 轉異常 」、「 銷單 」、「 已回家( 房 ) 情況下，應收金額與實收金額不符合 」、「 被刪除的加價單 」
    const [ error_Data , set_Error_Data ] = useState<any[]>( [] ) ; 


    // 篩選出 _ 已經被刪除的加價單
    const extra_Fee_Deleted  = date_Extra_Fee.filter( x => x?.is_delete === 1 ) ;   


    // 加總異常資料
    useEffect( () => {  
    
        // 加上額外取得資料 
        const error_Arr = services_Delete_Error.concat( is_GoHome_UnPaid , extra_Fee_Deleted ) ;
 
        // 依據 _ 更新時間欄位( updated_at ) , 降冪( desc ) 排序
        const _error_Arr = sort_Data_By_UpdatedDate( error_Arr , 'desc' ) ;
 
        set_Error_Data( _error_Arr ) ;
 
     } , [ services_Delete_Error , is_GoHome_UnPaid , date_Extra_Fee ] ) ;


     return error_Data



} ;