/* eslint-disable react/jsx-pascal-case */


import Error_Rows from "components/management/data/error/Error_Rows";

import { is_Downloading } from "templates/note/Query_Info" ;
import { usePagination_Query } from 'hooks/react-query/common/usePagination' ;
import { fetch_Shop_Service_Error_Page } from "utils/api/api_Service" ;
import { serviceKeys } from "react-query/query-key/serviceKeys";



// @ 服務異常清單
const Error_List = ( ) => {

   
     // useQuery 查詢 Key
     const query_Key  = ( shop_Id : string , page : number = 1 ) => 
                               serviceKeys.error_page( shop_Id , page ) ; 

     // useQuery 查詢函式                        
     const query_Func = ( shop_Id : string , page : number = 1 ) => 
                               fetch_Shop_Service_Error_Page( shop_Id , page ) ;


     // # 取得 _ 特定店家，其客戶狀態為 : 審核中、通過
     const { data , isFetching , pagination_Nav } = usePagination_Query( query_Key , query_Func ) ;


    return <>

               <table className="table is-fullwidth is-hoverable relative" style={{ width:"110%" , left:"-5%" }}>

                  <thead>
                      <tr>
                         <th> 區域別  </th> 
                         <th> 店 別   </th>   
                         <th> 服務類別 </th>
                         <th> 寵物資訊 </th>
                         <th> 客戶姓名 </th>
                         <th> 異常原因 </th>
                         <th> 提出人員 </th>
                         <th> 提出時間 </th>
                         <th> 處理狀態 </th>
                         <th> 解除異常 </th>
                      </tr>
                  </thead>

                  <tbody>

                    { data?.data.map( ( item : any , index : any ) => <Error_Rows key={ index } data={ item } /> ) }

                  </tbody>

              </table>

              { /* 下載圖示 */ }
              { isFetching && is_Downloading() }

              { /* 分頁按鈕 */ }
              { pagination_Nav }

          </>


} ;

export default Error_List