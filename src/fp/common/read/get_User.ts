

/*

   # 取得 _ 登入使用者相關資訊

*/


// 員工姓名 < T >
export const get_Cookie_EmployeeName = ( cookie : Cookie_UserInfo ) : string => {

    return cookie.employee_name ? cookie.employee_name : "" ;

} ;