/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from "react" ;
import { Input } from "templates/form/Input" ;
import useSection_Folding from "hooks/layout/useSection_Folding" ;
import Customer_Services_Records from "components/customers/edit/info/Customer_Services_Records" ;
import Customer_Types_Query from "components/customers/edit/info/Customer_Types_Query" ;
import { useVerify_Required_Columns_Customer } from "hooks/layout/useVerify_Columns" ;
import Customer_Relatives_Columns from "./customer_relatives/Customer_Relatives_Columns" ;
import Reject_Service from 'templates/note/Reject_Service' ;

import { useEffect_Touch_Insert_Num , 
         useEffect_Click_Set_Random_Id , 
         useEffect_Change_Column_Value
       } from "../hooks/useEffect_Customer_Form" ;



interface ICustomer_Form {

    register     : any ;
    watch        : any ;
    setValue?    : any ;
    errors       : any ;
    current?     : string ;
    customer_Id? : string ;   // 客戶身分證字號

}


const nS = { left : "730px" , top : "58px" , zIndex : 555 } as const ;

{ /* 客戶表單欄位 */ }
const Customer_Form = ( { register , watch , setValue , errors , current , customer_Id } : ICustomer_Form ) => {


    // # 監看 _ 必填欄位
    useVerify_Required_Columns_Customer( watch ) ;

    
    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding( false ) ;
    

    // 設定 _ 查詢欄位
    const [ query , set_Query ]       = useState({
                                                   customer_Id        : '' , // 身分證字號
                                                   customer_Name      : '' , // 姓名
                                                   customer_Cellphone : ''   // 手機號碼
                                                 }) ;



    // 點選 _ 設定 : 隨機身分證字號
    const set_Random_Id = useEffect_Click_Set_Random_Id( setValue ) ;

    // 觸控輸入數字列 ( 點選 _ 輸入客戶手機號碼 )
    const { 
             is_Show_NumButton , 
             set_Is_Show_NumButton , 
             num_Buttons 
          } = useEffect_Touch_Insert_Num( setValue , set_Query , query ) ;


    
    // 欄位變動處理 : 身分證字號、姓名、手機號碼      
    const handle_Column_Change = useEffect_Change_Column_Value() ;      
    const handle_Change        = ( e : any ) => handle_Column_Change( e , set_Query , query ) ;


    // 目前為新增或編輯狀態
    const is_Create = current ? true : false ;


    return <div className="relative">

                { /* 數字按鈕( for 觸控輸入手機號碼 ) */ }  
                { is_Show_NumButton && num_Buttons }

                { /* 標題 */ }
                <label className="label relative m_Bottom_40" >

                    <i className="fas fa-user"></i> &nbsp; 客戶資料  &nbsp; 
                    
                    { is_Create && Folding_Bt } { /* 收折鈕 */ }

                    { /* 過去服務紀錄、資料數 ( 基礎、洗澡、美容 )  */ }
                    {/* <Customer_Services_Records />  */}
                    
                    { /*  顯示 _ 查詢客戶 : "身分證字號"、"手機號碼" 結果 ( 顯示 : 客戶姓名、新客戶 在標題列右上方 )  */ }
                    <Customer_Types_Query query = { query } setValue = { setValue } />

                </label>


                { /* 是否收折 : 客戶資料 */ }
                { is_folding ||

                   <>

                     { /* 顯示 : 數字按鈕  */ }  
                     { is_Create &&
                        <b className = { `tag is-medium absolute pointer ${ is_Show_NumButton ? 'is-success is-light' : 'is-white'  }` }
                           style     = { nS } onClick = { () => set_Is_Show_NumButton( !is_Show_NumButton ) } > 
                            <i className="far fa-keyboard"></i> 
                        </b>
                     }

                     <div className="columns is-multiline  is-mobile relative">

                        { /* 編輯狀態 */ }
                        { is_Create || 
                        
                            <div className="column is-3-desktop relative"> 
                                <p className="relative"> 身份證字號 / 客戶系統編號 </p>
                                <b className="fDblue f_13 relative" style={{ top:"6px" }}>  { customer_Id } </b>
                            </div> 
                         
                        }

                        { /* 新增狀態 */ }
                        { is_Create &&
                        
                            <>    
                                <b className="tag is-light is-success absolute f_10 pointer" style={{ top:"8px",left:"185px" , zIndex:222 }} onClick={ set_Random_Id }>
                                    自動產生
                                </b>
                                <Input type="text" name="customer_Id" label="身分證字號 / 系統編號" register={register} error={errors.customer_Id} icon="fas fa-id-card-alt" asterisk={true} columns="3" onChange={ handle_Change } />
                            </>

                        }

                        <Input type="text" name="customer_Name"      label="姓 名"     register={register} error={errors.customer_Name}      icon="fas fa-user"                asterisk={true}  columns="3" onChange={ handle_Change } />
                        <Input type="text" name="customer_Cellphone" label="手機號碼"   register={register} error={errors.customer_Cellphone} icon="fas fa-mobile-alt"          asterisk={true}  columns="3" onChange={ handle_Change } />
                        <Input type="text" name="customer_Telephone" label="家用電話"   register={register} error={errors.customer_Telephone} icon="fas fa-phone"               asterisk={false} columns="3" />
                        <Input type="text" name="customer_Line"      label="Line ID"   register={register} error={errors.customer_Line}      icon="fab fa-line"               asterisk={false} columns="3" />
                        <Input type="text" name="customer_Email"     label="E-mail"    register={register} error={errors.customer_Email}     icon="fas fa-envelope-open-text" asterisk={false} columns="3" />
                        <Input type="text" name="customer_Address"   label="通訊地址"   register={register} error={errors.customer_Address}   icon="fas fa-home"               asterisk={false} columns="6" />

                        <div className="column is-2-desktop">

                            <p> 性 別 &nbsp; <b className="fRed"> {errors.customer_Sex?.message} </b></p>

                            <div className="control has-icons-left">

                                <div className="select">
                                    <select {...register("customer_Sex")}  >
                                        <option value="請選擇">請選擇</option>
                                        <option value="男"> 男 </option>
                                        <option value="女"> 女 </option>
                                    </select>
                                </div>

                                <div className="icon is-small is-left">
                                    <i className="fas fa-venus-mars"></i>
                                </div>

                            </div>

                        </div>

                        <Input type="text" name="customer_P_Note"   label="備 註"   register={register} error={errors.customer_Note}   icon="fas fa-edit" asterisk={false} columns="10" />
                        
                     </div> <br/>


                     { /* 拒接 */ } 
                     { is_Create ||
                     
                        <div className="m_Bottom_50" style={{ zIndex:3 , fontSize:"4pt" }}> 
                              <Reject_Service type = "客人"  id={ customer_Id } /> 
                        </div>

                     }
                  

                     { /* 關係人欄位 */ }
                     <Customer_Relatives_Columns register = { register } setValue = { setValue }  />

                   </>

                }

           </div>

} ;

export default Customer_Form