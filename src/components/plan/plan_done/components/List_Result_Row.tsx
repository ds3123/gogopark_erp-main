/* eslint-disable react/jsx-pascal-case */

import Plan_Used_Records_Button from "components/plan/components/Plan_Used_Records_Button";
import Plan_Type from '../components/Plan_Type' ; 
import Customer_Info_Button from "./Customer_Info_Button" ; 
import Pet_Info_Button from "./Pet_Info_Button";




// # 篩選結果 _ 列
const List_Result_Row : React.FC< { data : any } > = ( { data } ) => {

   

  return <div className = "columns p-4 m_Bottom_20" >

            <div className = "column is-3" >
                
               <Plan_Type data = { data } /> 
                 
            </div>
            
            <div className = "column is-3" > 

               <Pet_Info_Button data = { data } />

            </div>
            
            <div className = "column is-3" > 
              
               <Customer_Info_Button data = { data } />

            </div>
            
            <div className = "column is-offset-1 is-1 has-text-centered" > 

                 <Plan_Used_Records_Button plan = { data } /> 
                 
            </div>

          </div>

} ;

export default List_Result_Row  