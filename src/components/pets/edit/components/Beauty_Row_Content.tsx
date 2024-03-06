

import { FC } from 'react' ;
import { useEffect_Edit_Picked_Items as useEffect_ExtraItem } from 'components/services/hooks/useEffect_Extra_Item';
import { string_Format_Slash } from 'utils/string/edit_string';
import { useEffect_Beauticain_Note } from 'components/pets/hooks/useEffect_Pet_Records';
import { switch_Service_Type_Id } from "utils/data/switch" ;



type Content = {

    data : any ;
   
}


// 服務紀錄內容：美容
const Beauty_Row_Content : FC< Content > = ( { data } : any ) => {

   // 取得 _ "服務( 基礎、洗澡、美容 ) 相對應服務資料表 id"、"服務 Url ( /basics 、/bathes、/beauties ) "
   const { service_Id , service_Url } = switch_Service_Type_Id( data ) ; 


   // 美容師備註、設定、儲存
   const { beauticianNote , 
           set_BeauticianNote , 
           click_Save_BeauticianNote 
         } = useEffect_Beauticain_Note( data.beautician_note  , service_Id , service_Url ) ;



  // 加價項目
  const extra_Items  = useEffect_ExtraItem( "編輯" , data ) ;
    

  // 洗澡項目
  const bath_1 = data.bath_1 ;
  const bath_2 = data.bath_2 ;
  const bath_3 = data.bath_3 ;
  const bath_4 = data.bath_4 ;
  const bath_5 = data.bath_5 ;
  const bath_6 = data.bath_6 ;


  // 美容項目
  const b_body  = data.b_body ;
  const b_ear   = data.b_ear ;
  const b_foot  = data.b_foot ;
  const b_head  = data.b_head ;
  const b_other = data.b_other ;
  const b_tail  = data.b_tail ;


  return <>

            <div className = "column is-3-desktop border relative" style = {{ wordWrap : "break-word" }} > 

                <b className = "t_Center absolute" style = {{ top : "-25px" , left : "0px" }} >  洗澡內容  </b>

                { bath_1 && <div> 第一次洗澡 : <span className = "fDblue" > { data.bath_1 } </span> </div> }
                { bath_2 && <div> 第二次洗澡 : <span className = "fDblue" > { data.bath_2 } </span> </div> }
                { bath_3 && <div> 第一次浸泡 : <span className = "fDblue" > { data.bath_3 } </span> </div> }
                { bath_4 && <div> 第三次洗澡 : <span className = "fDblue" > { data.bath_4 } </span> </div> }
                { bath_5 && <div> 第二次浸泡 : <span className = "fDblue" > { data.bath_5 } </span> </div> }
                { bath_6 && <div> 烘乾 : <span className = "fDblue" > { data.bath_6 } </span> </div> }

                { ( !bath_1 && !bath_2 && !bath_3 && !bath_4 && !bath_5 && !bath_6 ) && <span className = "fDblue"> 未點選洗澡項目 </span>   } 
           
            </div>

            <div className = "column is-3-desktop border relative" style = {{ wordWrap : "break-word" }} > 

                 <b className = "t_Center absolute" style = {{ top : "-25px" , left : "0px" }} >  美容內容  </b>

                { b_body  && <div> 身體 : <span className = "fDblue" > { data.b_body } </span> </div> }
                { b_head  && <div> 頭臉 : <span className = "fDblue" > { data.b_head } </span> </div> }
                { b_ear   && <div> 耳朵 : <span className = "fDblue" > { data.b_ear } </span> </div> }
                { b_tail  && <div> 尾巴 : <span className = "fDblue" > { data.b_tail } </span> </div> }
                { b_foot  && <div> 腳 :   <span className = "fDblue" > { data.b_foot } </span> </div> }
                { b_other && <div> 其他 : <span className = "fDblue" > { data.b_other } </span> </div> }

                { ( !b_body && !b_head && !b_ear && !b_tail && !b_foot && !b_other ) && <span className = "fDblue"> 未點選美容項目 </span>   } 
           

            </div> 

            <div className = "column is-3-desktop border relative" style = {{ wordWrap : "break-word" }} > 

                <b className = "t_Center absolute" style = {{ top : "-25px" , left : "0px" }} >  加價項目  </b>
                <div>

                    加價項目 : &nbsp;
                    <span className = "fDblue" > 
                    {  extra_Items.join(',') ?  string_Format_Slash( extra_Items.join(',') ) : '無' }
                    </span>

                </div>

            </div>

            <div className = "column is-3-desktop border relative" style = {{ wordWrap : "break-word" }} > 

                <b className = "t_Center absolute" style = {{ top : "-25px" , left : "0px" }} >  美容師備註  </b>

                <b className = "tag is-medium border hover t_Center absolute pointer" 
                    style    = {{ top : "-32px" , right : "0px" }}
                    onClick  = { click_Save_BeauticianNote } > 
                   儲存備註  
                </b>

                <textarea value     = { beauticianNote || "" } 
                          onChange  = { e => set_BeauticianNote( e.target.value ) } 
                          className = "textarea fDblue h-full" placeholder = "尚未填寫"
                          style     = {{ color: "rgb(0,0,180)" , border : "1px solid rgb( 0,0,0)", fontWeight: "bold" , left:"0px" , top : "-2px" }} />
                  

            </div>
             
         </>
} ;

export default Beauty_Row_Content  