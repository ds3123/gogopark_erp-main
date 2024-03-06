/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react' ;

// 分頁套件、呼叫邏輯｀
import Data_List_Nav from "templates/nav/Data_List_Nav" ;
import Data_List_Sum from "templates/search/Data_List_Sum" ;
import { is_Downloading , no_Query_Data } from "templates/note/Query_Info" ;
import { Services } from "utils/Interface_Type" ;

// # 行政區各區塊 ( 客戶、寵物、洗澡、方案、安親、住宿 ) 資料清單表格
import Customers_Table from "components/customers/Customers_Table" ; // 客戶
import Pets_Table from "components/pets/Pets_Table" ;                // 寵物
import Services_Table from 'components/services/Services_Table';     // 洗美
import Plans_Table from 'components/plan/Plans_Table';               // 方案
import Lodge_Table from "components/lodge/Lodge_Table" ;             // 住宿
import Care_Table from "components/lodge/care/Care_Table" ;          // 安親
import { useFilter_Service_Date } from "hooks/data/useFilter" ; 
import { get_Api_Obj } from "utils/api/tool" ;
import { usePagination_List } from "hooks/react-query/common/usePagination" ;
import Page_Button_Nav from "templates/button/Page_Button_Nav" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useSearch_Keyword } from "hooks/data/useSearch" ;


type Admin_Data = {
    
   data_Type : Services ;  // 資料類型 ( Ex. customer , pet , service , lodge , care , plan )

}




// @ 行政區 : 各區塊 ( 客戶、寵物、洗美、方案、安親、住宿 ) 共用 _ 資料清單版面
const Admin_Data_Render = ( { data_Type  } : Admin_Data ) => {

    
    // 目前資料分頁頁碼
    const[ current_Page , set_CurrentPage ] = useState( 1 ) ;


    // 目前登入者，所屬商店 id    
    const shop_Id   = useAccount_Shop_Id() ; 

    // API : 根據資料類型、登入者所屬商店 id，取得 _ 各類型資料 ( Ex. 客戶、寵物、洗美、安親、住宿 ... )
    const query_API = get_Api_Obj( data_Type , shop_Id ) ;


    // 所輸入搜尋關鍵字 / 取得搜尋框中的關鍵字方法
    const { search_Keyword , get_SearchKeyword } = useSearch_Keyword() ;

   
    // 取得 _ 額外篩選條件 : 來店日期 ( 洗美 ) / 住房期間 ( 住宿 ) 
    const { filter_Date_1 , filter_Date_2 } = useFilter_Service_Date( data_Type ) ;


    // # 主要查詢
    const { data , isLoading , isFetching , isPreviousData , refetch } = usePagination_List( current_Page , query_API , search_Keyword , filter_Date_1 , filter_Date_2 ) ; 

    
    return <div className = "relative" >
              
               { !isLoading && <>
               
                                   { /* 第二層標籤、篩選條件、搜尋框  */ } 
                                   <Data_List_Nav get_Search_Text = { get_SearchKeyword } 

                                                  refetch = { refetch }
                                   
                                                 data_Type = { data_Type } /> 
                                 
                                   { /* 資料筆數 */ } 
                                   <Data_List_Sum data_Sum = { data.total } /> 

                                </>
               }  

               { /* 下載圖示 */ }
               { isFetching && is_Downloading() }

               { /* 判斷 _ 依資料型態 ( data_Type )，選擇顯示：資料清單表格 ( 客戶、寵物、洗美、方案、安親、住宿 ) */ }  
               { ( data_Type === 'customer' && !isFetching ) &&  <Customers_Table data = { data } />  }
               { ( data_Type === 'pet'      && !isFetching ) &&  <Pets_Table      data = { data } />  }
               { ( data_Type === 'service'  && !isFetching ) &&  <Services_Table  data = { data } />  }
               { ( data_Type === 'plan'     && !isFetching ) &&  <Plans_Table     data = { data } />  }
               { ( data_Type === 'lodge'    && !isFetching ) &&  <Lodge_Table     data = { data } />  }
               { ( data_Type === 'care'     && !isFetching ) &&  <Care_Table      data = { data } />  }
               

               { /* 查無相關資料 */ }
               { ( !isFetching && data.total === 0 ) && no_Query_Data() }  

               { /* 分頁按鈕 */ }
               { !isFetching &&  <Page_Button_Nav pages_Sum      = { data.last_page  } 
                                                  current_Page   = { current_Page    } 
                                                  setPage        = { set_CurrentPage } 
                                                  isPreviousData = { isPreviousData  }  />
               }

           </div> 

} ;

export default Admin_Data_Render
       