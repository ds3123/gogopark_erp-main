/* eslint-disable react/jsx-pascal-case */
import Plans_Rows from "components/plan/Plans_Rows"
import { Admin_Table } from "utils/Interface_Type" ;


const Plans_Table = ( { data } : Admin_Table ) => {


    return <table className="table is-fullwidth is-hoverable relative" style={{ width:"124%" , left:"-12%" }}>

                <thead>

                    <tr>
                        <th> 類 型     </th>
                        <th> 客 戶     </th>
                        <th> 寵 物     </th>
                        <th style={{ width:"250px" }}> 小 計 (元)                        </th>
                        <th style={{ width:"230px" }}> <b className="fDred">建檔</b>日期  </th>
                        <th style={{ width:"230px" }}> <b className="fDred">收款</b>日期  </th>
                        <th style={{ width:"250px" }}> <b className="fDblue">開始</b>日期 </th>
                        <th style={{ width:"250px" }}> <b className="fDblue">結束</b>日期 </th>
                        <th style={{ width:"340px" }}> 期 限 (天)                       </th>
                        <th style={{ width:"100px" }}> 使用情形                            </th>
                        <th style={{ width:"90px"  }}> 刪 除                              </th> 
                        { /* <th>  封 存  </th> */ }
                    </tr>

                </thead>

                <tbody>

                  { data?.data.map( ( item : any , index : any ) => <Plans_Rows key={ index } data={ item } /> )  }

                </tbody>

          </table>

} ;


export default Plans_Table
       