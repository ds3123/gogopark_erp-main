/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";
import Customer_Pets from "../../pets/edit/info/Customer_Pets";
import Plan_Type_Columns from "./components/Plan_Type_Columns" ;
import Applied_Species_Select from "./components/Applied_Species_Select" ;
import Applied_Plan_Type from "./components/Applied_Plan_Type" ;
import Plan_Bath_Beauty_Num from "./components/Plan_Bath_Beauty_Num" ;
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;

import { 
         useEffect_Click_Pet_Button ,
         useEffect_Get_Edit_Plan_Basic_Price ,
         useEffect_Default_Plan_Basic_Price
       } from "../hooks/useEffect_Plan_Form" ;




// @ 方案表單欄位  
const Plan_Form = ( ) => {


     // 取得 context 值 : React Hook Form 屬性   
     const { register , setValue , errors , current, editType, serviceData } = useReact_Hook_Form_Context() ;  


     // 目前客戶的所有寵物 
     const current_Customer_Pets = useSelector( ( state:any )   => state.Customer.Current_Customer_Pets ) ; // 客戶單，目前所填入客戶的所有寵物

     // 目前寵物品種，所選擇 _ 品種 id
     const current_Species_Id    = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;         // 目前 "寵物品種" 下拉選項所選擇 id ( species 資料表的 id )    
     
     // 目前方案類型，所選擇 _ 方案類型( 名稱 )
     const current_Plan_Type     = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;         // 目前所選擇 : 方案類型 ( 名稱 )



     // 點選 _ 客戶寵物標籤，以帶入所欲適用的 : 寵物編號
     const click_Pet_Button      = useEffect_Click_Pet_Button( setValue ) ;


     // 取得 _ 基本價格 ( for 編輯 )
     const get_Edit_Plan_Basic_Price = useEffect_Get_Edit_Plan_Basic_Price() ; 


     // 設定 _ 預設方案 ( 包月洗澡、包月美容 ) 品種 : 預設價格
     useEffect_Default_Plan_Basic_Price() ;


     return <div className="relative m_Top_70 m_Bottom_50">

                { /* 提醒 ( @ 新增 )*/ } 
                { !editType && 
                     <span className="absolute" style = {{ top : "-45px" , fontSize : "11pt" }} > 
                        <i className="fas fa-exclamation-circle"></i> &nbsp;需先新增 _ 客戶及其寵物，才能購買方案 。 
                     </span> 
                }
 
                { /* 標題 */ }
                <label className="label m_Bottom_50" >

                    <b className="tag is-large is-danger" > <i className="fas fa-file-alt"></i> &nbsp; 方 案 </b> &nbsp; &nbsp;

                    { /* 客戶所有寵物 ( @ 新增 ) */ }
                    { !editType && 
                           <Customer_Pets current={ current } current_Customer_Pets={ current_Customer_Pets } click_Pet_Button={ click_Pet_Button } /> 
                    }

                </label>

                <div className="columns is-multiline is-mobile">

                     { /* 方案類型  */ }
                     <Applied_Plan_Type /> 

                     { /* 寵物品種  */ }
                     { ( current_Plan_Type && current_Plan_Type !== '請選擇' || editType === '編輯' ) &&  <Applied_Species_Select /> }

                     { /* for [ 新增 ] */ }
                     { ( current_Species_Id &&  current_Species_Id !== '請選擇' && !editType ) &&  
                              <Plan_Type_Columns register = { register } errors = { errors }  /> }

                     { /* for [ 編輯 ] ( 該方案可洗澡、美容次數 )  */ }
                     { editType && <Plan_Bath_Beauty_Num serviceData = { serviceData } /> }                     

                </div>

                { /* # for 【 編輯 】 */ }
                { editType  &&

                  <div className="columns is-multiline is-mobile">

                    { /* 基本價格 */ }
                    <div className="column  is-3-desktop">
                        <div className="f_14"> 基本價格 : 
                            <b className="fDred"> { get_Edit_Plan_Basic_Price( serviceData ) } </b> 元 
                        </div>
                    </div>

                    { /* 自訂 : 加 / 減 金額 */ }
                    <div className="column is-3-desktop">
                        <div className="f_14"> 自訂加 / 減 金額 : <b className="fDred"> { serviceData.plan_adjust_price } </b> 元 </div>
                    </div>

                    { /* 接送費 */ }
                    <div className="column is-6-desktop">
                        <div className="f_14"> 接送費 : <b className="fDred"> { serviceData.pickup_fee } </b> 元 </div>
                    </div>

                
                  </div>

                }

            </div>

} ;

export default Plan_Form