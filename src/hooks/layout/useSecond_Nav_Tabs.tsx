

import { useState , useEffect } from 'react' ;
import { Services } from "utils/Interface_Type" ;


// 第二層標籤
const arr_Obj = {

    service_plan : [
                     { title : "洗 美" , icon : "fas fa-list-ol"  } ,
                     { title : "方 案" , icon : "fas fa-file-alt" } ,
                     { title : "方 案 ( 已用完 )" , icon : "fas fa-file-alt" } ,
                   ] ,

    lodge_care   : [
                     { title : "住 宿" , icon : "fas fa-home" } ,
                     { title : "安 親" , icon : "fas fa-baby-carriage" } 
                   ]

}



// @ 產生第二層標籤 ( Ex. 洗美區塊 -> 洗美、方案 ; 住宿區塊 -> 住宿、安親 )
export const useSecond_Nav_Tabs = ( data_Type : Services ) => { 

  const [ tabs , set_Tabs ] = useState<any[]>( [] ) ;

  useEffect( () => {

    switch( data_Type ){

       case 'service'   :  set_Tabs( arr_Obj['service_plan'] ) ;  break ;
       case 'plan'      :  set_Tabs( arr_Obj['service_plan'] ) ;  break ;
       case 'plan_done' :  set_Tabs( arr_Obj['service_plan'] ) ;  break ;

       case 'lodge'     :  set_Tabs( arr_Obj['lodge_care'] )   ;  break ;
       case 'care'      :  set_Tabs( arr_Obj['lodge_care'] )   ;  break ;

    }

     
  } , [ data_Type ] ) ;

  return tabs

}