
import { useState , useEffect } from 'react' ;
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Shop_Quota from "../components/Shop_Quota" ;
import Member_Quota from "../components/Member_Quota" ;
import { useDispatch } from "react-redux";
import cookie from 'react-cookies';



// 取得 _ 登入者訊息 ( 含所屬店家資訊 )
export const useEffect_Fetch_User_Account = () => {


      // 使用者類別 ( Ex. 櫃台、美容 .... )
      const [ account , set_Account ] = useState({

                                                shop_Name     : '' , // 使用者 _ 所屬店家 : 名稱
                                                shop_Zipcod   : '' , // 使用者 _ 所屬店家 : 郵遞區號 
                                                shop_Num      : '' , // 使用者 _ 所屬店家 : 區域編號

                                                employee_Type : '' , // 帳號類型( Ex.管理帳號、測試帳號、工作人員 )
                                                position_Type : '' , // 職位類別( Ex. 櫃台、美容、接送 )
                                                account       : '' , // 帳號名稱
                                                employee_Name : '' , // 使用者姓名

                                              }) ;


      useEffect( () => { 

            // 設定 _ 使用者類別
            const _cookie = cookie.load('userInfo') ;

            if( _cookie ){

                  const shopInfo = _cookie['shop_account'] ;  // 該員工所屬商店訊息

                  set_Account({ ...account ,

                                    shop_Name     : shopInfo['shop_name'] ,
                                    shop_Zipcod   : shopInfo['zipcode'] ,  
                                    shop_Num      : shopInfo['shop_num'] ,  

                                    employee_Type : _cookie['employee_type'] ,
                                    position_Type : _cookie['position_type'] ,
                                    account       : _cookie['account'] ,
                                    employee_Name : _cookie['employee_name'] ,

                              }) ;

            }
      
      } , [] ) ;


      return account 

} ;


// 點選 _ 店家點數
export const useEffect_Click_Shop_Quota = () => {

     const dispatch = useDispatch() ;

     const click_Shop_Quota = ( data : any ) => {
     
        dispatch( set_Modal( true , <Shop_Quota /> , {  data : data , modal_Style : { width : "86%"  , left : "7%" , top : "0px" } } )) ;

     } ;

     return click_Shop_Quota


} ;


// 點選 _ 成員點數、紀錄
export const useEffect_Click_Member_Quota = () => {

      const dispatch = useDispatch() ;

      const click_Member_Quota = ( data : any ) => {

         dispatch( set_Modal( true , <Member_Quota /> , {  data : data , modal_Style : { width : "76%" , left : "12%" , top : "0px" } } )) ;

      } ;

      return click_Member_Quota

} ;






