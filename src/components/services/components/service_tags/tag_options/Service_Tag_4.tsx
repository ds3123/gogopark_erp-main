/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */

import { FC } from 'react' ;
import Service_Tag_Section from '../Service_Tag_Section' ;
import Service_Tag_PetInfo from '../Service_Tag_PetInfo' ;
import Service_Tag_CheckStatus from '../Service_Tag_CheckStatus' ;
import Service_Tag_Payment from '../Service_Tag_Payment';
import Service_Tag_ServiceDate from '../Service_Tag_ServiceDate' ;


type Tag = {
    data : any
}


// @ 列印標籤：第四聯 ( 跟著狗回家 )
const Service_Tag_4 : FC< Tag > = ( { data } ) => {


    // 寵物資料
    const pet          = data?.pet ;

    // 服務類型
    const service_Type = data?.service_type ;

    // 主人資料
    const customer     = data?.customer ;


    return <div style={{ color:"black" }}>
            
                <b className   = "f_15" > [ 第四聯：客戶收執 ] </b> 

                <hr className  = "border m_Bottom_0" />

                { /* 服務日期、Ｑ碼、類型、id */ }
                <Service_Tag_ServiceDate data = { data } />

                { /* 寵物資訊 */ }
                <Service_Tag_PetInfo pet = { pet } />

                { /* 主人資訊 */ } 
                <div className = "t_Left m_Bottom_30" > 主人 : { customer?.name } ( { customer?.mobile_phone } )   </div>

                { /* 檢查情況 */ } 
                <Service_Tag_Section icon = "fas fa-clipboard-check" title = { `今日 < ${ service_Type } > 服務` } content = { <Service_Tag_CheckStatus data = { data } /> } />

                { /* 付款方式 */ }
                <Service_Tag_Payment data = { data } />

           </div>

} ;


export default Service_Tag_4
       