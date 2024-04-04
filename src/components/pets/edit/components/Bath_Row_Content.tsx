/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC } from 'react' ;
import { useEffect_Edit_Picked_Items as useEffect_ExtaBeauty } from 'components/services/hooks/useEffect_Extra_Beauty';
import { useEffect_Edit_Picked_Items as useEffect_ExtraItem } from 'components/services/hooks/useEffect_Extra_Item';
import { string_Format_Slash } from 'utils/string/edit_string';
import { useEffect_Beauticain_Note } from 'components/pets/hooks/useEffect_Pet_Records';
import { switch_Service_Type_Id } from "utils/data/switch" ;


type Content = {

    data : any ;
   
}


// 服務紀錄內容：洗澡
const Bath_Row_Content : FC< Content > = ( { data } ) => {

   // 取得 _ "服務( 基礎、洗澡、美容 ) 相對應服務資料表 id"、"服務 Url ( /basics 、/bathes、/beauties ) "
   const { service_Id , service_Url } = switch_Service_Type_Id( data ) ; 


   // 美容師備註、設定、儲存
   const { beauticianNote , 
            set_BeauticianNote , 
            click_Save_BeauticianNote 
         } = useEffect_Beauticain_Note( data.beautician_note  , service_Id , service_Url  ) ;


   // 加價項目
   const extra_Items  = useEffect_ExtraItem( "編輯" , data ) ;
      
   // 加價美容
   const extra_Beauty = useEffect_ExtaBeauty( "編輯" , data ) ;
      
   const has_1 = data.bath_1 ;
   const has_2 = data.bath_2 ;
   const has_3 = data.bath_3 ;
   const has_4 = data.bath_4 ;
   const has_5 = data.bath_5 ;
   const has_6 = data.bath_6 ;

   
  return <>

            <div className = "column is-4-desktop border relative" style = {{ wordWrap : "break-word" }} > 

                <b className = "t_Center absolute" style = {{ top : "-25px" , left : "0px" }} >  洗澡內容  </b>

                { has_1 && <div> 第一次洗澡 : <span className = "fDblue" > { data.bath_1 } </span> </div> }
                { has_2 && <div> 第二次洗澡 : <span className = "fDblue" > { data.bath_2 } </span> </div> }
                { has_3 && <div> 第一次浸泡 : <span className = "fDblue" > { data.bath_3 } </span> </div> }
                { has_4 && <div> 第三次洗澡 : <span className = "fDblue" > { data.bath_4 } </span> </div> }
                { has_5 && <div> 第二次浸泡 : <span className = "fDblue" > { data.bath_5 } </span> </div> }
                { has_6 && <div> 烘乾 : <span className = "fDblue" > { data.bath_6 } </span> </div> }

                { ( !has_1 && !has_2 && !has_3 && !has_4 && !has_5 && !has_6 ) && <span className = "fDblue"> 未點選洗澡項目 </span>   } 

            </div>

            <div className = "column is-4-desktop border relative" style = {{ wordWrap : "break-word" }} > 

                 <b className = "t_Center absolute" style = {{ top : "-25px" , left : "0px" }}  >  加價內容  </b>
                 
                 <div>

                    加價項目 : &nbsp;
                    <span className = "fDblue" > 
                       {  extra_Items.join(',') ?  string_Format_Slash( extra_Items.join(',') ) : '無' }
                    </span>

                 </div>

                 <hr/>

                 <div>

                    加價美容 : &nbsp;
                    <span className = "fDblue" > 
                       {  extra_Beauty.join(',') ?  string_Format_Slash( extra_Beauty.join(',') ) : '無' }
                    </span>

                 </div>

            </div> 

            <div className = "column is-4-desktop border relative" style = {{ wordWrap : "break-word" }} > 

                <b className = "t_Center absolute" style = {{ top : "-25px" , left : "0px" }} >  美容師 : 當次服務備註  </b>
                
                <b className = "tag is-medium border hover t_Center absolute pointer" 
                    style    = {{ top : "-32px" , right : "0px" }}
                    onClick  = { click_Save_BeauticianNote } > 
                   儲存備註  
                </b>

                <textarea value     = { beauticianNote || "" } 
                          onChange  = { e => set_BeauticianNote( e.target.value ) } 
                          className = "textarea fDblue h-full" placeholder = "尚未填寫"
                          style     = {{color: "rgb(0,0,180)" , border : "1px solid rgb( 0,0,0)", fontWeight: "bold" , left:"0px" , top : "-2px" }} />
                  

            </div>
             
         </>
} ;

export default Bath_Row_Content  