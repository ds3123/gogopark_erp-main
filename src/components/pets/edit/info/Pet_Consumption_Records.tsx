/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react' ;
import Bath_PetConsumption_Records from "../components/Bath_PetConsumption_Records" ;
import Beauty_PetConsumption_Records from "../components/Beauty_PetConsumption_Records" ;
import AllServices_PetConsumption_Records from '../components/AllServices_PetConsumption_Records';
import Service_Tag_Section from 'components/services/components/service_tags/Service_Tag_Section';



type pet_Records = { 
    pet_Data : any ;  // 寵物資料 
}
  
type TStrategy = {

    "洗澡紀錄" : ( pet_Data : any ) => JSX.Element ;
    "美容紀錄" : ( pet_Data : any ) => JSX.Element ;
    "所有紀錄" : ( pet_Data : any ) => JSX.Element ;

}



// 定義策略对象
const Strategy : TStrategy = {

    "洗澡紀錄" : ( pet_Data : any ) => <Bath_PetConsumption_Records        pet_Data = { pet_Data } /> ,
    "美容紀錄" : ( pet_Data : any ) => <Beauty_PetConsumption_Records      pet_Data = { pet_Data } /> ,
    "所有紀錄" : ( pet_Data : any ) => <AllServices_PetConsumption_Records pet_Data = { pet_Data } />

} ;


// @ 寵物所有紀錄紀錄 ( for 列表點選 _ 服務紀錄，右側滑動面板 )
const Pet_Consumption_Records = ( { pet_Data } : pet_Records ) => {


    const [ recordType , set_RecordType ] = useState< keyof TStrategy >( "洗澡紀錄" ) ; 


    // 寵物 _ 洗澡美容備註
    const pet_Note     = <b className = "f_16"> { pet_Data?.note ? pet_Data?.note : "" }   </b>


    return <div style = { { position : "relative" , top : "20px" } } >

         
                { /* 標題 */ }
                <b className = "tag is-large m_Bottom_20 f_18" > 
                    
                   <i className = "fas fa-dog" ></i> &nbsp; 
                   <span className = "m_Right_30" > { pet_Data['name'] }  <span className = "f_12" > ( { pet_Data['species'] } ) </span> </span>
                
                   <b onClick = { () => set_RecordType( "洗澡紀錄" ) } className = { `tag is-medium ${ recordType === "洗澡紀錄" ? "is-success" : "is-white" } pointer is-rounded f_14 m_Right_20` } > 洗澡紀錄 </b>
                   <b onClick = { () => set_RecordType( "美容紀錄" ) } className = { `tag is-medium ${ recordType === "美容紀錄" ? "is-danger" : "is-white" }  pointer is-rounded f_14 m_Right_20` } > 美容紀錄 </b>
                   <b onClick = { () => set_RecordType( "所有紀錄" ) } className = { `tag is-medium ${ recordType === "所有紀錄" ? "is-black" : "is-white" }   pointer is-rounded f_14` } >            所有紀錄 </b>
                
                </b>   

                <div className = "w-full m_Bottom_70 p-5" >

                   { /* 洗澡美容備註 */ }
                   <Service_Tag_Section icon = "fas fa-dog" title = "洗澡美容 : 常駐備註" content = { pet_Note } options = { pet_Data?.check_note }  />

                </div>

                { /* 資料紀錄 */ }
                { Strategy[ recordType ]( pet_Data ) }
                
           </div> ;

} ;


export default Pet_Consumption_Records
       