
import cookie from 'react-cookies';




// 回傳 _ 目前登入使用者，所屬 : 商店資訊
export const useAccount_Shop = () => {


    const _cookie  = cookie.load( 'userInfo' ) ;
    const shopInfo = _cookie['shop_account'] ;


    const shopObj = {  
                       shop_id : shopInfo['account_id'].toString() , // 登入者所屬商店 ( 資料表 : accounts ) id   
                       name    : shopInfo['shop_name'] ,             // 店名  
                       zipcode : shopInfo['zipcode'] ,               // 郵遞區號
                       num     : shopInfo['shop_num']                // 所屬區域編號 
                     } ;



    return shopObj ; 

} ;


// 回傳 _ 目前登入使用者，所屬 : 商店 ID
export const useAccount_Shop_Id = () => {

    const userInfo = cookie.load( 'userInfo' ) ; 

    return userInfo?.account_id  

} ;


// 回傳 _ 目前登入使用者
export const useAcchout_Shop_User = () => {

    const userInfo = cookie.load( 'userInfo' ) ;

    const userObj = {
                      employee_name : userInfo[ "employee_name" ] , // 員工姓名
                      account       : userInfo[ "account" ] ,       // 帳號名稱
                      nickname      : userInfo[ "nickname" ]        // 員工暱稱
                    }

    return userObj    

} ;
