/* eslint-disable react/jsx-pascal-case */

import { useState } from 'react' ;
import Plan_Price_Method from "components/plan/custom_plan/components/Plan_Price_Method" ;
import Plan_Applied_Species from "components/plan/custom_plan/components/Plan_Applied_Species" ;
import Plan_Basic_Info from "./components/Plan_Basic_Info" ;

import useCreate_Custom_Plan_Context from "./contexts/createCustomPlanContext" ;

import { useFetch_Species_With_Shop_Service_Prices } from "hooks/react-query/species/useFetchSpecies" ;



type form_Type = {
    register  : any ;
    errors    : any ;
    setValue  : any ;
    isValid   : any ;
    edit_Type : string ;
}



// @ 自訂方案
const Custom_Plan_Form = ( { register , errors , setValue , isValid , edit_Type } : form_Type ) => {


      /*
      
          # 取得 _ 所有品種資料 ( species 資料表 ) 

            NOTE 

               * 先一率顯示 _ 狗狗公園品種價格 ( account_id = 1 ) -> useFetch_Species_With_Shop_Service_Prices() 參數固定為 "1"
      
      */ 
      
      const all_Species_Data = useFetch_Species_With_Shop_Service_Prices( "1" ) ;                              
    

      // 新增自訂方案，所設定 :
      const { 
              plan_Applied_Species ,        // 寵物品種 
              current_Custom_DefaultPrice , // 預設價格
            } = useCreate_Custom_Plan_Context() ;  


            
      // 是否顯示 : 套用寵物品種列表 
      const [ is_Show_Applied_Species , set_Is_Show_Applied_Species ] = useState( false ) ;  

      // 方案是否已存在
      const [ is_Plan_Existed , set_Is_Plan_Existed ] = useState( false ) ;

      
      // 取得 _ 方案狀態 ( 是否已存在 )
      const get_Is_Plan_Existed = ( bool : boolean ) => set_Is_Plan_Existed( bool ) ;

      
    
      // 屬性 for 元件 : <Plan_Basic_Info /> 
      const info_Props = {
                            register            : register ,
                            setValue            : setValue ,
                            errors              : errors ,
                            edit_Type           : edit_Type , 
                            get_Is_Plan_Existed : get_Is_Plan_Existed 
                          }


      // 屬性 for 元件 : <Plan_Price_Method /> 
      const method_Props = {
                              register  : register ,
                              setValue  : setValue ,
                              isValid   : isValid ,  
                              edit_Type : edit_Type
                           }


                           
    return  <div className="relative" style={{ padding:"0px 15px" , top:"-30px" }}>

                  <label className="label relative" style={{ fontSize : "1.3em" }} >
                      <i className="fas fa-file-alt"></i> &nbsp; 包月方案資料 &nbsp;   
                  </label> 

                  { /* 按鈕 : 套用品種 ( for 新增 ) */ }
                  { edit_Type === "新增" &&

                    <div className="absolute f_13" style = { { top : "4px" , left : "250px" } } >

                        <b className = { `tag is-medium pointer ${ is_Show_Applied_Species ? "is-warning" : "" }` }  
                            onClick  = { () => set_Is_Show_Applied_Species( !is_Show_Applied_Species ) }> 

                            <i className="fas fa-dog"></i> &nbsp; 套用寵物品種 
                          
                            { plan_Applied_Species.length !== 0 && <span> &nbsp; ( { all_Species_Data.length === plan_Applied_Species.length ? '全部' : plan_Applied_Species.length }  )</span> }
                            { plan_Applied_Species.length === 0 && <> &nbsp; <b className="tag is-white fRed is-rounded f_10"> &nbsp; <i className="fas fa-exclamation"></i> &nbsp; 尚未指定套用品種 </b>  </> }
                          
                        </b>
                      
                    </div> 

                  }

                  { /* 套用品種列表 */ }
                  { is_Show_Applied_Species && <Plan_Applied_Species species_Data = { all_Species_Data } /> }  <br/>


                  { /* 欄位 : 名稱、洗澡/美容次數、期限、預設價格 */ }  
                  <Plan_Basic_Info { ...info_Props } /> 

                  { /*  個別消費 _ 計價方式 */ }     
                  { 
                     ( current_Custom_DefaultPrice > 0 || edit_Type === "編輯" ) && <Plan_Price_Method { ...method_Props } /> 
                  } 


                { /* 提交鈕  */ } 
                {

                  is_Plan_Existed ||

                                  <div className="has-text-centered"  >
                                      <button disabled = { !isValid } type="submit" className="button is-primary relative is-medium" > 
                                          { edit_Type === "新增" ? "新增" : "編輯" }包月方案  
                                      </button>
                                  </div>  

                }  
                



            </div>

} ;

export default Custom_Plan_Form
       