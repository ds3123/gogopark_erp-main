/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Service_Tag_Section from './Service_Tag_Section' ;
import { string_Format_Slash } from 'utils/string/edit_string' ; 
import { useEffect_Edit_Picked_Items as useEffect_Extra_Item } from "components/services/hooks/useEffect_Extra_Item" ;
import {  useEffect_Edit_Picked_Items as useEffect_Extra_Beauty } from "components/services/hooks/useEffect_Extra_Beauty" ;


type Contnet = {

   data : any 

}


// # 基礎單
const Service_Basic : FC< Contnet > = ( { data } ) => {

    // 基礎資料
    const basic_Data = data?.basic_data ? string_Format_Slash( data?.basic_data ) : "" ;

    return <>
    
             { basic_Data && <div className = "m_Bottom_10" > { basic_Data }  </div> }
    
          </>

}


// # 洗澡單
const Service_Bath : FC< Contnet > = ( { data } ) => {


   // 基礎資料
   const basic_Data = data?.basic_data ? string_Format_Slash( data?.basic_data ) : "" ;

   // 洗澡資料
   const bath_1 = data?.bath_1 ;
   const bath_2 = data?.bath_2 ;
   const bath_3 = data?.bath_3 ;
   const bath_4 = data?.bath_4 ;
   const bath_5 = data?.bath_5 ;
   const bath_6 = data?.bath_6 ;

   // 加價項目
   const extra_Items  = useEffect_Extra_Item( "編輯" , data ) ;
   const _extra_Items = extra_Items ? extra_Items.join( ' / ' ) : "" ;

   // 加價美容
   const extra_Beauty  = useEffect_Extra_Beauty( "編輯" , data ) ;
   const _extra_Beauty = extra_Beauty ? extra_Beauty.join( ' / ' ) : "" ;


   const left_70 = { left : "70px" } ;

   return <>

             { /* 基礎 */ }
             { basic_Data && <div className = "m_Bottom_10" > { `< 基礎 > ${ basic_Data }` }  </div> }

             { /* 洗澡 */ }
             <div className = "m_Bottom_10" > 
             
                { `< 洗澡 >` }  
                { bath_1 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第一次洗澡 </span> : { bath_1 }  </div> }
                { bath_2 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第二次洗澡 </span> : { bath_2 }  </div> }
                { bath_3 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第一次浸泡 </span> : { bath_3 }  </div> }
                { bath_4 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第三次洗澡 </span> : { bath_4 }  </div> }
                { bath_5 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第二次浸泡 </span> : { bath_5 }  </div> }
                { bath_6 && <div className = "relative" style = { left_70 } > <span className = "f_10 m_Right_40" > 烘乾      </span> : { bath_6 }  </div> }
                
             </div>

             { /* 加價項目 */ }
             { _extra_Items && <div className = "m_Bottom_10" > { `< 加價項目 > ${ _extra_Items }` }  </div> }

             { /* 加價美容 */ }
             { _extra_Beauty && <div className = "m_Bottom_10" > { `< 加價美容 > ${ _extra_Beauty }` }  </div> }
            
          </>

} ;


// # 美容單
const Service_Beauty : FC< Contnet > = ( { data } ) => {

    // 基礎資料
   const basic_Data = data?.basic_data ? string_Format_Slash( data?.basic_data ) : "" ;

   // 洗澡資料
   const bath_1 = data?.bath_1 ;
   const bath_2 = data?.bath_2 ;
   const bath_3 = data?.bath_3 ;
   const bath_4 = data?.bath_4 ;
   const bath_5 = data?.bath_5 ;
   const bath_6 = data?.bath_6 ;

   // 美容資料
   const body  = data?.b_body ;  // 身體
   const head  = data?.b_head ;  // 頭臉
   const ear   = data?.b_ear ;   // 耳朵
   const tail  = data?.b_tail ;  // 尾巴
   const foot  = data?.b_foot ;  // 腳
   const other = data?.b_other ; // 其他

   
   // 加價項目
   const extra_Items  = useEffect_Extra_Item( "編輯" , data ) ;
   const _extra_Items = extra_Items ? extra_Items.join( ' / ' ) : "" ;

   
   const left_70 = { left : "70px" } ;

   return <>

             { /* 基礎 */ }
             { basic_Data && <div className = "m_Bottom_10" > { `< 基礎 > ${ basic_Data }` }  </div> }

             { /* 洗澡 */ }
             <div className = "m_Bottom_10" > 
             
                { `< 洗澡 >` }  
                { bath_1 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第一次洗澡 </span> : { bath_1 }  </div> }
                { bath_2 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第二次洗澡 </span> : { bath_2 }  </div> }
                { bath_3 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第一次浸泡 </span> : { bath_3 }  </div> }
                { bath_4 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第三次洗澡 </span> : { bath_4 }  </div> }
                { bath_5 && <div className = "relative" style = { left_70 } > <span className = "f_10" > 第二次浸泡 </span> : { bath_5 }  </div> }
                { bath_6 && <div className = "relative" style = { left_70 } > <span className = "f_10 m_Right_40" > 烘乾      </span> : { bath_6 }  </div> }
                
             </div>

             { /* 美容 */ }
             <div className = "m_Bottom_10" > 
             
                { `< 美容 >` }  
                { body  && <div className = "relative" style = { left_70 } > <span className = "f_10" > 身 體 </span> : { body }  </div> }
                { head  && <div className = "relative" style = { left_70 } > <span className = "f_10" > 頭 臉 </span> : { head }  </div> }
                { ear   && <div className = "relative" style = { left_70 } > <span className = "f_10" > 耳 朵 </span> : { ear  }  </div> }
                { tail  && <div className = "relative" style = { left_70 } > <span className = "f_10" > 尾 巴 </span> : { tail }  </div> }
                { foot  && <div className = "relative" style = { left_70 } > <span className = "f_10" > 腳    </span> &nbsp;&nbsp; : { foot }  </div> }
                { other && <div className = "relative" style = { left_70 } > <span className = "f_10" > 其 他 </span> : { other }  </div> }
                
             </div>

             { /* 加價項目 */ }
             { _extra_Items && <div className = "m_Bottom_10" > { `< 加價項目 > ${ _extra_Items }` }  </div> }
            
          </>

}




// @ 服務單內容 ( for 第三聯 )
const Service_Tag_ServiceContent : FC< Contnet > = ( { data } ) => {


   // 服務類型
   const service_Type = data?.service_type ; 


   return <>

            { /* 基礎單 */ }
            { service_Type === "基礎" && <Service_Tag_Section icon = "far fa-list-alt" title = "基礎單" content = { <Service_Basic data = { data } /> } /> }

            { /* 洗澡單 */ }
            { service_Type === "洗澡" && <Service_Tag_Section icon = "fas fa-bath" title = "洗澡單" content = { <Service_Bath data = { data } /> } /> }

            { /* 美容單 */ }
            { service_Type === "美容" && <Service_Tag_Section icon = "fas fa-cut" title = "美容單" content = { <Service_Beauty data = { data } /> } /> }
   
          </>

} ;

export default Service_Tag_ServiceContent
       