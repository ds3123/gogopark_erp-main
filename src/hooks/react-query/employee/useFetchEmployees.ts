
import { useQuery } from "react-query" ;
import { employeeKeys } from "react-query/query-key/employeeKeys" ; 
import { fetch_Employees , 
         fetch_Shop_Employees ,
         fetch_Employee_With_Account_By_EmployeeId 
        } from "utils/api/api_Employee" ;



// @ 取得 _ 所有員工
export const useFetch_Employees = () => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          employeeKeys.all_employees , 
                                          () => fetch_Employees() 
                                         ) ; 
 
    return data                                        
 
}


// @ 取得 _ 特定資料表 id  員工 ( 含所屬店家 account 資訊  )
export const useFetch_Employee_With_Account_By_EmployeeId = ( employee_id : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          employeeKeys.single_employee_with_shop( employee_id ) , 
                                          () => fetch_Employee_With_Account_By_EmployeeId( employee_id ) ,
                                          { enabled : !!employee_id } 
                                         ) ; 
 
    return data                                        
 
}



// @ 取得 _ 特定商店，所有員工
export const useFetch_Shop_Employees = ( account_id : string ) => {

    // 預設值
    const fallback = [] as any[] ;  
 
    const { data = fallback } = useQuery( 
                                          employeeKeys.shop( account_id ) , 
                                          () => fetch_Shop_Employees( account_id ) ,
                                          { enabled : !!account_id } 
                                         ) ; 
 
    return data                                        
 
 }

