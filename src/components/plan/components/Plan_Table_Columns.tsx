


// # 表格標題欄位
const Plan_Table_Columns = (  ) => {

  return  <tr>
                <th> 類 型     </th>
                <th> 客 戶     </th>
                <th> 寵 物     </th>
                <th style={{ width:"250px" }}> 小計 (元)                        </th>
                <th style={{ width:"210px" }}> <b className="fDred">建檔</b>日  </th>
                <th style={{ width:"210px" }}> <b className="fDred">收款</b>日  </th>
                <th style={{ width:"210px" }}> <b className="fDblue">開始</b>日 </th>
                <th style={{ width:"210px" }}> <b className="fDblue"> 結束</b>日 </th>
                <th style={{ width:"380px" }}> 期限 (天)                         </th>
                <th style={{ width:"100px" }}> 使用情形                           </th>
                <th style={{ width:"100px" }}> 刪除                             </th> 
                { /* <th>  封 存  </th> */ }
          </tr>


} ;

export default Plan_Table_Columns  