/* eslint-disable react/jsx-pascal-case */

import Pets_Rows from "components/pets/Pets_Rows";
import { Admin_Table } from "utils/Interface_Type" ;




// @ 寵物列表
const Pets_Table = ( { data } : Admin_Table ) => {

    
    return <table className="table is-fullwidth is-hoverable">

                <thead>

                    <tr>
                        <th style={{ height : "10px" , width : "100px" }}> 寵物編號 </th>
                        <th> 寵物資訊 </th>
                        <th> 主人姓名 </th>
                        <th> 主人手機 </th>
                        <th> 服務紀錄 </th> 
                        <th> 建檔日期 </th>
                        <th> 封 存   </th>
                    </tr>

                </thead>

                <tbody>

                   { data?.data.map( ( item : any , index : any ) => <Pets_Rows key={ index } data={ item } /> ) }

                </tbody>

           </table>

} ;


export default Pets_Table
       