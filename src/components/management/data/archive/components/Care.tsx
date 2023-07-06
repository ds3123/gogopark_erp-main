

import Care_Rows from "../../../../lodge/care/Care_Rows";

import { is_Downloading } from "templates/note/Query_Info" ;
import { usePagination_Query } from 'hooks/react-query/common/usePagination' ;
import { fetch_Shop_Care_Archive_Page } from "utils/api/api_Care" ;
import { careKeys } from "react-query/query-key/careKeys";




// @ 安親 _ 封存資料
const Care = ( ) => {

    
     // useQuery 查詢 Key
     const query_Key  = ( shop_Id : string , page : number = 1 ) => 
                                careKeys.archive_page( shop_Id , page ) ; 

     // useQuery 查詢函式                        
     const query_Func = ( shop_Id : string , page : number = 1 ) => 
                                fetch_Shop_Care_Archive_Page( shop_Id , page ) ;


     // # 取得 _ 特定店家，其客戶狀態為 : 審核中、通過
     const { data , isFetching , pagination_Nav } = usePagination_Query( query_Key , query_Func ) ;


    return  <>

                <table className="table is-fullwidth is-hoverable relative" style={{width:"110%",left:"-5%"}} >

                    <thead>
                        <tr>
                            <th> 寵物資訊 </th>
                            <th> 客戶姓名 </th>
                            <th> 安親類別 </th>
                            <th> 來店日期 </th>
                            <th> 來店時間 </th>
                            <th> 來店方式 </th>
                            <th> 離店方式 </th>
                            <th> 安親價格 </th>
                            <th> 個體調整 </th>
                            <th> 接送費   </th>
                            <th> 應 收   </th>
                            <th> 實 收   </th>
                            <th>  復 原   </th>
                            <th>  刪 除   </th>
                        </tr>
                    </thead>

                    <tbody>

                    {  data?.data.map( ( item : any , index : any ) => <Care_Rows key={ index } data={ item } /> ) }

                    </tbody>

                </table>

                { /* 下載圖示 */ }
                { isFetching && is_Downloading() }

                { /* 分頁按鈕 */ }
                { pagination_Nav }

            </>





} ;

export default Care