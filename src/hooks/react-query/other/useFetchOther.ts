import { useQuery } from "react-query" ;
import { otherKeys } from "react-query/query-key/otherKeys" ;
import { fetch_Others_By_CreatedDate } from "utils/api/api_Other" ;





// @ 取得 _ 特定 [ 建檔日期 ] ( 欄位 : created_at ) : 所有其他收入、支出
export const useFetch_Others_By_CreatedDate = ( account_id : string , created_date : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                            otherKeys.created_date( account_id , created_date ) , 
                                           () => fetch_Others_By_CreatedDate( account_id , created_date ) 
                                         )
 
    return data                                        
 
 }
 