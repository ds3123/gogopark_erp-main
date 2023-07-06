

import Lodge_Rows from "../../../../lodge/Lodge_Rows";

import { is_Downloading } from "templates/note/Query_Info" ;
import { usePagination_Query } from 'hooks/react-query/common/usePagination' ;
import { fetch_Shop_Lodge_Archive_Page } from "utils/api/api_Lodge" ;
import { lodgeKeys } from "react-query/query-key/lodgeKeys";




// @ 客戶 _ 封存資料
const Lodge = ( ) => {


    
     // useQuery 查詢 Key
     const query_Key  = ( shop_Id : string , page : number = 1 ) => 
                               lodgeKeys.archive_page( shop_Id , page ) ; 

     // useQuery 查詢函式                        
     const query_Func = ( shop_Id : string , page : number = 1 ) => 
                               fetch_Shop_Lodge_Archive_Page( shop_Id , page ) ;


     // # 取得 _ 特定店家，其客戶狀態為 : 審核中、通過
     const { data , isFetching , pagination_Nav } = usePagination_Query( query_Key , query_Func ) ;


    


    return   <>

                <table className="table is-fullwidth is-hoverable relative" style={{ width:"110%" , left:"-5%" }}>

                    <thead>
                        <tr>

                            <th> 寵物資訊 </th>
                            <th> 客戶姓名 </th>
                            <th> 房號 ( 房型 ) </th>
                            <th> <span className="fDblue" >入住</span> : 日期 / 時間 </th>
                            <th> <span className="fDblue" >退房</span> : 日期 / 時間 </th>
                            <th> 總天數   </th>
                            <th> 住宿價   </th>
                            <th> 個體調整 </th>
                            <th> 接送費   </th>
                            <th> 應 收    </th>
                            <th> 實 收    </th>
                            <th> 復 原    </th>
                            <th> 刪 除     </th>

                        </tr>
                    </thead>

                    <tbody>

                     { data?.data.map( ( item : any , index : any ) => <Lodge_Rows key={ index } data={ item } /> ) }

                    </tbody>

                </table>

                { /* 下載圖示 */ }
                { isFetching && is_Downloading() }

                { /* 分頁按鈕 */ }
                { pagination_Nav }

             </>

};

export default Lodge