
/*

  @ 表單相關型別

*/

// 新增、編輯模式
export type EditType = undefined | "編輯" ;


// 新增標籤
export type CreateTab = "客戶" | "寵物" |
                        "基礎" | "洗澡" | "美容" | 
                        "安親" | "住宿" | 
                        "方案" | "其他"  | "價格" | "品種" | "帳號" | "員工" | "商品" ;


// 服務單建立後，加價面板
export interface I_Side_Extra_Fee {

  extra_Custom_Item       : string ;  // 自訂加價項目
  extra_Custom_Item_Price : string ;  // 自訂加價項目價格

  payment_Date : any ; // 付款日期 

}


