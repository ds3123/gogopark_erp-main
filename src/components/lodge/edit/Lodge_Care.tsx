/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Lodge_Care_Fee from './components/service_fee/Lodge_Care_Fee';


type Care = {

   editType  : string | undefined ; 
   
   register  : any ;
   setValue  : any ;

   carePrice : string ;

}


// @ 安親費用
const Lodge_Care : FC< Care > = ( { editType , register , setValue , carePrice } ) => {


    return <>
                { /* 新增 */ }
                { !editType &&  <Lodge_Care_Fee register = { register } setValue = { setValue } /> }
                
                { /* 編輯 */ }
                { editType &&  <div className = "column is-3-desktop">  
                                  
                                  <b className = "tag is-primary is-large m_Left_10">
                                      <i className = 'fas fa-baby-carriage m_Right_10'></i> 安親費 
                                      <span className = "tag is-white m_Left_10 m_Right_10 fRed f_12 is-rounded" > { carePrice }  </span> 元
                                  </b> 

                               </div> 
                }
    
    
           </>

} ;


export default Lodge_Care
       