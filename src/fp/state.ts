
import cookie from 'react-cookies' ;



// 資料表欄位 _ 刪除狀態
export const is_Delete = () => 1 ; 



// 判斷 _ 是否物件 ( Ex. 用以決定是否執行 _ 遞迴 )
export const is_Object = ( x : any ) => typeof x === "object" && x !== null ;


// Cookie 登入使用者資訊
export const get_Cookie_UserInfo = () => cookie.load( 'userInfo' ) ;



