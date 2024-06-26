/* eslint-disable react/jsx-pascal-case */

import Plan_Data_Row from "./Plan_Data_Row" ;
import { useDispatch  } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Create_Custom_Plan from "components/plan/custom_plan/Create_Custom_Plan" ;
import { CreateCustomPlanProvider } from "components/plan/custom_plan/contexts/createCustomPlanContext";
import { useFetch_Custom_Plans } from "hooks/react-query/plan/useFetchPlans" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";




// @ 所有方案資訊
const Plan_Data_List = () => {
   

     const dispatch = useDispatch() ;

     
     // 取得 _ 所有 : 自訂方案
     const custom_Plans = useFetch_Custom_Plans( useAccount_Shop_Id() ) ;

   
     // 點選 _ 新增 : 自訂方案
     const click_Create_Custom_Plan = () => dispatch( set_Modal( true ,   
                                                       <CreateCustomPlanProvider> <Create_Custom_Plan />  </CreateCustomPlanProvider>  , 
                                                       { data : null , modal_Style : { width : "110%" , height:"auto" , left : "-5%" } } )
                                                     ) ;
    
   
   return <>
   


             <b className="tag is-medium is-warning pointer m_Bottom_80" style={{ float:"right" }} onClick={ () => click_Create_Custom_Plan() } > 
                <i className="fas fa-file-alt"></i> &nbsp; 新增 : 自訂方案 
             </b> 
 

              <table className="table is-fullwidth is-hoverable relative m_Bottom_100" >
                        
                  <thead>
                     <tr>
                        <th> 方案名稱                     </th>
                        <th> <b style={{ color : "rgb(0,0,160)" }}>洗澡</b>次數 </th>
                        <th> <b style={{ color : "rgb(0,0,160)" } }>美容</b>次數 </th>
                        <th> 使用期限 ( 天 )              </th>
                        <th> 預設價格 ( 元 )              </th>
                        <th> 建立日期                     </th>
                        <th> 備 註                        </th>
                        <th> 刪 除                        </th>
                     </tr>
                  </thead> 
                  <tbody>
                     { custom_Plans.map( ( x : any , y : number ) => <Plan_Data_Row key = { y } data = { x } /> )  }  
                  </tbody>  

              </table>      
   
          </>
   
} ;

export default Plan_Data_List
       