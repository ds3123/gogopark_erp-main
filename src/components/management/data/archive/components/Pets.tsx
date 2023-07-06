
import Pets_Rows from "components/pets/Pets_Rows" ;

import { is_Downloading } from "templates/note/Query_Info" ;
import { usePagination_Query } from 'hooks/react-query/common/usePagination' ;
import { fetch_Shop_Pets_Archive_Page } from "utils/api/api_Pet" ;
import { petKeys } from "react-query/query-key/petKeys" ;



// @ 寵物 _ 封存資料
const Pets = ( ) => {

    
     // useQuery 查詢 Key
     const query_Key  = ( shop_Id : string , page : number = 1 ) => 
                               petKeys.shop_archive_page( shop_Id , page ) ; 

     // useQuery 查詢函式                        
     const query_Func = ( shop_Id : string , page : number = 1 ) => 
                               fetch_Shop_Pets_Archive_Page( shop_Id , page ) ;


     // # 取得 _ 特定店家，其客戶狀態為 : 審核中、通過
     const { data , isFetching , pagination_Nav } = usePagination_Query( query_Key , query_Func ) ;



    return <>

                <table className="table is-fullwidth is-hoverable relative" >

                    <thead>
                        <tr>
                            <th style={{height:"10px",width:"100px"}}> 寵物編號 </th>
                            <th> 寵物資訊 </th>
                            <th> 主人姓名 </th>
                            <th> 主人手機 </th>
                            {/*<th style={{width:"100px"}}> <b className="fBlue">單次</b>洗澡 </th>*/}
                            {/*<th style={{width:"100px"}}> <b className="fBlue">單次</b>美容 </th>*/}
                            {/*<th style={{width:"100px"}}> <b className="fBlue">包月</b>洗澡 </th>*/}
                            {/*<th style={{width:"100px"}}> <b className="fBlue">包月</b>美容 </th>*/}
                            <th> 服務紀錄 </th>
                            <th> 建檔日期 </th>
                            <th> 復 原   </th>
                            <th> 刪 除   </th>
                        </tr>
                    </thead>

                    <tbody>

                      { data?.data.map( ( item : any , index : any ) =>  <Pets_Rows key={ index } data={ item } /> ) }

                    </tbody>

                </table>

                { /* 下載圖示 */ }
                { isFetching && is_Downloading() }

                { /* 分頁按鈕 */ }
                { pagination_Nav }

           </>


} ;

export default Pets