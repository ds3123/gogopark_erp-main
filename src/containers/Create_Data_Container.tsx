/* eslint-disable react/jsx-pascal-case */
/* eslint-disable @typescript-eslint/no-redeclare */

// React Hook Form
import { useForm , useWatch , SubmitHandler , Controller } from "react-hook-form" ;

// 各分類標籤元件
import Create_Service from "components/services/edit/Create_Service" ;
import { yupResolver } from "@hookform/resolvers/yup" ;
import Edit_Form_Tabs from "templates/tab/Edit_Form_Tabs" ;
import Create_Employee from "components/management/employee/edit/Create_Employee" ;
import Create_Account from "components/management/account/edit/Create_Account" ;
import Create_Auth from "components/management/auth/edit/Create_Auth" ;
import Create_Price from "components/prices/edit/Create_Price" ;
import Create_Species from "components/management/setting/species/edit/Create_Species" ;
import Create_Other from "components/other/Create_Other" ;
import Create_Product from "components/products/edit/Create_Product" ;

// Interface
import { IService } from "utils/Interface_Type" ;

// Hook
import { useSelector } from "react-redux" ;
import { get_Validator_Schema } from "containers/data_components/get_Validator_Schema" ;
import { useMatch_Obj } from "containers/data_components/Condition_for_Currnet_Tab" ;
import Debug_Button from "templates/note/Debug_Button" ;

// 欄位驗證
import { useValidate_Create_Data_Container } from "hooks/validator/useValidate_Create_Data_Container" ;
import { ReachHookFormContext } from "contexts/reactHookFormContext" ;

import { CreateServiceProvider } from "containers/contexts/createServiceContext" ;
import { useEffect_Submit_Create } from "./hooks/useEffect_Submit_Create" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useState } from "react";



/* @ 新增資料 */
const Create_Data_Container = () => {


    // 是否點選 _ 提交鈕
    const [ is_Submit_Clicked , set_Is_Submit_Clicked ] = useState( false ) ;


    // 目前登入者所屬店家 id
    const shop_Id = useAccount_Shop_Id() ; 
    
    // 目前點選 _ 新增項目 : 頁籤 ( Ex. 基礎、洗澡、美容 )
    const current = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;    
   
    // # 依照目前所點選 : 頁籤 ( current )，判斷 _ 是否顯示/符合條件
    const is_Obj  = useMatch_Obj( current ) ;

    // # 依照不同服務類型，切換 : 驗證條件
    let validator = get_Validator_Schema( current ) ;


    // React Hook Form
    const { register , watch , setValue , handleSubmit , control , formState : { errors , isDirty , isValid } } =
                  useForm< IService >({
                                         mode     : "all" ,
                                         resolver : yupResolver( validator ) ,
                                      }) ;                                               


    // 欲傳遞屬性
    const props  = {
                    register : register ,
                    setValue : setValue ,
                    watch    : watch ,
                    
                    control  : control ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    
                    current  : current ,
                    
                    editType    : undefined ,
                    
                    serviceData : null
                   }  ;

    

    // 新增函式
    const create_Data = useEffect_Submit_Create() ;


    // # 提交表單 ( IService 再確認 2021.07.23 )
    const onSubmit : SubmitHandler< IService > = ( data ) => {

        // 設定 _ 已經點選提交
        set_Is_Submit_Clicked( !is_Submit_Clicked ) ; // 顯示 _ 下載圖示 ( 防止再次點選 )
 
        // 新增資料 
        create_Data( data ) ;

    } 


    // * 新增提交按鈕 _ 是否有效啟用 ( 加上 : 自訂 _ 表單驗證邏輯 --> 因欲驗證值 / 邏輯，有些區塊無法僅透過 RHF 表單欄位值表示 )
    const disabled_Form = useValidate_Create_Data_Container( isValid ) ;
 
    return <>

            { /* 除錯按鈕 ( 狗狗公園帳號才顯示 )   */ } 
            { shop_Id === 1 && <Debug_Button /> }

             <ReachHookFormContext.Provider value = { props } >

                { /* 表單標籤 */ }
                <Edit_Form_Tabs />

                <hr/>

                <form onSubmit = { handleSubmit( onSubmit ) } className = "m_Top_50 m_Bottom_50" >

                    { /* 服務單 : 基礎、洗澡、美容 */ }
                    { is_Obj.is_Show_Create_Service  &&  <CreateServiceProvider> 
                                                             <Create_Service /> 
                                                         </CreateServiceProvider> }

                    { /* 價格項目 */ }
                    { current === "價格" && <Create_Price    { ...props } />  }

                    { /* 品種項目 */ }
                    { current === "品種" && <Create_Species  { ...props } />  }

                    { /* 帳號項目 */ }
                    { current === "帳號" && <Create_Account { ...props } />   }

                    { /* 員工項目 */ }
                    { current === "員工" && <Create_Employee { ...props } />  }

                    { /* 權限項目 */ }
                    { current === "權限" && <Create_Auth { ...props } />      }
                    
                    { /* 其他 */ } 
                    { current === "其他" && <Create_Other  { ...props } />    }

                    { /* 商品 */ } 
                    { current === "商品" && <Create_Product />                }
        
                    { /* 提交按鈕 */ }

                    <hr/>

                    { !is_Submit_Clicked ?

                        <div className = "has-text-centered m_Top_100" >

                            <button disabled = { disabled_Form } type = "submit" className = "button is-primary is-medium" >

                                新增{ current }

                            </button>

                        </div> :   
                        
                        <div className="has-text-centered" >
                             <button className="button is-loading is-white m_Top_100"></button>
                        </div> 
                    
                    }

                </form>

             </ReachHookFormContext.Provider>

           </>

} ;

export default Create_Data_Container ;