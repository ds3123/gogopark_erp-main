

// # 查詢 _ 員工相關 Query Key
export const employeeKeys = {

    // 所有員工
    "all_employees"  : [ "all_employees" ] , 

    // 特定商店，所有員工
    "shop"          : ( account_id : string ) =>  [ ...employeeKeys.all_employees , "shop" , account_id ] ,


    // 特定資料表 id  員工 ( 含所屬店家 account 資訊  )
    "single_employee_with_shop" : ( employee_id : string ) =>  [  "single_employee_with_shop" , employee_id ] ,

    
}
