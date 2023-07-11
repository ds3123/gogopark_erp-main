import cookie from 'react-cookies' ;


/*

   # 取得 _ 登入使用者相關資訊

*/


// 取得 _ Cookie : 員工姓名 
export const get_Cookie_EmployeeName = () : string => {

    // Cookie : 目前登入者資訊
    const userInfo = cookie.load( 'userInfo' ) ;

    return ( userInfo && userInfo?.employee_name ) ? userInfo?.employee_name :
           ( userInfo && userInfo?.account )       ? userInfo?.account :        // 若為員工姓名，顯示 _ 登入帳號名稱
            "無使用者資訊" ;

} ;