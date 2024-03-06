

import Services_Rows from "components/services/Services_Rows";
import { is_Downloading } from "templates/note/Query_Info" ;
import { usePagination_Query } from 'hooks/react-query/common/usePagination' ;
import { fetch_Shop_Service_Archive_Page } from "utils/api/api_Service" ;
import { serviceKeys } from "react-query/query-key/serviceKeys";



// @ 洗美 _ 封存資料
const Services = () => {

    
     // useQuery 查詢 Key
     const query_Key  = ( shop_Id : string , page : number = 1 ) => 
                               serviceKeys.archive_page( shop_Id , page ) ; 

     // useQuery 查詢函式                        
     const query_Func = ( shop_Id : string , page : number = 1 ) => 
                              fetch_Shop_Service_Archive_Page( shop_Id , page ) ;


     // # 取得 _ 特定店家，其客戶狀態為 : 審核中、通過
     const { data , isFetching , pagination_Nav } = usePagination_Query( query_Key , query_Func ) ;
   
    

    return <div className="relative" style={{width:"114%" , left:"-7%"}}>

        <table className="table is-fullwidth is-hoverable">

            <thead>
                <tr>
                    <th>  服務類別  </th>
                    <th>  寵物資訊  </th>
                    <th>  客戶姓名  </th>
                    <th>  服務說明  </th>
                    <th>  服務價格  </th>
                    <th>  個體調整  </th>
                    <th>  加價項目  </th>
                    <th>  加價美容  </th>
                    <th>  接送費    </th>
                    <th>  應 收     </th>
                    <th>  實 收     </th>
                    <th>  付 款     </th>
                    <th>  來 店     </th>
                    <th>  復 原     </th>
                    <th>  刪 除     </th>
                </tr>
            </thead>

            <tbody>

              { data?.data.map( ( item : any , index : any ) => <Services_Rows key={ index } data={ item } /> ) }

            </tbody>

        </table>

        { /* 下載圖示 */ }
        { isFetching && is_Downloading() }

        { /* 分頁按鈕 */ }
        { pagination_Nav }

    </div>



} ;

export default Services
