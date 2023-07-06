
import { Services } from "utils/Interface_Type" ;

import { useSecond_Nav_Tabs } from 'hooks/layout/useSecond_Nav_Tabs' ;
import { useCookie_Click_Second_Nav } from "hooks/cookie/useCookie_Click_Second_Nav" ;
import useCreate_App_Container_Context  from "containers/contexts/appContainerContext" ;
import { useQueryClient } from "react-query" ;



type Options = {
    data_Type : Services ;  // 資料類型 ( Ex. customer , pet , services , lodge , care , plan )
} 


// @ 第二層 : 功能選項標籤 ( Ex. 洗美、方案 ; 住宿、安親 )
const Second_Nav_Options = ( { data_Type } : Options ) => {

    
    // 產生 _ 第二層 : 功能選項標籤 ( Ex. 洗美、方案 ; 住宿、安親 )
    const second_Tab_Options      = useSecond_Nav_Tabs( data_Type ) 

    
    // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 
    const { service_Second_Nav_Tab , set_Service_Second_Nav_Tab } = useCreate_App_Container_Context() ; 


    // 在新增 / 刪除方案，或新增 / 封存安親後，依照所新增的 Cookie，重導向、點選相對應的方案或安親標籤
    useCookie_Click_Second_Nav() ;



    const queryClient  = useQueryClient() ;


    // 點選 _ 第二層頁籤
    const click_Tab = ( item : any ) => {
    
        // 刪除快取 ( 再確認 2023.01.18 )
        if( item.title === "方 案") queryClient.invalidateQueries() ;
    
        set_Service_Second_Nav_Tab( item.title )

    } ;


    return <>   

                { /* 第 2 層選項 */
                    second_Tab_Options.map( ( item , index ) => {

                        return <b key          = { index }
                                  className    = { "pointer m_Right_30 tag is-medium is-success " + ( service_Second_Nav_Tab === item.title ? "" : "is-light" )  }
                                  onClick      = { () => click_Tab( item ) } >

                                  <i className = { item.icon }></i> &nbsp; { item.title } 

                               </b>

                    })
                }
        
           </>

} ;

export default Second_Nav_Options
       