/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Service_Tag_Section from './Service_Tag_Section' ;
import Service_Tag_PetInfo from './Service_Tag_PetInfo' ;
import Service_Tag_CheckStatus from './Service_Tag_CheckStatus' ;
import Service_Tag_ServiceDate from './Service_Tag_ServiceDate' ;
import Service_Tag_Payment from './Service_Tag_Payment';





type Tag = {
    data : any
}

// @ 列印標籤：第五聯 ( 簽收聯 _ 櫃檯留底 )
const Service_Tag_5 : FC< Tag > = ( { data } ) => {


    // 寵物資料
    const pet          = data?.pet ;

    // 服務類型
    const service_Type = data?.service_type ;


     // 主人資料
     const customer     = data?.customer ;

    

    // 簽收區塊
    const sign_Zone = <div style = {{ height : "30px" }}></div> ;


    return <>

                <b className   = "f_15" > [ 第五聯：櫃檯留存 ] </b> 

                <hr className  = "border m_Bottom_30" />

                { /* 服務日期、Ｑ碼、類型、id */ }
                <Service_Tag_ServiceDate data = { data } />

                { /* 寵物資訊 */ }
                <Service_Tag_PetInfo pet = { pet }/>

                { /* 主人資訊 */ } 
                <div className = "t_Left m_Bottom_30" > 主人 : { customer?.name } ( { customer?.mobile_phone } )   </div>
                

                { /* 檢查情況 */ } 
                <Service_Tag_Section icon = "fas fa-clipboard-check" title = { `今日${ service_Type }情形` } content = { <Service_Tag_CheckStatus data = { data } /> } />

                { /* 付款方式 */ }
                <Service_Tag_Payment data = { data } />

                { /* 客戶簽收 */ } 
                {/* <Service_Tag_Section icon = "fas fa-user-edit" title = "客戶簽收" content = { sign_Zone } /> */}

                { /* 簽收 */ }
               <div className = "t_Left m_Top_30 m_Bottom_20 f_14" > 
                   
                    <i className = "fas fa-user-edit m_Right_5 f_16 relative" style = {{ top: "2px" }} ></i>  客戶簽收 : 

               </div>
               


                {/* <div className = "t_Left m_Top_20 m_Bottom_20 relative"  >  

                   <div className = "relative w-50"  >

                     <span className="tag is-large m_Right_10 is-white f_18 relative" style={{left:"-40px"}} > 
                        <i className = "fas fa-user-edit" ></i> 
                     </span>   
                     <span className = "f_14 relative" style = {{ left:"-68px" }} > 客戶簽收 :  </span>  

                   </div>

                   <div className = "w-50 p_10 absolute" style = {{ left : "140px" , top : "30px" , borderBottom : "1px solid black" }} >  </div>
                   
                </div> */}
                    
           </>

} ;


export default Service_Tag_5
       