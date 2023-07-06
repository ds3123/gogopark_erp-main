

import Customers_Rows from "components/customers/Customers_Rows";

import { is_Downloading } from "templates/note/Query_Info" ;
import { usePagination_Query } from 'hooks/react-query/common/usePagination' ;
import { fetch_Shop_Customers_Archive_Page } from "utils/api/api_Customer" ;
import { customerKeys } from "react-query/query-key/customerKeys";



// @ 客戶 _ 封存資料
const Customers = ( ) => {

    
      // useQuery 查詢 Key
      const query_Key  = ( shop_Id : string , page : number = 1 ) => 
                                customerKeys.shop_archive_page( shop_Id , page ) ; 

      // useQuery 查詢函式                        
      const query_Func = ( shop_Id : string , page : number = 1 ) => 
                                 fetch_Shop_Customers_Archive_Page( shop_Id , page ) ;


      // # 取得 _ 特定店家，其客戶狀態為 : 審核中、通過
      const { data , isFetching , pagination_Nav } = usePagination_Query( query_Key , query_Func ) ;


   
    return  <>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                            <th> 客戶姓名   </th>
                            <th> 身分證字號 </th>
                            <th> 手機號碼   </th>
                            <th> 寵物資訊   </th>
                            <th> 通訊地址   </th>
                            <th> 消費歷史   </th>
                            <th> 建檔日期   </th>
                            <th> 復 原     </th>
                            <th> 刪 除     </th>
                        </tr>
                    </thead>

                    <tbody> 

                        { data?.data.map( ( item : any , index : any ) => <Customers_Rows key={ index } data={ item } /> ) }

                    </tbody>

                </table>

                { /* 下載圖示 */ }
                { isFetching && is_Downloading() }

                { /* 分頁按鈕 */ }
                { pagination_Nav }

             </>

} ;

export default Customers