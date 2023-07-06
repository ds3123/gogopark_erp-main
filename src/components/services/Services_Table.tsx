/* eslint-disable react/jsx-pascal-case */

import Services_Rows from "components/services/Services_Rows"
import { Admin_Table } from "utils/Interface_Type" ;



const Services_Table = ( { data } : Admin_Table ) => {


    return  <table className="table is-fullwidth is-hoverable relative" style = {{ width:"126%" , left:"-13%" }}>

                <thead>

                    <tr>
                        <th>  服務類別  </th>
                        <th>  寵物資訊  </th>
                        <th>  客戶姓名  </th>
                        {/* <th>  付款方式  </th> */}
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
                        <th>  封 存     </th>
                    </tr>

                </thead>

                <tbody>

                  {  data?.data.map( ( item : any , index : any ) => <Services_Rows key={ index } data={ item } /> ) }

                </tbody>

           </table>



} ;


export default Services_Table
       