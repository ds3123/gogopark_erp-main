

import axios from 'utils/axios' ;

// @ 員工 相關 API ( 資料表 : employees )


// [ GET ] ---------------
                
// 取得 _ 特定資料表 id  員工 ( 含所屬店家 account 資訊  ) ( for React Query )
export const fetch_Employee_With_Account_By_EmployeeId = (  employeeId : string ) => 
            axios.get< any >( `/employees/show_employee_with_account_by_employee_id/${ employeeId }` ).then( res => res.data ) ;


// 取得 _ 所有員工 ( 含所屬商店資料 ) ( for React Query )
export const fetch_Employees = ( ) => 
                axios.get< any[] >( `/employees/show_all_employees_with_account` ).then( res => res.data ) ;


// 取得 _ 特定商店，所有員工 ( for React Query )
export const fetch_Shop_Employees = ( account_id : string ) => 
                axios.get< any[] >( `/employees/show_shop_employees_with_account/${ account_id }` ).then( res => res.data ) ;


// [ POST ] ---------------

// 新增 _ 員工 ( for React Query )  
export const create_Employee = ( obj : any ) => axios.post( "/employees" , obj ) ;




