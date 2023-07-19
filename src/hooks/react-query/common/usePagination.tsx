/* eslint-disable react/jsx-pascal-case */

import { useQuery, useQueryClient } from "react-query" ;
import { commonKeys } from "react-query/query-key/commonKeys" ;
import { fetch_Type_Page_List } from "utils/api/api_Common" ;
import { useState } from 'react' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import Page_Button_Nav from "templates/button/Page_Button_Nav" ;


type Query = ( shop_Id : string , page : number ) => any




// @ 作業區 : 各類型資料列表 ( 客戶、寵物、服務 ... ) 
export const usePagination_List = ( page : number = 1  , api : string , search : string , filter_Date_1 : string , filter_Date_2 : string ) => { 

   // 預設值
   const fallback = { 
                       current_page : 1 ,   // 目前頁數
                       data         : [] ,  // 資料
                       total        : 0 ,   // 資料筆數 
                       last_page    : 1     // 最後一頁頁碼   
                    } ;


   // 查詢                 
   const { data = fallback , isLoading , isFetching  , isError , error , isPreviousData , refetch } = useQuery( 

                                                   // commonKeys.type_List_Data( page , api , search , filter_Date_1 , filter_Date_2 ) ,                                                   
                                                   commonKeys.type_List_Data( page , api , filter_Date_1 , filter_Date_2 ) , // 不監聽 search                                                  
                                                   //"type_List_Data" , // 不監聽以上參數
                                                   () => fetch_Type_Page_List( page , api , search , filter_Date_1 , filter_Date_2  ) ,
                                                   { 
                                                    
                                                     keepPreviousData     : true ,

                                                     refetchOnMount       : true ,
                                                     refetchOnWindowFocus : false ,  // 關掉 _ 一 forcus 螢幕，就 refetch

                                                     // 10 分鐘後，才可 re-fetch
                                                     staleTime            : 600000 , 
                                                    
                                                     // 快取時間 ( cacheTime ) 要比 不新鮮時間 ( staleTime ) 長  ( default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime ）
                                                     cacheTime            : 900000 , 
                                     

                                                   }  

                                                 ) ;

   return { data , isLoading  , isFetching , isError , error , isPreviousData , refetch }


}




/*

  @ 通用分頁查詢

   # Param_1 : useQuery 查詢 key
   # Param_2 : useQuery 查詢函式

   # Return  : 查詢資料、狀態、分頁按鈕列


*/ 
export const usePagination_Query = ( query_Key : Query , query_Func : Query ) => {

     // 目前資料分頁頁碼
     const[ current_Page , set_CurrentPage ] = useState( 1 ) ;

     // 目前使用者，所屬店家 id
     const shop_Id = useAccount_Shop_Id() ;
 
 
     // 預設值
     const fallback : any = { 
                             current_page : 1 ,   // 目前頁數
                             data         : [] ,  // 資料
                             total        : 0 ,   // 資料筆數 
                             last_page    : 1     // 最後一頁頁碼   
                           } ;
 

     const { data = fallback , isFetching , isPreviousData } = useQuery( 
                                                                         query_Key( shop_Id , current_Page ) , 
                                                                         () => query_Func( shop_Id , current_Page ) ,
                                                                         { keepPreviousData : true  }    
                                                                       ) ; 
 
     // 分頁按鈕列                                                                  
     const pagination_Nav = !isFetching ? <Page_Button_Nav pages_Sum      = { data.last_page  } 
                                                           current_Page   = { current_Page    } 
                                                           setPage        = { set_CurrentPage } 
                                                           isPreviousData = { isPreviousData  } /> : null ;
  
                                       
     return { data , isFetching , pagination_Nav } 



} ;