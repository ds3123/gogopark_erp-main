/* eslint-disable react/jsx-pascal-case */
import { usePlan_Used_Records_Data } from "hooks/data/usePlan_Used_Records_Data" ;
import Plan_Used_Records_Title from "./common/plan_used/Plan_Used_Records_Title" ;
import Plan_Used_Records_Table from "./common/plan_used/Plan_Used_Records_Table" ;





// @ 個別方案 _ 使用情形 
const Plan_Used_Records = () => {


    // 取得 _ 使用紀錄資料物件 ( 方案資料、方案類型、套用品種名稱、方案使用紀錄  )
    const { data , plan_Type , applied_Species_Name , _plan_Used_Records } = usePlan_Used_Records_Data() ;



    if( _plan_Used_Records.length === 0 ) return <b className = "tag is-large is-danger" >
                                                    <i className = "far fa-folder-open" ></i> &nbsp; 無方案使用紀錄
                                                 </b> ;


    return <div>

                { /* 標題列 */ }   
                <Plan_Used_Records_Title plan_Type = { plan_Type } applied_Species_Name = { applied_Species_Name }  data = { data } />
            
                <hr className = "m_Top_70 m_Bottom_50" />
            
                { /* 使用紀錄內容 */ }
                <div className = "relative" >
                   <Plan_Used_Records_Table _plan_Used_Records = { _plan_Used_Records } />
                </div> 

           </div>

} ;

export default Plan_Used_Records

