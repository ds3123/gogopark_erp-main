/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import { FC , useState } from 'react' ;
import { useContext } from "react" ;
import { ModalContext } from "templates/panel/Modal" ;
import { switch_Service_Id } from "utils/data/switch" ;
import { useEffect_Show_Current_Tag  , useEffect_Click_Print } from "./hooks/useEffect_Service_Tag" ;
import Service_Tag_Options  from './Service_Tag_Options' ;
import { useDispatch } from 'react-redux';
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Service_Tag_A4 from './tag_options/Service_Tag_A4';




// A4 洗澡單、美容單
const A4_Print : FC< { service : any }  > = ( { service } ) => {

    const dispatch = useDispatch() ;


    const click_Show_A4_Page = ( type : "洗澡單" | "美容單" ) => {

        dispatch( set_Modal( true , <Service_Tag_A4 type = { type } data = { service } /> , { data : service , modal_Style : { width : "76%" , left : "12%" , top : "-70px" } } ))

    }


    return  <div className = "columns is-multiline" >

                <div className = "column is-6 has-text-centered" >
                    <div onClick = { () => click_Show_A4_Page( "洗澡單" ) } className = "tag w-full is-large p-4 m_Bottom_20 pointer hover" >
                       <i className = "fas fa-file-alt"></i> &nbsp; 洗澡單 ( A4 )
                    </div> 
                </div>

                <div className = "column is-6 has-text-centered" >
                    <div onClick = { () => click_Show_A4_Page( "美容單" ) } className = "tag w-full is-large p-4 m_Bottom_20 pointer hover" >
                       <i className = "fas fa-file-alt"></i> &nbsp; 美容單 ( A4 )
                    </div> 
                </div>

            </div>

} ;






// @ 服務單 _ 列印標籤內容 ( for 出單機 )
export const Service_Tag : FC = () => {


    // 目前所點選列印聯
    const [ current_Tag , set_Current_Tag ] = useState< number >( 1 ) ;


    // 顯示 _ 目前所點選的列印聯內容
    const show_Current_Tag = useEffect_Show_Current_Tag() ;
    

    // 取得 context 值
    const value      = useContext( ModalContext ) as any ;   


    // 目前所點選的服務單
    const service    = value?.data ;
    const service_Id = switch_Service_Id( service ) ; // 服務單 id


    // 出單機列印
    const { ref , click_Print } = useEffect_Click_Print() ;
    


   return <div className = "p_10" >

            { /* A4 洗澡單、美容單 */ }
            <A4_Print service = { service } />
          
            { /* 列印聯選項 */ }
            <div className = "has-text-centered" >

               <Service_Tag_Options current_Tag = { current_Tag } set_Current_Tag = { set_Current_Tag } />

            </div>

            { /* 列印按鈕 */ }
            <div className = "tag is-large is-success w-full m_Top_20 m_Bottom_20 pointer" onClick = { click_Print } > 

                <i className = "fas fa-print m_Right_10 f_14" ></i>  列 印 

            </div>

            { /* 列印內容 */ }
            <div className = "border p_15 m_Bottom_10 p_Top_40" style = {{ maxHeight : "70vh" , overflowY : "auto" , overflowX : "hidden" }} > 

               <div ref = { ref as any } className = "has-text-centered p_Bottom_10" >

                   {  show_Current_Tag( current_Tag , service )  }

               </div>
               
            </div>
   
         </div>

} ; 


