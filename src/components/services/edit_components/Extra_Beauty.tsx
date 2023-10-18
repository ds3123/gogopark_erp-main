/* eslint-disable react-hooks/exhaustive-deps */

import { string_Format_Slash } from 'utils/string/edit_string';
import { Edit_Form_Type } from "utils/Interface_Type"
import useSection_Folding from "hooks/layout/useSection_Folding";
import { useFetch_Shop_Service_Type_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount"; 
import useCreate_Service_Context from "containers/contexts/createServiceContext"

import { 
         useEffect_Extra_Beauty_Total ,
         useEffect_Change_Picked_Item ,
         useEffect_Edit_Picked_Items
       } from "../hooks/useEffect_Extra_Beauty" ;


interface IExtra_Beauty extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}




/* 加價美容 ( 僅 "洗澡" 有 ) */
const Extra_Beauty = ({ register , editType , serviceData } : IExtra_Beauty )=>{


    // 目前 寵物區塊 ( Pet_Form.tsx ) 所選擇 : "體型" 下拉選項
    const { pet_Size } = useCreate_Service_Context() ; 


    const { is_folding , Folding_Bt } = useSection_Folding( !editType ? true : false ) ;  // 收折區塊


    // 目前登入者，所屬店家 id
    const shop_Id = useAccount_Shop_Id() ;


    // 取得 _ "加價美容" 所有價格
    const extra_Beauty_Prices = useFetch_Shop_Service_Type_Prices( shop_Id , '加價美容' ) ;



    // # 新增 -------

    
    // 所點選的服務名稱 ( for 新增 ) / 變動處理 : 點選加價項目
     const { beauty_Picked , change_Picked_Item } = useEffect_Change_Picked_Item() ;

    
    // 加總 _ 所點選加價項目金額
    const picked_Prices_Total = useEffect_Extra_Beauty_Total( beauty_Picked , extra_Beauty_Prices ) ;


    
    // # 編輯 -------

    // 所點選的服務名稱 ( for 編輯 )
    const services_Data = useEffect_Edit_Picked_Items( editType , serviceData  );



  return <>

              { /* 是否已選擇 _ 寵物體型 ( for 新增 ) */ }  
              { editType === undefined &&

                <>     

                    <i className="fas fa-dog"></i>&nbsp;寵物體型 : 
                    { ( pet_Size === '請選擇' || !pet_Size ) ?
                        <b className="fDred"> 尚未選擇寵物體型</b> :
                        <b style={{color:"rgb(30,150,0)"}}> { pet_Size }  </b>
                    } <br/><br/>

                </>   

              }


              <b className="tag is-large is-link is-light">

                  <i className="fas fa-plus-circle"></i> &nbsp; 加價美容

                  { /* # 加價項目價格 */ }

                  { /* for 新增 */ }
                  { ( editType !== '編輯' && picked_Prices_Total !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white f_12" > 小計 :
                              <span style={{color:"red"}}> &nbsp; { picked_Prices_Total } &nbsp; </span> 元
                          </b>
                      </>

                  }

                  { /* for 編輯 */ }
                  { ( editType === '編輯' && serviceData.extra_beauty_fee !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white f_12"  > 小計 :
                              <span style={{color: "red"}}> &nbsp; { serviceData.extra_beauty_fee } &nbsp; </span> 元
                          </b>
                      </>

                  }



              </b>

              { /* 收折按鈕 */ }
              <b className="relative" style={{ right : "10px" }}> { Folding_Bt } </b>  <br/>

              { /* 新增 */ }
              { ( !is_folding && editType === undefined ) &&

                  <>

                      <br/><br/>

                      <div className="columns is-multiline is-mobile relative" style={{left: "20px"}}>


                          {

                              extra_Beauty_Prices.map((x, y) => {

                                 const note         = x['note'] as string ;         // 備註
                                 const service_name = x['service_name'] as string ; // 服務項目名稱

                                  // for 修腳緣( 針對寵物 "體型"，只顯示相對應的修腳緣選項 )
                                  if( ( pet_Size === '特大型犬' || pet_Size === '大型犬' ) && service_name.indexOf('飾毛') !== -1  && note.indexOf('大狗') === -1  ) return null ;
                                  if(  pet_Size === '中型犬'  && service_name.indexOf('飾毛') !== -1  && note.indexOf('中狗') === -1  ) return null ;
                                  if(  pet_Size === '小型犬'  && service_name.indexOf('飾毛') !== -1  && note.indexOf('小狗') === -1  ) return null ;


                                  return <div key={y} className="column is-2-desktop relative">

                                              { note &&
                                                  <span className="absolute f_10 "
                                                        style={{top: "-5px", left: "30px", color: "rgb(0,0,180)"}}>  {x['note']}  </span>
                                              }

                                              <input type="checkbox" value={ x['id'] }  {...register("extra_Beauty")}
                                                     onChange={ e => change_Picked_Item(e.target.value) }/>
                                              <b> { service_name } </b>

                                          </div>

                              })

                          }


                          {/*<div className = 'column is-2-desktop' >*/}
                          {/*    <input type="checkbox" value = "頭臉"  { ...register( "beauty_Extra_Option" ) } onChange={ handle_Change } /> <b>頭臉</b>*/}
                          {/*</div>*/}


                          {/*<b style={{ color:"rgb(0,0,150)" }}> 腿部</b> 飾毛 &nbsp;*/}
                          {/*<div className="select">*/}
                          {/*    <select { ...register( "beauty_Extra_Option_3" ) }  onChange={ handle_Change } >*/}
                          {/*        <option value="請選擇">請選擇</option>*/}
                          {/*        <option value="大狗">大狗</option>*/}
                          {/*        <option value="中狗">中狗</option>*/}
                          {/*        <option value="小狗">小狗</option>*/}
                          {/*    </select>*/}
                          {/*</div>*/}

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



              <br/><hr/>

         </>

};

export default Extra_Beauty
       