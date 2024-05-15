/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react' ;
import Services from "./Services" ;
import Plans from "components/plan/Plans" ;
import useCreate_App_Container_Context  from "containers/contexts/appContainerContext" ;
import { useDispatch } from 'react-redux';
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Plans_Done_List from 'components/plan/plan_done/Plans_Done_List';



// @ 洗美區塊 ( 次分類標籤 : 洗美、方案 )
export const Services_Box = () => {

    const dispatch     = useDispatch() ;




    // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 
    const { service_Second_Nav_Tab , set_Service_Second_Nav_Tab } = useCreate_App_Container_Context() ; 


    // 顯示 _ 已用完方案
    const show_Plans_Done = () => dispatch( set_Side_Panel( true , <Plans_Done_List /> , { preLoadData : null } ) );

    
    // 設定 _ 洗美第二層標籤 : 初始點選狀態 -> 洗 美 
    useEffect( () => {

        set_Service_Second_Nav_Tab( '洗 美' )  ;
      
    } , [] ) ;


    return <div className = "relative">

                { /* 洗美列表 */ }
                { service_Second_Nav_Tab === '洗 美' && 
              
                    <div data-testid = "service-component" > <Services /> </div>

                }     
                 
                { /* 方案列表 */ }
                { service_Second_Nav_Tab === '方 案' && 
                
                    <div data-testid = "plan-component" > <Plans /> </div>
                  
                }
            
                { /* 方案列表 ( 已用完 ) */ }
                <b onClick = { () => show_Plans_Done() }  className = "tag is-medium is-link is-rounded pointer absolute" style = {{ top:"10px" , left : "230px" }}> 
                    <i className = "fas fa-file-alt"/> &nbsp; 方 案 ( 已用完 ) 
                </b>
  
           </div>


} ;
       