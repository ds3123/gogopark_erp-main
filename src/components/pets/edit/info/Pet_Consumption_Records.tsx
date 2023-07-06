/* eslint-disable react/jsx-pascal-case */

import Pet_Service_Card from "templates/card/Pet_Service_Card"
import Service_Info_Tab from "templates/tab/Service_Info_Tab"

import { useFetch_Services_By_PetSeial_ServiceType } from "hooks/react-query/service/useFetchServices" ;



type pet_Records = { 
    pet_Data : any ;  // 寵物資料 
}
  


const col_2 = "column is-2-desktop" ; 
const cols  = "columns is-multiline is-mobile" ;
const box   = { position:"relative" , top:"20px" } as any ;




// @ 寵物所有服務紀錄 ( for 列表點選 _ 服務紀錄，右側滑動面板 )
const Pet_Consumption_Records = ( { pet_Data } : pet_Records ) => {



    // 取得 _ 特定寵物，各種服務類型的所有紀錄
    const records_Basic  = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "基礎" ) ; 
    const records_Bath   = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "洗澡" ) ; 
    const records_Beauty = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "美容" ) ; 
    const records_Care   = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "安親" ) ; 
    const records_Lodge  = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "住宿" ) ; 
    const records_Plan   = useFetch_Services_By_PetSeial_ServiceType( pet_Data['serial'] , "方案" ) ;
   

    
    return <div style ={ box } >

                <b className="tag is-large m_Bottom_40"> <i className="fas fa-dog"></i> &nbsp; { pet_Data['name'] } ( { pet_Data['species'] } ) </b>   
                
                {/* 
                    <label className="label m_Bottom_30"> 
                        <i className="far fa-calendar-alt m_Right_10"></i>
                        首次來店日 : <span className="m_Right_30" style={color}> </span> 
                        最後來店日 : <span style={color}>  </span>
                    </label> 
                */}

                { /* 服務類別標籤 */ }
                <div className={ cols } >

                    <Service_Info_Tab type = '基礎' num = { records_Basic.length }  />
                    <Service_Info_Tab type = '洗澡' num = { records_Bath.length }   />
                    <Service_Info_Tab type = '美容' num = { records_Beauty.length } />
                    <Service_Info_Tab type = '安親' num = { records_Care.length }   />
                    <Service_Info_Tab type = '住宿' num = { records_Lodge.length }  />
                    <Service_Info_Tab type = '方案' num = { records_Plan.length }   />

                </div>


                { /* 服務卡片 */ }
                <div className="columns is-multiline is-mobile m_Bottom_100">

                    { /* 基礎 */ }
                    <div className={ col_2 }>
                        {  records_Basic.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 洗澡 */ }
                    <div className={ col_2 }>
                        {  records_Bath.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 美容 */ }
                    <div className={ col_2 }>
                        {  records_Beauty.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 安親 */ }
                    <div className={ col_2 }>
                        {  records_Care.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 住宿 */ }
                    <div className={ col_2 }>
                        {  records_Lodge.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 方案 */ }
                    <div className={ col_2 }>
                        {  records_Plan.map( ( x : any , y : any ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                </div>

           </div>

} ;


export default Pet_Consumption_Records
       