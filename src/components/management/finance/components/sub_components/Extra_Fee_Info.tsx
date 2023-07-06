/* eslint-disable react/jsx-pascal-case */

import Extra_Fee_Detail from "./Extra_Fee_Detail";
import { get_Service_Type_Color } from 'utils/data/switch' ;



type sType = '基礎' | '洗澡' | '美容' ;


const get_Current_Service = ( data : any , service_Type : sType ) => {

    if( service_Type === "基礎" ) return data.basic ;
    if( service_Type === "洗澡" ) return data.bath ;
    if( service_Type === "美容" ) return data.beauty ;

} ;



// # 加價單
const Extra_Feee_Sheet = ( { data } : any ) => {


    const fee_Obj = {

                        // * 加價項目 
                        extra_item         : data?.extra_item  ,
                        extra_item_price   : data?.extra_item_price ,

                        // * 加價美容
                        extra_beauty       : data?.extra_beauty ,
                        extra_beauty_price : data?.extra_beauty_price ,

                        // * 自訂加價
                        extra_custom       : data?.extra_custom ,
                        extra_custom_price : data?.extra_custom_price 

                    } ;

   return <>

                { /* 箭頭 */ }
                <div className = "absolute" style = {{ right:"0px" , top : "45%" }} > 
                    <i className="fas fa-arrow-alt-circle-right fa-3x" ></i>
                </div>

                { /* 標題 */ }
                <b className = "tag is-large m_Bottom_40 m_Left_10 is-primary is-light is-rounded" > 

                    加價單 ( id : { data?.extra_fee_id } )

                </b>

                <div className = "m_Bottom_20 m_Left_40 f_14">

                    { /* 加價單明細 */ }
                    <div className = "m_Bottom_20" >
                        <Extra_Fee_Detail fee_Obj = { fee_Obj } />
                    </div>

                    <hr/>

                    <p className="m_Bottom_20 w-50"> 櫃檯人員 : <b className="fDblue"> { data?.admin_user }      </b> </p>
                    <p className="m_Bottom_20 w-50"> 小計金額 : <b className="fRed">   { data?.amount_paid }     </b> 元 </p>
                    <p className="m_Bottom_20 w-50"> 建檔日期 : <b className="fDblue"> { data?.created_at?.slice( 0,10 ) } </b> </p>
                    <p className="m_Bottom_20 w-50"> 收款日期 : <b className="fDblue"> { data?.payment_date } </b> </p>

                </div>
   
           </>

} ;


// # 服務單 ( 基礎 / 洗澡 / 美容 )
const Service_Sheet = ( { data } : any  ) => {


    const service_Id   = data?.service_id ;             // 服務單 id
    const service_Type = data?.service_type as sType ;  // 服務類型 


    // 服務單 ( 基礎 / 洗澡 / 美容 )
    const service    = get_Current_Service( data , service_Type ) ;

    // 取得 _ 服務類別顏色
    const type_Color = get_Service_Type_Color( service_Type ) ;


    return <>

                { /* 標題 */ }
                <b className = { `tag is-large is-light ${ type_Color } m_Bottom_40 m_Left_10 is-rounded` } > 
                    
                    { service_Type }單 ( id : { service_Id } ) &nbsp; 
                    <b className="tag is-medium is-white f_14 is-rounded"> <span className = "fDred" > Q{ service.q_code } </span> </b>
                    
                </b>

                <div className = "m_Bottom_20 m_Left_40 f_14">

                    <p className="m_Bottom_20"> 
                        <b> 寵物 : <span className = "fDblue"> { data.pet_name } ( { data.pet_species } ) </span> </b>
                    </p>

                    <hr/>

                    <p className="m_Bottom_20">      到店日期 : <b className="fDred"> { service?.service_date } </b> </p>
                    <p className="m_Bottom_20 w-50"> 付款方式 : <span className="fDblue"> { service?.payment_method }  </span>   </p>
                    <p className="m_Bottom_20 w-50"> 櫃檯人員 : <span className="fDblue"> { service?.admin_user === '測試員' ? '店長' : service?.admin_user }  </span>   </p>
                    <p className="m_Bottom_20 w-50"> 應收金額 : <span className="fDblue"> { service?.amount_payable }  </span> 元  </p>
                    <p className="m_Bottom_20 w-50"> 實收金額 : <span className="fDblue"> { service?.amount_paid }  </span> 元  </p>
                    <p className="m_Bottom_20 w-50"> 建檔日期 : <span className="fDblue"> { service?.created_at?.slice(0,10) } </span> </p>
                    <p className="m_Bottom_20 w-50"> 收款日期 : <span className="fDblue"> { service?.payment_date }  </span>  </p>

                </div>
    
           </>

} ;




// ＠ 加價單內容資訊
const Extra_Fee_Info = ( { data } : any ) => {


    return <>

              <div className="columns is-multiline is-mobile m_Bottom_30">

                 { /* 加價單 */ }
                 <div className="column is-6-desktop relative">

                    <Extra_Feee_Sheet data = { data } />

                 </div>

                 
                 { /* 服務單 */ }
                 <div className="column is-6-desktop">

                    <Service_Sheet data = { data } />
                   
                 </div>

              </div>

           </>

} ;

export default Extra_Fee_Info
       