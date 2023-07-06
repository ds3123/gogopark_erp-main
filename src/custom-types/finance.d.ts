
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



// 取得 _ 各區塊小計金額 ( return 回傳  )
interface I_Return_Finance_Section_Total {

  Sum_Total          : number ;  // 總計 ( 右上角 )
   
  Service_Receivable : number ;  // 洗澡美容：應收款
  Deduct_Advance     : number ;  // 洗澡美容：扣 _ 預收款 --> 使用方案 
  Advance_Receipt    : number ;  // 洗澡美容：預收款      --> 購買方案    
  Lodge_Receivable   : number ;  // 住宿安親：應收款   
  Cash_Income        : number ;  // 其他 : 收入
  Cash_Expenditure   : number ;  // 其他 : 支出

  Extra_Fee          : number ;  // 加價單

}





