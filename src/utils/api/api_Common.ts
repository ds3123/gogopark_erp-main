

import axios from 'utils/axios' ;


// [ GET ] ---------------

// 取得 _ 各類型（ for 作業區：客戶、寵物、洗美、方案、住宿、安親 ）_ 所有資料 ( for React Query )  
export const fetch_Type_Page_List = ( 
                                      page          : number = 1 , 
                                      api           : string , 
                                      search        : string , 
                                      filter_Date_1 : string , 
                                      filter_Date_2 : string  
                                     ) =>  axios.get( `${ api }?page=${ page }&search=${ search }&date_1=${ filter_Date_1 }&date_2=${ filter_Date_2 }` )
                                                .then( res => res.data ) ;

