/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */

import { Edit_Form_Type } from "utils/Interface_Type";
import { Input } from "templates/form/Input";
import { useState , useEffect } from "react";
import Taiwan_Zip_Code from "templates/form/Taiwan_Zip_Code" ;
import { Zipcode_Info } from "utils/Interface_Type" ;
import { get_AllAccounts_By_Zipcode } from "utils/api/api_Account" ; 



interface IAccount extends Edit_Form_Type {

    editType?    : string ;
    accountData? : any ;

}


const Account_Form = ( { register  , errors , setValue , current , control , editType , accountData } : IAccount ) => {

   

   // 郵遞區號
   const [ zipcode_Info , set_Zipcode_Info ] = useState< Zipcode_Info >({
    
                                                    zipcode  : "" ,  // 郵遞區號
                                                    city     : "" ,  // 縣市
                                                    district : ""    // 行政區

                                               }) ;


   // 特定郵遞區號下，所有商店
   const [ zipcode_Shops , set_Zipcode_Shops ] = useState( [] ) ;
                                        


   // 取得、回傳 : 郵遞區號
   const get_ZipCode_Info = ( info : Zipcode_Info ) => set_Zipcode_Info({
                                                                          ...zipcode_Info ,
                                                                             zipcode  : info['zipcode'] ,
                                                                             city     : info['city'] ,
                                                                             district : info['district']
                                                                         }) ; 



   // 設定 _ 郵遞區號、縣市、行政區                                                                      
   useEffect( () => {
    
      if( zipcode_Info[ "zipcode" ] )  setValue( "account_Zipcode"  , zipcode_Info[ "zipcode" ] ) ;
      if( zipcode_Info[ "city"  ] )    setValue( "account_County"   , zipcode_Info[ "city" ] ) ;
      if( zipcode_Info[ "district" ] ) setValue( "account_District" , zipcode_Info[ "district" ] ) ;

   } , [ zipcode_Info[ "zipcode" ] , zipcode_Info[ "city" ] , zipcode_Info[ "district" ] ] ) ;



   // 取得 _ 所選擇郵遞區號下，所已設定的商店帳號
   useEffect( () => {
             
        if( zipcode_Info[ "zipcode" ] ){

            get_AllAccounts_By_Zipcode( zipcode_Info[ "zipcode" ] ).then( res => {
               
                set_Zipcode_Shops( res.data ) ;  // 設定 _ state

            }) ;

        }
           
   } , [ zipcode_Info[ "zipcode" ] ] ) ;



   // 設定 _ 該區域 ( 郵遞區號 ) 下，商店編號、預設帳號密碼
   useEffect( () => {
     
      const shopSum = zipcode_Shops.length ;

      // 商店編號
      setValue( "shop_Num" , shopSum + 1 ) ; 


      // 設定 _ 預設帳號、密碼
      setValue( "account_Default_Account"  , zipcode_Info[ "zipcode" ] + "-" + ( shopSum + 1 ).toString()  ) ;
      setValue( "account_Default_Password" , "test_001"  ) ;

   } , [ zipcode_Shops ] ) ;



   return <div className="columns is-multiline is-mobile">

                 { /* 縣市、行政區 */ } 
                 <div className="column is-4-desktop required relative"> 

                    <Taiwan_Zip_Code get_ZipCode_Info = { get_ZipCode_Info } />

                 </div>

                 { /* 郵遞區號  */ }
                 <div className="column is-2-desktop required">

                    <p> 郵遞區號 </p>
                    <b className="fDred f_13 relative" style={{ top:"5px" }}> { zipcode_Info[ "zipcode" ] } </b> 

                     <span className="absolute" style={{ top:"43px" , right : "-15px" }}>

                        ( 已建立帳號數 : <b className="fDblue"> { zipcode_Shops.length } </b>  )

                     </span>

                
                 </div>

                 <div className="column is-offset-1 is-4-desktop required"> 

                    <p> 品 牌 </p>
                    <div className="select">

                        <select { ...register( "account_Brand" ) } >

                            <option value="請選擇">   請選擇  </option>
                            <option value="單一店家"> 單一店家 </option>
                            <option value="狗狗公園"> 狗狗公園 </option>
                            <option value="寵物王國"> 寵物王國 </option>
                            <option value="動物管家"> 動物管家 </option>

                        </select>

                    </div>

                 </div>
                 
                 <Input type="text" name="account_Shop_Name"        label="店 名"   register={ register }  error={ errors.account_Shop_Name }       icon="fas fa-store" asterisk={true} columns="6" />
                 <div className="column is-1-desktop"></div>
                 <Input type="text" name="account_Shop_Owner"       label="負責人"   register={ register } error={ errors.account_Shop_Owner }       icon="fas fa-user" asterisk={true} columns="3" />


                 {/* 
                 
                    <Input type="text" name="account_Default_Account"  label="預設帳號" register={ register } error={ errors.account_Default_Account }  icon="fas fa-user" asterisk={true} columns="3" />
                    <Input type="text" name="account_Default_Password" label="預設密碼" register={ register } error={ errors.account_Default_Password } icon="fas fa-user" asterisk={true} columns="3" />

                    <div className="column is-offset-1 is-2-desktop required"> 

                        <p> 權限等級 </p>
                        <div className="select">

                            <select { ...register( "account_Auth_Level" ) }   >
                                <option value="請選擇"> 請選擇 </option>
                                <option value="Ａ"> Ａ </option>
                                <option value="Ｂ"> Ｂ </option>
                                <option value="C"> C </option>
                            </select>

                        </div>

                    </div> 
                 
                 */}


            </div>
    

} ;

export default Account_Form
       