/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Service_Tag_Section from './Service_Tag_Section' ;
import Service_Tag_PetInfo from './Service_Tag_PetInfo' ;
import Service_Tag_ServiceDate from './Service_Tag_ServiceDate' ;



type Tag = {
    data : any
}


// @ 列印標籤：第二聯 ( 跟著帶來的物品 )
const Service_Tag_2 : FC< Tag > = ( { data } ) => {


     // 寵物資料
     const pet = data?.pet ;

     // 自備物品
     const customer_Object = <>
                                <div>
                                    勾選 :  { data?.customer_object ? <b className = "f_15" > { data?.customer_object } </b> : "未勾選"  } 
                                </div>
                                <div>
                                    其他 :  { data?.customer_object_other ? <b className = "f_15" > { data?.customer_object_other } </b> : "未填寫"  }  
                                </div>
                              </> ;

    return <>
    
                <b className = "f_15"> [ 第二聯：自備物品 ] </b> 

                <hr className  = "border m_Bottom_30" />

                { /* 服務日期、Ｑ碼、類型、id */ }
                <Service_Tag_ServiceDate data = { data } />

                { /* 寵物資訊 */ }
                <Service_Tag_PetInfo pet = { pet } />

                { /* 自備物品 */ } 
                <Service_Tag_Section icon = "fas fa-sign" title = "自備物品" content = { customer_Object } />
                    
           </>

} ;


export default Service_Tag_2
       