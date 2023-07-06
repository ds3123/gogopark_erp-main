/* eslint-disable react/jsx-pascal-case */

import Reject_Customer_Row from './Reject_Customer_Row' ;
import { is_Downloading } from "templates/note/Query_Info" ;

import { usePagination_Query } from 'hooks/react-query/common/usePagination';
import { customerKeys } from "react-query/query-key/customerKeys" ; 
import { fetch_Shop_Customers_On_Rejected } from "utils/api/api_Customer" ;


// @ 拒接客戶
const Reject_Customer_List = () => {


    // useQuery 查詢 Key
    const query_Key  = ( shop_Id : string , page : number = 1 ) => 
                            customerKeys.shop_on_rejected( shop_Id , page ) ; 
    
    // useQuery 查詢函式                        
    const query_Func = ( shop_Id : string , page : number = 1 ) => 
                            fetch_Shop_Customers_On_Rejected( shop_Id , page ) ;


    // # 取得 _ 特定店家，其客戶狀態為 : 審核中、通過
    const { data , isFetching , pagination_Nav } = usePagination_Query( query_Key , query_Func ) ;
    

    return <>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                            <th> 區域別  </th> 
                            <th> 店 別   </th> 
                            <th> 客戶姓名 </th>
                            <th> 手機號碼 </th>
                            <th> 寵物資訊 </th>
                            <th> 通訊地址 </th>
                            <th> 拒接處理狀態 </th>
                        </tr>
                    </thead>

                    <tbody>

                        { data?.data.map( ( item : any , index : any ) => <Reject_Customer_Row key={ index } data = { item } /> ) }

                    </tbody>

                </table>

                { /* 下載圖示 */ }
                { isFetching && is_Downloading() }

                { /* 分頁按鈕 */ }
                { pagination_Nav }

            </> 


} ;


export default Reject_Customer_List
       

