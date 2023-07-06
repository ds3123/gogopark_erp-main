
/*

   @ 當天總計金額 _ 計算方式說明 ( 右上方 )


*/ 


// for 綜合報表、現金帳
export const nav_Total_Note_1 = () => 

    <> 
       ( 洗澡美容 : 應收款 ) + ( 洗澡美容 : 預收款 ) + ( 住宿安親 : 應收款 ) + 其他收入 <b className="f_16 fDred"> - </b> 其他支出 
    </> ;


// for 信用卡、第三方支付
export const nav_Total_Note_2 = () => <> ( 洗澡美容 : 應收款 ) + ( 洗澡美容 : 預收款 ) + ( 住宿安親 : 應收款 ) </> ;