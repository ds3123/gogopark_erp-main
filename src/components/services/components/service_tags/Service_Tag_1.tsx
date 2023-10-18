/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react' ;
import Service_Tag_Section from './Service_Tag_Section' ;
import Service_Tag_PetInfo from './Service_Tag_PetInfo' ;
import Service_Tag_ServiceDate from './Service_Tag_ServiceDate' ;
import Service_Tag_ArriveLeave from './Service_Tag_ArriveLeave';



type Tag = {
    data : any
}


// @ 列印標籤：第一聯 ( 跟著寵物 )
const Service_Tag_1 : FC< Tag >= ( { data } ) => {

    // 寵物資料
    const pet = data?.pet ;

    // 寵物 _ 洗澡美容備註
    const pet_Note = <b className = "f_16"> { pet?.note ? pet?.note : "" }  </b>




    return <>
             
              <b className = "f_15"> [ 第一聯 : 寵物 ] </b> 

              <hr className  = "border m_Bottom_30" />

              { /* 服務日期、Ｑ碼、類型、id */ }
              <Service_Tag_ServiceDate data = { data } />


              { /* 寵物資訊 */ }
              <Service_Tag_PetInfo pet = { pet } />

              { /* 到店、離店 */ }
              <Service_Tag_ArriveLeave arrive = { data?.way_arrive } leave = { data?.way_leave } />

              { /* 洗澡美容備註 */ } 
              <Service_Tag_Section icon = "fas fa-dog" title = "洗澡美容備註" content = { pet_Note } options = { pet?.check_note } />

           </>

} ;


export default Service_Tag_1
       