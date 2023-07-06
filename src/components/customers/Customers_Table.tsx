import Customers_Rows from "components/customers/Customers_Rows";
import { Admin_Table } from "utils/Interface_Type" ;



// @ 客人列表
const Customers_Table = ( { data } : Admin_Table ) => {

    return  <table className="table is-fullwidth is-hoverable">

                <thead>

                    <tr>
                        <th> 客戶姓名   </th>
                        <th> 身分證字號 </th>
                        <th> 手機號碼   </th>
                        <th> 寵物資訊   </th>
                        <th> 通訊地址   </th>
                        <th style={{ width:"100px" }}> 消費歷史 </th>
                        <th> 建檔日期   </th>
                        <th> 封 存     </th>
                    </tr>

                </thead>

                <tbody>

                   { data?.data.map( ( item : any , index : any ) => <Customers_Rows key = { index } data = { item } /> ) }

                </tbody>

            </table>

} ;

export default Customers_Table
       