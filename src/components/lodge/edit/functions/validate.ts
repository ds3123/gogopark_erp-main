

// 驗證 _ 費用 : 洗澡、美容
export const validate_BathBeauty = ( method : '現金' | '方案' | '贈送' , amount : string ) => () => {
   
    if( method === '現金' && !amount ){ 
        alert( '需填寫 _ 金額' ) ;
        return false ;
     }

} ;





// 驗證 _ 自訂費用
export const validate_Custom = ( title : string , amount : string ) => () => {
   
    if( !title ){ 
        alert( '需填寫 _ 費用名稱' ) ;
        return false ;
     }

    if( !amount ){ 
        alert( '需填寫 _ 費用金額' ) ;
        return false ;
    }

} ;