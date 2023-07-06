import Care_Rows from "components/lodge/care/Care_Rows"
import { Admin_Table } from "utils/Interface_Type" ;



const Care_Table = ( { data } : Admin_Table  ) => {


    return <table className="table is-fullwidth is-hoverable relative" style={{width:"110%",left:"-5%"}} >

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
                        <th> 應 收    </th>
                        <th> 實 收    </th>
                        <th> 封 存    </th>
                    </tr>
                </thead>

                <tbody>

                   { data?.data.map( ( item : any , index : any ) => <Care_Rows key={ index } data={ item } /> ) }

                </tbody>

          </table>


} ;


export default Care_Table
       