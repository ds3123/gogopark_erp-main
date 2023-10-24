import { Payment_Method } from "utils/custom_types/finance_types" ;
import { CreateTab, EditType } from "utils/custom_types/form" ; 
import { is_Pet_Has_Plans } from "fp/plans/condition/use_Plan" ;


// # 編輯模式 -------

// 是 _ 新增模式 < T >
export const is_Create = ( editType : EditType ) : boolean => editType === undefined ? true : false ;

// 是 _ 編輯模式 < T >
export const is_Update = ( editType : EditType ) : boolean => editType === "編輯" ? true : false ;


// # 新增類型 -------

// 是 _ 新增：客人 < T >
export const is_Create_Customer = ( createTab : CreateTab ) : boolean => createTab === "客戶" ;

// 是 _ 新增：寵物 <T>
export const is_Create_Pet      = ( createTab : CreateTab ) : boolean => createTab === "寵物" ;

// 是 _ 新增：基礎 <T>
export const is_Create_Basic    = ( createTab : CreateTab ) : boolean => createTab === "基礎" ;

// 是 _ 新增：洗澡 <T>
export const is_Create_Bath     = ( createTab : CreateTab ) : boolean => createTab === "洗澡" ;

// 是 _ 新增：美容 <T>
export const is_Create_Beauty   = ( createTab : CreateTab ) : boolean => createTab === "美容" ;

// 是 _ 新增：安親 <T>
export const is_Create_Care     = ( createTab : CreateTab ) : boolean => createTab === "安親" ;

// 是 _ 新增：住宿 <T>
export const is_Create_Lodge    = ( createTab : CreateTab ) : boolean => createTab === "住宿" ;

// 是 _ 新增：其他 <T>
export const is_Create_Other    = ( createTab : CreateTab ) : boolean => createTab === "其他" ;

// 是 _ 新增：方案 <T>
export const is_Create_Plan     = ( createTab : CreateTab ) : boolean => createTab === "方案" ;

// 是 _ 新增：價格 <T>
export const is_Create_Price    = ( createTab : CreateTab ) : boolean => createTab === "價格" ;

// 是 _ 新增：品種 <T>
export const is_Create_Species  = ( createTab : CreateTab ) : boolean => createTab === "品種" ;

// 是 _ 新增：帳號 <T>
export const is_Create_Account  = ( createTab : CreateTab ) : boolean => createTab === "帳號" ;

// 是 _ 新增：員工 <T>
export const is_Create_Employee = ( createTab : CreateTab ) : boolean => createTab === "員工" ;

// 是 _ 新增：商品 <T>
export const is_Create_Product  = ( createTab : CreateTab ) : boolean => createTab === "商品" ;

// 是 _ 新增：洗澡 or 美容 <T>
export const is_Create_Bath_Or_Beauty  = ( createTab : CreateTab ) : boolean => is_Create_Bath( createTab ) || is_Create_Beauty( createTab ) ;


// # 支付方式

// 是 _ 現金 <T>
export const is_PaymentMethod_Cash       = ( paymentMethod : Payment_Method ) : boolean => paymentMethod === "現金"  ;

// 是 _ 方案 <T>
export const is_PaymentMethod_Plan       = ( paymentMethod : Payment_Method ) : boolean => paymentMethod === "方案"  ;

// 是 _ 信用卡 <T>
export const is_PaymentMethod_CreditCard = ( paymentMethod : Payment_Method ) : boolean => paymentMethod === "信用卡"  ;

// 是 _ 第三方支付 <T>
export const is_PaymentMethod_ThirdParty = ( paymentMethod : Payment_Method ) : boolean => paymentMethod === "第三方支付" ;



// # 是否顯示：特定區塊

// 是否顯示 _ 新增時，若類疊為 '洗澡' 或 '美容' 時，當支付方式為 '方案' 時， 特定寵物的：可用方案列表 < T >
export const is_Show_Create_Use_Plans = ( editType      : EditType , 
                                          createTab     : CreateTab , 
                                          paymentMethod : Payment_Method , 
                                          petPlans      : any[] 
                                        ) : boolean => {


    return is_Create( editType ) && 
           is_Create_Bath_Or_Beauty( createTab ) &&
           is_PaymentMethod_Plan( paymentMethod ) &&
           is_Pet_Has_Plans( petPlans ) ;

  } ;