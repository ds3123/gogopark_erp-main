/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react/jsx-pascal-case */
import Plan_Used_Records_Table_Row from './Plan_Used_Records_Table_Row' ;




type Plan_Used_Records_Table = {

    _plan_Used_Records : any[] ;
    
}


// @ 方案使用列表
const Plan_Used_Records_Table = ( { _plan_Used_Records } : Plan_Used_Records_Table ) => {



   return <table className = "table is-fullwidth is-hoverable" >
         
                <thead>

                    <tr>
                        
                        <th  style={{ width:"290px" }}>  服務類型  <span className="f_10"> ( 使用紀錄 id / 洗美單 id ) Q碼 </span> </th>  
                        <th>  服務說明  </th>
                        <th>  加價項目  </th>
                        <th>  開單日期  </th>
                        <th>  到店日期  </th>
                        <th className="relative" style={{ width:"80px" }}>  
                              狀 態 
                        </th>

                    </tr>

                </thead>

                <tbody>

                   {
                     _plan_Used_Records.map( ( x : any , y : number ) =>  
                                                   <Plan_Used_Records_Table_Row key={ y } record_Id = { x['id'] } service_Id = { x['service_id'] } /> )
                   }

                </tbody>

           </table> 

} ;

export default Plan_Used_Records_Table
       