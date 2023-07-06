/* eslint-disable react/jsx-pascal-case */

import { useEffect, useState } from "react"

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form" ;

// 表單驗證
import { yupResolver } from "@hookform/resolvers/yup" ;

// Interface
import { schema_Plan_Type } from "utils/validator/form_validator" ;
import { ICustom_Plan } from "utils/Interface_Type" ;
import Custom_Plan_Form from "components/plan/custom_plan/Custom_Plan_Form" ;
import { useCreate_Custom_Plan } from "hooks/react-query/plan/useCreatePlan" ;
import useCreate_Custom_Plan_Context from "./contexts/createCustomPlanContext" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";



// @ 新增 _ 自訂方案
const Create_Custom_Plan = () => {

    // 目前登入者所屬店家 id
    const shop_Id = useAccount_Shop_Id();
   
    
    // # 目前新增自訂方案，所設定 :
    const {                                
             plan_Applied_Species ,          // 寵物品種    
             current_Custom_Bath_Num ,       // 洗澡次數     
             current_Custom_Beauty_Num ,     // 洗澡次數
             current_Custom_DefaultPrice ,   // 預設價格
             current_Custom_Price_Method ,   // 計價方式 : 平均計算 / 自行計算
          } = useCreate_Custom_Plan_Context();    


    // 方案目前所套用的寵物品種
    const [ current_Applied_Species , set_Current_Applied_Species ] = useState( '' ) ;


    // React Hook Form
    const { register , setValue , handleSubmit , formState : { errors , isValid } } =
                    useForm< ICustom_Plan >({
                                              mode     : "all" ,
                                              resolver : yupResolver( schema_Plan_Type ) ,
                                            }) ;       


    // 新增 _ 自訂方案 Mutation                                        
    const create_Custom_Plan = useCreate_Custom_Plan() ;                                        


    // 提交資料                                 
    const onSubmit : SubmitHandler< ICustom_Plan > = ( data : any ) => { 

      let bath_Prices    = "" ;
      let beauty_Prices  = "" ;


      // 驗證  
      if( plan_Applied_Species.length === 0 ){
         alert("方案未套用任何品種") ;
         return false
      }


       // 新增 Post 物件
       const obj = {

            account_id           : shop_Id ,  

            plan_name            : data['plan_Type_Name'] ,

            bath_num             : data['plan_Type_Bath_Num'] ,
            beauty_num           : data['plan_Type_Beauty_Num'] ,

            plan_period          : data['plan_Type_Period'] ,
            default_price        : data['plan_Type_Price'] ,
            plan_note            : data['plan_Type_Note'] ,

            single_price_method  : current_Custom_Price_Method ,

            average_price        : current_Custom_Price_Method === '平均計算' ? Math.round(  current_Custom_DefaultPrice / ( current_Custom_Bath_Num + current_Custom_Beauty_Num ) ) : null , // 平均價格 
            self_bath_prices     : current_Custom_Price_Method === '自行計算' ? bath_Prices   : null , // 自行訂價 : 洗澡
            self_beauty_prices   : current_Custom_Price_Method === '自行計算' ? beauty_Prices : null , // 自行訂價 : 美容 

            plan_applied_species : current_Applied_Species  // 方案目前所套用的品種     

       }

       // 新增 _ 自訂方案  
       create_Custom_Plan( obj ) ;

    }

   
    // 屬性 for 元件 : <Plan_Price_Method /> 
    const form_Props = {

                          setValue  : setValue ,
                          register  : register ,
                          errors    : errors  , 
                          isValid   : isValid , 

                          edit_Type : "新增" ,

                       }


    // 設定 _ 方案所套用品種的序號 ( pet_species 資料表 serial 欄位  )
    useEffect( () => { 

      // 取得品種序號
      const applied_Species_Serials = plan_Applied_Species.map( ( x : any ) => x['serial'] ) ;
    
      // 串接為字串
      set_Current_Applied_Species( applied_Species_Serials.join(',') )
    
    } , [ plan_Applied_Species ] ) ;


   return  <form onSubmit = { handleSubmit( onSubmit ) } >

              <Custom_Plan_Form { ...form_Props } />  <br/>

           </form>

} ;

export default Create_Custom_Plan
       