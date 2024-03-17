/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Service_Tag_Section from '../Service_Tag_Section' ;
import Service_Tag_PetInfo from '../Service_Tag_PetInfo' ;
import Service_Tag_ServiceContent from '../Service_Tag_ServiceContent' ;
import Service_Tag_ServiceDate from '../Service_Tag_ServiceDate' ;
import Service_Tag_ArriveLeave from '../Service_Tag_ArriveLeave';
import { string_Replace_WithAsterisks } from 'utils/string/edit_string';
import { useDispatch } from 'react-redux';
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { Service_Tag } from '../Service_Tag';


type Tag = {
    data : any
}


// @ 列印標籤：第三聯 ( 洗澡 / 美容 紀錄表 _ 放美容室 )
const Service_Tag_3 : FC< Tag > = ( { data } ) => {

    const dispatch = useDispatch() ;


    // 寵物資料
    const pet          = data?.pet ;

    // 主人資料
    const customer     = data?.customer ;


    // 寵物 _ 洗澡美容備註
    const pet_Note     = <b className = "f_16"> { pet?.note ? pet?.note : "" }   </b>

    // 自備物品
    const customer_Object = <>
                                <div>
                                    勾選 :  { data?.customer_object ? <b className = "f_15" > { data?.customer_object } </b> : "未勾選"  } 
                                </div>
                                <div>
                                    其他 :  { data?.customer_object_other ? <b className = "f_15" > { data?.customer_object_other } </b> : "未填寫"  }  
                                </div>
                           </> ;



    const back = ( ) => {
        dispatch( set_Modal(  true , <Service_Tag /> , { data : data , modal_Style : { width : "40%" , left : "30%" , top : "-70px" } }  ) )
    }

    
    const click_Show_A4_Page = ( ) => {

        dispatch( set_Modal( true , <> <b onClick = { back }> 返回44 </b> </> , { data : data , modal_Style : { width : "76%" , left : "12%" , top : "-70px" } } ))

    }


    return <div style={{ color:"black" }}>
    
                <b className   = "f_15" > 
                   [ 第三聯：服務記錄 ] &nbsp;  
                   <b onClick = { click_Show_A4_Page }  className = "tag is-medium is-link is-rounded pointer"> A4 </b> 
               </b> 

                <hr className  = "border m_Bottom_30" />

                { /* 服務日期、Ｑ碼、類型、id */ }
                <Service_Tag_ServiceDate data = { data } />

                { /* 寵物資訊 */ }
                <Service_Tag_PetInfo pet = { pet } />

                { /* 到店、離店 */ }
                <Service_Tag_ArriveLeave arrive = { data?.way_arrive } leave = { data?.way_leave } />
               
                { /* 主人資訊 */ } 
                <div className = "t_Left m_Bottom_30" > 
                   手機 : { customer?.mobile_phone } ( { string_Replace_WithAsterisks( customer?.name ) } )     
                </div>

                { /* 服務單( 基礎、洗澡、美容 )內容 */ }
                <Service_Tag_ServiceContent data = { data } />
                
                { /* 健康相關 */ } 
                <div style = {{ pageBreakInside : "avoid" }} >

                    { /* <Service_Tag_Section icon = "fas fa-medkit" title = "健康相關" content = "老犬、心臟病" /> */ }

                    { /* 洗澡美容備註 */ }
                    <Service_Tag_Section icon = "fas fa-dog" title = "洗澡美容備註" content = { pet_Note } options = { pet?.check_note }  />

                    { /* 自備物品 */ } 
                    <Service_Tag_Section icon = "fas fa-sign" title = "自備物品" content = { customer_Object } />

                </div>
                
          </div>

} ;


export default Service_Tag_3
       