

import Lodge_Rows from "components/lodge/Lodge_Rows" ;
import { Admin_Table } from "utils/Interface_Type" ;




// @ 住宿列表
const Lodge_Table = ( { data } : Admin_Table ) => {



    return   <table className="table is-fullwidth is-hoverable relative" style={{ width:"116%" , left:"-8%" }}>

                    <thead>

                        <tr>

                            <th> 自訂編號 </th>
                            <th> 寵物資訊 </th>
                            <th> 客戶姓名 </th>
                            <th> 房號 ( 房型 ) </th>
                            <th> 價格方案
                                 </th>
                            <th> <span className="fDblue" >入住</span> : 日期 / 時間 </th>
                            <th> <span className="fDblue" >退房</span> : 日期  </th>
                            <th> 住宿價 </th>
                            <th> 安親費 </th>
                            <th> 個體調整 </th>
                            <th> 接送費   </th>
                            <th> 應 收    </th>
                            <th> 實 收    </th>
                            <th> 封 存    </th>

                        </tr>

                    </thead>

                    <tbody>

                        { data?.data.map( ( item : any , index : any ) => <Lodge_Rows key={ index } data={ item } /> )}

                    </tbody>

             </table>


} ;


export default Lodge_Table
       