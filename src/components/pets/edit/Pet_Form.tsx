/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-lone-blocks */

import { useState } from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type" ;
import { Input } from "templates/form/Input" ;
import { useFetch_Species } from "hooks/react-query/species/useFetchSpecies" ;

import useSection_Folding from "hooks/layout/useSection_Folding" ; 
import Pet_Birthday from "./info/Pet_Birthday" ;

// Redux
import { useSelector } from "react-redux" ;

import Customer_Pets from "components/pets/edit/info/Customer_Pets" ;
import Pet_Services_Records from "components/pets/edit/info/Pet_Services_Records" ;
import { useVerify_Required_Columns_Pet } from "hooks/layout/useVerify_Columns" ; 
import Pet_Prices_Status from "components/pets/edit/info/Pet_Prices_Status" ;
import Pet_Owner from 'components/pets/edit/info/Pet_Owner' ;
import Pet_Is_Dead from 'components/pets/edit/info/Pet_Is_Dead' ;
import Reject_Service from 'templates/note/Reject_Service' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useFetch_Shop_Species_By_SpeciesName } from "hooks/react-query/pet/useFetchPets" ;
import { 
         useEffect_Click_Set_Pet_Data , 
         useEffect_Change_Select_Option , 
         useEffect_Change_Set_PetSerial_Column  
       } from "../hooks/useEffect_Pet_Form" ;
import useCreate_Service_Context from "containers/contexts/createServiceContext" ;
import { sort_ObjAttr } from 'fp/tool' ;

const note       = { color: "rgb(0,0,180)" , fontWeight: "bold" } ;
const note_Input = { color: "rgb(0,0,180)" , fontWeight: "bold" , border : "none"  } ;



