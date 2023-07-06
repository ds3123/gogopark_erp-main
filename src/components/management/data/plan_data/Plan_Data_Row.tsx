import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Update_Custom_Plan from "components/plan/custom_plan/Update_Custom_Plan" ;

import { useDelete_Custom_Plan } from "hooks/react-query/plan/useDeletePlan";



import { CreateCustomPlanProvider } from "components/plan/custom_plan/contexts/createCustomPlanContext";




const Plan_Data_Row = ( { data } : { data : any } ) => {

    const dispatch = useDispatch() ;

    // 刪除 _ 自訂方案 Mutation
    const delete_Custom_Plan = useDelete_Custom_Plan() ;


    // 點選 _ 新增 : 方案類型
    const click_Plan = ( plan : any ) => dispatch( set_Modal( true , 
                                                               <CreateCustomPlanProvider> <Update_Custom_Plan /> </CreateCustomPlanProvider>, 
                                                              { data : plan , modal_Style : { width : "90%" , height:"auto" , left : "5%" } } )) ;
    
   
    // 點選 _ 刪除自訂方案
    const click_Delete_Plan = ( plan_Id : string ) => {

      // 驗證
      if( !plan_Id ){ alert( '刪除錯誤' ); return false; }
      
      // 刪除 _ 自訂方案
      delete_Custom_Plan( plan_Id ) ;

    } ; 

    
    const bt = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;


    return <tr>
                <td className="td_Left"> 
                   <b className="tag is-medium pointer" style={ bt } onClick = { () => click_Plan( data ) } > { data['plan_name'] } </b> 
                </td>      
                <td> { data['bath_num'] }       </td>      
                <td> { data['beauty_num'] }     </td>      
                <td> { data['plan_period'] }    </td>      
                <td> { data['default_price'] }  </td>    
                <td> { data['created_at'].slice(0,10) } </td>        
                <td className="td_Left"> { data['plan_note'] }      </td>    
                <td>
                      <b className="delete" onClick={ () => { if( window.confirm( "確認要刪除此自訂方案？" ) ) click_Delete_Plan( data?.id )  }  } ></b> 
                </td>      
           </tr> 

} ;

export default Plan_Data_Row
       