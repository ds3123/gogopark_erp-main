/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */

import { string_Format_Slash } from 'utils/string/edit_string';
import { Edit_Form_Type } from "utils/Interface_Type" ;
import useSection_Folding from "hooks/layout/useSection_Folding" ;
import { useFetch_Shop_Service_Type_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ; 
import { 
         useEffect_Extra_Items_Total ,
         useEffect_Change_Picked_Item , 
         useEffect_Edit_Picked_Items 
       } from "../hooks/useEffect_Extra_Item" ;


interface IExtra_Item extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}

const note = { top: "-5px" , left: "30px", color : "rgb(0,0,180)" }  ;



// @ 加價項目 
const Extra_Item = ( { register , editType, serviceData } : IExtra_Item ) => {


    const { is_folding , Folding_Bt } = useSection_Folding( !editType ? true : false ) ;  // 收折區塊

    // 目前登入者，所屬店家 id
    const shop_Id            = useAccount_Shop_Id() ;

    // 取得 _ "加價項目" 所有價格
    const extra_Item_Prices  = useFetch_Shop_Service_Type_Prices( shop_Id , '加價項目' ) ;


    // # 新增 -------

    //  所點選的服務名稱 ( for 新增 ) / 變動處理 : 點選加價項目
    const { services_Picked , change_Picked_Item } = useEffect_Change_Picked_Item() ;

    
    // 加總 _ 所點選加價項目金額
    const picked_Prices_Total = useEffect_Extra_Items_Total( services_Picked , extra_Item_Prices ) ;


    // # 編輯 -------

    // 所點選的服務名稱 ( for 編輯 )  
    const services_Data = useEffect_Edit_Picked_Items( editType , serviceData ) ;
    

  return <>
              <b className="tag is-large is-link is-light">

                  <i className="fas fa-plus-circle"></i> &nbsp; 加價項目

                  { /* # 加價項目價格 */ }

                  { /* for 新增 */ }
                  { ( editType !== '編輯' && picked_Prices_Total !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className = "tag is-rounded is-white f_12" > 小計 :
                              <span className="fRed"> &nbsp; { picked_Prices_Total } &nbsp; </span> 元
                          </b>
                      </>

                  }

                  { /* for 編輯 */ }
                  { ( editType === '編輯' && serviceData.extra_service_fee !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white f_12" > 小計 :
                              <span className="fRed"> &nbsp; { serviceData.extra_service_fee } &nbsp; </span> 元
                          </b>
                      </>

                  }

              </b>

              { /* 收折按鈕 */ }
              <b className="relative" style={{ right : "10px" }}> { Folding_Bt } </b>  <br/>

              { /* 新增 */ }
              { ( !is_folding && editType === undefined ) &&

                  <>

                      <div className="columns is-multiline is-mobile m_Top_30 relative" style={{left: "20px"}}>

                          {
                              extra_Item_Prices.map( ( x , y ) => {

                                  return <div key={y} className="column is-2-desktop relative">

                                              { x['note'] &&
                                                  <span className = "absolute f_10"
                                                        style     = {  note }>  { x['note'] }  </span>
                                              }

                                              <input type="checkbox" value={ x['id'] }  {...register("extra_Item")}
                                                     onChange={e => change_Picked_Item(e.target.value)} />

                                              <b> { x['service_name'] } </b>

                                         </div>

                              })

                          }

                          {/* <div className="column is-2-desktop relative"> */}
                          {/*    <input type="checkbox" value="有"  {...register("comb_Flea")} /> <b>跳蚤、壁蝨</b> */}
                          {/* </div> */}

                      </div>

                   
                  </>

              }

              { /* 編輯 */ }
              { ( !is_folding && editType === '編輯' ) &&

                <>
                    <br/>  
                   
                    <b className="tag is-large is-white" >

                        &nbsp;&nbsp; 點選項目 :  
                        <span className="fDblue"> &nbsp;
                            {  services_Data.join(',') ?  string_Format_Slash( services_Data.join(',') ) : '無' }
                        </span>   

                    </b>    

                    <br/>

                </> 

              }

              <br/><hr/><br/>

         </>

} ;


export default Extra_Item