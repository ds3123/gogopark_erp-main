import { useEffect } from 'react' ;
import useCreate_App_Container_Context  from "containers/contexts/appContainerContext" ;

import Lodge from "components/lodge/Lodge" ;
import Care from "components/lodge/care/Care" ;

// @ 住宿區塊 ( 次分類標籤 : 住宿、安親 )
export const Lodge_Box = () => { 

    

    // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 
    const { service_Second_Nav_Tab , set_Service_Second_Nav_Tab } = useCreate_App_Container_Context() ; 

    
    // 設定 _ 住宿第二層標籤 : 初始點選狀態 ( 住 宿 )
    useEffect( () => {
       
       set_Service_Second_Nav_Tab( '住 宿' ) ;
    
    } , [] ) ;
 

  return <div>

                { /* 住宿列表 */ }
                { service_Second_Nav_Tab === '住 宿' && 
              
                    <div data-testid = "lodge-component" >  <Lodge />  </div>

                }  

                { /* 安親列表 */ }
                { service_Second_Nav_Tab === '安 親' && 
              
                    <div data-testid = "care-component" >  <Care />  </div>

                }  

         </div>

}