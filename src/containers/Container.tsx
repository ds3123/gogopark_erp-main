/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-pascal-case */
import { useLocation } from "react-router-dom";
import Nav from "templates/nav/Nav" ;
import Side_Panel from "templates/panel/Side_Panel" ;
import Not_Support_Mobile from "components/mobile/Not_Support_Mobile" ;
import { useEffect_User_Account_Select_Component } from "./hooks/useEffect_Container" ;
import cookie from 'react-cookies' ;



// 容器元件
const Container = ( { children  } : any ) => {

   // 頁面路徑
   const { pathname }   = useLocation() ; 


   // 元件 : 切換 ( 管理帳號員工 ) 下拉選單
   const Account_Select = useEffect_User_Account_Select_Component() ;

   
   // 檢查是否有最高管理者的 cookie
   const is_Manage      = cookie.load( 'manage' ) ;



   return <article className = { pathname === '/' ? "container is-fluid" : "container" }  style = {{ top : "120px" }} >
          
            <Nav />                  { /* 導覽列 */ } 
            <Side_Panel />           { /* 右側滑動面板 */ } 
            <Not_Support_Mobile />   { /* 目前系統尚未支援手機版本 */ }


            { is_Manage && <Account_Select />}

            <div className = "m_Top_30"></div>
           
            { children }       { /* 各個 URL 路徑下，頁面主要元件 */ } 

          </article> ;


} ;

export default Container ;