{ /* 寵物表單欄位  */ }
const Pet_Form = ( { register , watch , setValue , errors , current  , pet_Species_id , pet_Serial , control } : Edit_Form_Type ) => {

    
    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding( false ) ;

    // ( 設定 ) 寵物體型 
    const { set_Pet_Size } = useCreate_Service_Context() ; 

    // 是否顯示 : 詳細選項
    const [ is_Detial , set_Is_Detial ] = useState( false ) ;


    // # 監看 _ 必填欄位
    useVerify_Required_Columns_Pet( watch ) ;


    // 客戶單，目前所填入客戶的所有寵物
    const current_Customer_Pets = useSelector( ( state : any ) => state.Customer.Current_Customer_Pets ) ;

    // 取得 _ 所有寵物品種資料
    const petSpecies            = useFetch_Species() ;

    // -----------------
    
    // 品種代號、品種名稱、變動處理 : "品種" 下拉選單 
    const { species_Num , pet_Species_Name , get_Species_Id } = useEffect_Change_Select_Option( petSpecies ) ;

    // 目前登入者所屬店家，資料表中( pet ) 已有某 "寵物品種" 數量
    const current_Species_Sum = useFetch_Shop_Species_By_SpeciesName( useAccount_Shop_Id() , pet_Species_Name ).length ;

    // 點選 _ 寵物按鈕
    const click_Pet_Button = useEffect_Click_Set_Pet_Data( setValue , petSpecies ) ;

    // 變動 _ 品種下拉選單，預先設定 _ 寵物序號
    useEffect_Change_Set_PetSerial_Column( species_Num , current_Species_Sum , setValue ) ;

    // 目前為新增或編輯狀態
    const is_Create = current ? true : false ;
   
    
   return <>
            
               { is_Create && <hr/> } 

               { /* 寵物基本資料 */ }
               <label className="label m_Top_70 relative"> 
               
                   <i className="fas fa-dog"></i> &nbsp; 寵物資料 &nbsp;

                   { /* 主人資料 ( 分配、調整 ) */ } 
                   { !current  && <Pet_Owner pet_Serial = { pet_Serial } />  } 

                   { /* 收折鈕 */ }
                   { Folding_Bt }  &nbsp; &nbsp;

                   { /* 寵物服務紀錄 */ }  
                   <Pet_Services_Records />  

                   { /* 客戶所有寵物 */ }
                   <Customer_Pets current               = { current } 
                                  current_Customer_Pets = { current_Customer_Pets } 
                                  click_Pet_Button      = { click_Pet_Button } />

               </label> 

               { /* 是否收折 */ }
               { is_folding ||

                   <>

                        <div className="columns is-multiline is-mobile m_Bottom_30">

                            { /* 名字 */ }
                            <Input type="text" name="pet_Name" label="名 字" register = { register } error = { errors.pet_Name }
                                   icon="fas fa-paw" asterisk={true} columns="3" />

                            { /* 品種 */ }
                            <div className="column is-3-desktop required">

                               <p> 品 種 &nbsp; <b className="fRed"> { errors.pet_Species?.message } </b> </p>

                               <div className="control has-icons-left">

                                   <div className="select">

                                       <select { ...register("pet_Species") } onChange={ e => get_Species_Id( e.target.value  ) } >

                                           <option value="請選擇"> 請選擇 </option>

                                           {
                                               
                                               sort_ObjAttr( 'serial' , 'asc' )( petSpecies )?.map( ( x , y ) => <option value = { x['id'] } key = { y } >
                                                                               { x['serial'] } _ { x['name'] }  { x['character'] ? `( ${ x['character'] } )` : '' }
                                                                            </option> 

                                                             )
                                           }

                                       </select>

                                   </div>

                                   <div className="icon is-small is-left"> <i className="fas fa-cat"></i> </div>

                               </div>

                            </div>

                            { /* 編號 */ }
                            <div className=  'column is-4-desktop required relative'  >

                               <div className = "absolute" style = {{ width : "335px" , height : "40px" , top : "37px" , borderRadius : "5px" , zIndex : 100 , background : "rgba(0,0,0,.1)" }} ></div>

                               <p className = "relative" > 編號 ( 由左側 <b>品種</b> 下拉選項自動產生 )  </p>

                               { current &&

                                    <div className="control has-icons-left" >
                                        <span className="icon is-small is-left"> <i className="fas fa-list-ol" ></i> </span>
                                        <input className="input" type='text' { ...register( 'pet_Serial' ) } />
                                    </div>

                               }

                                { !current &&

                                    <b className="fDblue f_13 relative" style={{ top:"3px" }}> { pet_Serial } </b>

                                }

                            </div>

                            { /* 性別  */ }
                            <div className="column is-2-desktop">

                               <p> 性 別 &nbsp; <b className="fRed"> { errors.pet_Sex?.message } </b> </p>

                               <div className="control has-icons-left">

                                   <div className="select" >
                                       <select {...register("pet_Sex")}  >
                                           <option value = "請選擇" > 請選擇 </option>
                                           <option value = "公" > 公 </option>
                                           <option value = "母" > 母 </option>
                                           <option value = "不確定" > 不確定 </option>
                                       </select>
                                   </div>

                                   <div className="icon is-small is-left">
                                       <i className="fas fa-venus-mars"></i>
                                   </div>

                               </div>

                            </div>

                            <Input type="text"   name="pet_Color"  label="毛 色"  register={register} error={errors.pet_Color}
                                    icon="fas fa-eye-dropper" asterisk={false} columns="2" />

                            { /* 

                                 <Input type="number" name="pet_Age" label="年 紀 (歲)" register={register} error={errors.pet_Age}
                                        icon="fas fa-pager"  asterisk={false} columns="3" />

                              */ }        

                            <div className="column is-2-desktop">
                                
                                { /* 出生日期 ( 計算歲數 ) */ } 
                                <Pet_Birthday control = { control } setValue = { setValue } pet_Serial = { pet_Serial } current = { current } />

                            </div>
                           
                            <Input type="number" name="pet_Weight" label="體 重 (kg)"    register={register} error={errors.pet_Weight}
                                                                   icon="fas fa-weight" asterisk={false}    columns="2" />

                            { /* 體型 */ }
                            <div className="column is-3-desktop">

                               <p> 體 型 &nbsp; <b className="fRed"> {errors.pet_Size?.message} </b></p>

                               <div className="control has-icons-left">

                                   <div className="select">

                                       <select {...register("pet_Size")} onChange = { ( e ) => set_Pet_Size( e.target.value ) }>
                                           <option value="請選擇"> 請選擇                   </option>
                                           <option value="小型犬"> 小型犬 ( 3 kg 以下 )     </option>
                                           <option value="中型犬"> 中型犬 ( 3-10 kg )       </option>
                                           <option value="大型犬"> 大型犬 ( 11-15 kg )      </option>
                                           <option value="特大型犬"> 特大型犬 ( 16 kg 以上 ) </option>
                                       </select>

                                   </div>

                                   <div className="icon is-small is-left"> <i className="fas fa-expand"></i> </div>

                               </div>

                            </div>
                            
                            <Input type="text" name="pet_Chip" label="晶片號碼"  register={register} error={errors.pet_Chip}
                                    icon="fas fa-sort-numeric-down" asterisk={false} columns="3" />    

                        </div>

                        <div className="columns is-multiline is-mobile m_Bottom_30">

                             <Input type="text"   name="pet_Hospital_Name"  label="往來醫院"          register={register} error={errors.pet_Hospital}
                                    icon="fas fa-clinic-medical" asterisk={false} columns="3" />
                             
                             <Input type="text"   name="pet_Hospital_Telephone"  label="往來醫院電話"  register={register} error={errors.pet_Hospital_Phone}
                                    icon="fas fa-phone-alt" asterisk={false} columns="3" />
                             
                             <Input type="text"   name="pet_Hospital_Address"  label="往來醫院住址"    register={register} error={errors.pet_Hospital_Address}
                                    icon="fas fa-map-marked-alt" asterisk={false} columns="6" />

                        </div>

                        <div className="columns is-multiline is-mobile">

                            { is_Create ||
      
                                <>

                                    { /* 已過世 */ }  
                                    <div className="column is-2-desktop"> 
                                        <Pet_Is_Dead  pet_Serial = { pet_Serial } />   
                                    </div>

                                    { /* 拒接 */ }
                                    <div className="column is-10-desktop">
                                        <Reject_Service type = "寵物" id = { pet_Serial } />
                                    </div> 

                                </>

                             }  
                    
                        </div>   

                        { /* 寵物價格 ：標準、個別定價  */ }
                        { pet_Serial &&  <Pet_Prices_Status register = { register } setValue = { setValue } /> } 

                       { /* Radio 單選 */}
                       <div className="columns is-multiline  is-mobile">

                           <div className="column is-11-desktop required">

                               <b className="fDred relative">
                                   <b className="fRed absolute" style={{ top:"-25px" }}> {errors.bite?.message} </b>
                                   是否會咬人 :
                               </b> &nbsp;
                               <input type="radio" value="會"    {...register("bite")} /> 會    &nbsp; &nbsp;
                               <input type="radio" value="不會"   {...register("bite")} /> 不會  &nbsp; &nbsp;
                               <input type="radio" value="不一定" {...register("bite")} /> 不一定，須小心  &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("bite")} /> 不確定
                            
                           </div>

                           <div className="column is-1-desktop ">

                               <b className="f_18 relative pointer" style={{  top:"-5px" }} onClick={ () => set_Is_Detial( !is_Detial ) }>
                                  { is_Detial  && <i className="fas fa-toggle-on"></i>   }
                                  { !is_Detial && <i className="fas fa-toggle-off"></i>  }
                               </b>   
                           
                           </div>

                       </div>

                       { is_Detial &&
                       
                            <>

                                    <div className="columns is-multiline  is-mobile">

                                        <div className="column is-6-desktop">
                                            <b> 每年預防注射 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("injection")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("injection")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("injection")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 滴除蚤 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("flea")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("flea")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="代送獸醫除蚤" {...register("flea")} /> 代送獸醫除蚤 &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("flea")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 結 紮 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("ligate")} /> 有     &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("ligate")} /> 無     &nbsp; &nbsp;
                                            <input type="radio" value="發情中" {...register("ligate")} /> 發情中 &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("ligate")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 晶 片 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("chip")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("chip")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("chip")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 傳染病 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("infection")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("infection")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("infection")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 與其他狗共處 : </b> &nbsp;
                                            <input type="radio" value="可"     {...register("together")} /> 可    &nbsp; &nbsp;
                                            <input type="radio" value="否"     {...register("together")} /> 否    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("together")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 服藥中 : </b> &nbsp;
                                            <input type="radio" value="是"     {...register("drug")} /> 是    &nbsp; &nbsp;
                                            <input type="radio" value="否"     {...register("drug")} /> 否    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("drug")} /> 不確定
                                        </div>

                                    </div>

                                    <b style={{color: "rgb(0,0,150)"}} > * 以下選項可複選 --- </b>

                                    { /* Checkbox 複選、備註 */}
                                    <div className="columns is-multiline is-mobile">

                                        <div className="column is-6-desktop">
                                            <b> 健 康 : </b> &nbsp;
                                            <input type="checkbox" value="良好" {...register("health")} /> 良好 &nbsp; &nbsp;
                                            <input type="checkbox" value="關節" {...register("health")} /> 關節 &nbsp; &nbsp;
                                            <input type="checkbox" value="皮膚" {...register("health")} /> 皮膚 &nbsp; &nbsp;
                                            <input type="checkbox" value="過敏" {...register("health")} /> 過敏 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("health")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 餵食方式 : </b> &nbsp;
                                            <input type="checkbox" value="飼料" {...register("feed")} /> 飼料 &nbsp; &nbsp;
                                            <input type="checkbox" value="罐頭" {...register("feed")} /> 罐頭 &nbsp; &nbsp;
                                            <input type="checkbox" value="鮮食" {...register("feed")} /> 鮮食 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("feed")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 如廁方式 : </b> &nbsp;
                                            <input type="checkbox" value="戶外" {...register("toilet")} /> 戶外 &nbsp; &nbsp;
                                            <input type="checkbox" value="室內" {...register("toilet")} /> 室內 &nbsp; &nbsp;
                                            <input type="checkbox" value="尿布" {...register("toilet")} /> 尿布 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("toilet")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                        <div className="column is-12-desktop">
                                            <b> 飼主提供 : </b> &nbsp;
                                            <input type="checkbox" value="飼料" {...register("ownerProvide")} /> 飼料 &nbsp; &nbsp;
                                            <input type="checkbox" value="罐頭" {...register("ownerProvide")} /> 罐頭 &nbsp; &nbsp;
                                            <input type="checkbox" value="零食" {...register("ownerProvide")} /> 零食 &nbsp; &nbsp;
                                            <input type="checkbox" value="睡墊" {...register("ownerProvide")} /> 睡墊 &nbsp; &nbsp;
                                            <input type="checkbox" value="項圈" {...register("ownerProvide")} /> 項圈 &nbsp; &nbsp;
                                            <input type="checkbox" value="胸背" {...register("ownerProvide")} /> 胸背 &nbsp; &nbsp;
                                            <input type="checkbox" value="牽繩" {...register("ownerProvide")} /> 牽繩 &nbsp; &nbsp;
                                            <input type="checkbox" value="提籃" {...register("ownerProvide")} /> 提籃 &nbsp; &nbsp;
                                            <input type="checkbox" value="玩具" {...register("ownerProvide")} /> 玩具 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("ownerProvide")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                    </div>

                            </>  
                       
                       }   

                       { /* 洗澡美容備註 */ }
                       <div className="columns is-multiline is-mobile m_Top_20">

                          <b className="m_Left_15"> 洗澡美容備註 </b>
                          <div className="column is-12-desktop m_Bottom_30">

                             { /* 新增 */ }
                             { is_Create && <textarea rows="6" className="textarea" {...register("pet_Note")} placeholder="尚未填寫" style={ note_Input } readOnly={true} /> }

                             { /* 編輯 */ } 
                             { is_Create || <textarea rows="8" className="textarea" {...register("pet_Note")} placeholder="請輸入備註..." style={ note } /> }
                               
                          </div>

                          { /* 住宿備註 */ }   
                          <b className="m_Left_15"> 住宿備註 </b>
                          <div className="column is-12-desktop m_Bottom_30">

                             { /* 新增 */ }
                             { is_Create && <textarea rows="6" className="textarea" {...register("lodge_Note")} placeholder="尚未填寫" style={ note_Input } readOnly={true} /> }

                             { /* 編輯 */ } 
                             { is_Create || <textarea rows="5" className="textarea" {...register("lodge_Note")} placeholder="請輸入備註..." style={ note } /> }

                          </div>

                          { /* 客訴及其他備註 */ } 
                          <b className="m_Left_15"> 客訴及其他備註 ( 私有備註 ) </b>
                          <div className="column is-12-desktop m_Bottom_30">

                             { /* 新增 */ }
                             { is_Create && <textarea rows="6" className="textarea" {...register("private_Note")} placeholder="尚未填寫" style={ note_Input } readOnly={true}/> }

                             { /* 編輯 */ } 
                             { is_Create || <textarea rows="5" className="textarea" {...register("private_Note")} placeholder="請輸入備註..." style={ note }/> }

                          </div>   


                       </div>    

                       <br/> 

                   </>

               }

          </>

} ;

export default Pet_Form ;
