/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react' ;
import Services from "./Services" ;
import Plans from "components/plan/Plans" ;

import useCreate_App_Container_Context  from "containers/contexts/appContainerContext" ;



// @ 洗美區塊 ( 次分類標籤 : 洗美、方案 )
export const Services_Box = () => {


    // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 
    const { service_Second_Nav_Tab , set_Service_Second_Nav_Tab } = useCreate_App_Container_Context() ; 
    
   

    // 設定 _ 洗美第二層標籤 : 初始點選狀態 -> 洗 美 
    useEffect( () => {

        set_Service_Second_Nav_Tab( '洗 美' )  ;
      
    } , [] ) ;


    return <div>
  
                { /* 洗美列表 */ }
                { service_Second_Nav_Tab === '洗 美' && 
              
                    <div data-testid = "service-component" >  <Services />  </div>

                }     
                 
                { /* 方案列表 */ }
                { service_Second_Nav_Tab === '方 案' && 
                
                    <div data-testid = "plan-component" >  <Plans />  </div>
                  
                }

           </div>


} ;
       