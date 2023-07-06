
import { useSelector } from "react-redux";
import { Create_Data_Type_Tab  } from "utils/Interface_Type" ;


export const arr = {
     
     // # 符合條件
     "is_Customer_Relatives"      : [ "客戶" , "寵物" , "基礎" , "洗澡" , "美容" , "方案" , "安親" , "住宿"  ] ,  // 客戶關係人
     "is_Check_Pet_Bite_Column"   : [ "寵物" , "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ,                   // 寵物是否會咬人


     // # 顯示元件
     "is_Show_Service_Info"       : [ "基礎" , "洗澡" , "美容" ] ,                                            // <Service_Info /> 
     
     "is_Show_Create_Customer"    : [ "客戶" , "寵物" , "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ,  // <Customer_Form /> 
     "is_Show_Create_Pet"         : [ "寵物" , "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ,                   // <Pet_Form /> 

     "is_Show_Custom_Note"        : [ "基礎" , "洗澡" , "美容" , "安親", "住宿" ] ,                            // <Customer_Note />

     "is_Show_Create_Service"     : [ "客戶" , "寵物" , "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ,  // <Create_Service />

     "is_Show_Basic_Form"         : [ "基礎" , "洗澡" , "美容" ] ,                                            // <Basic_Form />
     "is_Show_Bath_Form"          : [ "洗澡" , "美容" ] ,                                                    // <Bath_Form />

     "is_Show_Self_Adjust_Amount" : [ "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ,                           // <Self_Adjust_Amount />
     "is_Show_Pickup_Fee"         : [ "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ,                           // <Pickup_Fee />
 
     "is_Show_Rating_Options"     : [ "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ,                           // <Rating_Options /> 

     "is_Show_Summary_Fee"        : [ "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ,                   // <Summary_Fee />    

     "is_Show_Payment_Date"       : [ "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ,                   // 付款日期 : <Payment_Date />         

}


// 回傳物件 _ 各個屬性，決定特定資料 ( 客戶關係人 )，在那些區塊選項，是否顯示 ( 屬性值，為下個部分 hook 產生 )
export const useMatch_Obj = ( current : Create_Data_Type_Tab ) => {

     // 是否完整填寫 Ex. 客戶區塊欄位
     const is_Show_Section_Services = useSelector( ( state : any ) => state.Layout.is_Show_Section_Services ) ;

     const obj = {

         // # 符合：
         is_Customer_Relatives      : arr[ "is_Customer_Relatives" ].includes( current ) ,      // 客戶關係人
      
         is_Check_Pet_Bite_Column   : arr[ "is_Check_Pet_Bite_Column" ].includes( current ) ,   // 寵物區塊，是否勾選會咬人
         
         // # 是否顯示 _ 元件 ：
         is_Show_Service_Info       : arr[ "is_Show_Service_Info" ].includes( current ) ,       // <Service_Info />  

         is_Show_Create_Customer    : arr[ "is_Show_Create_Customer" ].includes( current ) ,    // <Customer_Form />
         is_Show_Create_Pet         : arr[ "is_Show_Create_Pet" ].includes( current ) ,         //  <Pet_Form />
         is_Show_Custom_Note        : arr[ "is_Show_Custom_Note" ].includes( current ) ,        //  <Customer_Note />

         is_Show_Create_Service     : arr[ "is_Show_Create_Service" ].includes( current ) && is_Show_Section_Services ,  //  <Create_Service />
         is_Show_Basic_Form         : arr[ "is_Show_Basic_Form" ].includes( current ) ,         //  <Basic_Form />
         is_Show_Bath_Form          : arr[ "is_Show_Bath_Form" ].includes( current ),           //  <Bath_Form />
         
         is_Show_Self_Adjust_Amount : arr[ "is_Show_Self_Adjust_Amount" ].includes( current ) , //  <Self_Adjust_Amount />
         is_Show_Pickup_Fee         : arr[ "is_Show_Pickup_Fee" ].includes( current ) ,         //  <Pickup_Fee />
         
         is_Show_Rating_Options     : arr[ "is_Show_Rating_Options" ].includes( current )  ,    //  rating_Options
         
         is_Show_Summary_Fee        : arr[ "is_Show_Summary_Fee" ].includes( current ) ,        //  <Summary_Fee />

         is_Show_Payment_Date       : arr[ "is_Show_Payment_Date" ].includes( current ) ,       // 付款日期 : <Payment_Date />   


     }

     return obj ;

} ;

