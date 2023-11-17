
/*

  @ 財務管理

*/



// 各區塊小計 ( for 綜合報表、現金帳 )
interface I_Finance_Section_1 {

    service_Data    : any[] ;  // 洗澡美容 : 應收款
    use_Plan_Data?  : any[] ;  // 洗澡美容 : 扣 _ 預收款
    plan_Data       : any[] ;  // 洗澡美容 : 預收款      
    care_Lodge_Data : any[] ;  // 住宿安親 : 應收款
    others_By_Date? : any[] ;  // 其他    : 收入、支出

    extra_Fee_By_PaymentDate? : any[]

}


// 各區塊小計 ( for 信用卡、第三方支付 )
interface I_Finance_Section_2 {

    service_Data    : any[] ;
    plan_Data       : any[] ;
    care_Lodge_Data : any[] ;

}







