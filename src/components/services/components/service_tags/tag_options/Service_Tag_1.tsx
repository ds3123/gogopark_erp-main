/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react' ;
import Service_Tag_Section from '../Service_Tag_Section' ;
import Service_Tag_PetInfo from '../Service_Tag_PetInfo' ;
import Service_Tag_ServiceDate from '../Service_Tag_ServiceDate' ;
import Service_Tag_ArriveLeave from '../Service_Tag_ArriveLeave';
import { useDispatch } from 'react-redux';
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Service_Tag_A4 from './Service_Tag_A4';


type Tag = {
    data : any
}


// @ 列印標籤：第一聯 ( 跟著寵物 )
const Service_Tag_1 : FC< Tag >= ( { data } ) => {

    const dispatch = useDispatch()

    // 寵物資料
    const pet = data?.pet ;

    // 寵物 _ 洗澡美容備註
    const pet_Note = <b className = "f_16"> { pet?.note ? pet?.note : "" }  </b>






    
    // 顯示 A4 頁面
    const click_Show_A4_Page = ( ) => {

        dispatch( set_Modal( true , <Service_Tag_A4 data = { data } /> , { data : data , modal_Style : { width : "76%" , left : "12%" , top : "-70px" } } ))

    }


    return <div style={{ color:"black" }}>
             
              <b className = "f_15"> [ 第一聯 : 寵物 ] &nbsp;

                <b onClick = { click_Show_A4_Page }  className = "tag is-medium is-link is-rounded pointer"> A4 </b> 
              
              </b> 

              <hr className  = "border m_Bottom_30" />

              { /* 服務日期、Ｑ碼、類型、id */ }
              <Service_Tag_ServiceDate data = { data } />

              { /* 寵物資訊 */ }
              <Service_Tag_PetInfo pet = { pet } />

              { /* 到店、離店 */ }
              <Service_Tag_ArriveLeave arrive = { data?.way_arrive } leave = { data?.way_leave } />

              { /* 洗澡美容備註 */ } 
              <Service_Tag_Section icon = "fas fa-dog" title = "洗澡美容備註" content = { pet_Note } options = { pet?.check_note } />

           </div>

} ;


export default Service_Tag_1
       