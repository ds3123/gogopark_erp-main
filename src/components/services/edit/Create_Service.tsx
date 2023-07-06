/* eslint-disable react/jsx-pascal-case */

// Context
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;

// 各區塊表單元件
import Service_Info from "components/services/edit_components/Service_Info";
import Customer_Form from "components/customers/edit/Customer_Form";
import Pet_Form from "components/pets/edit/Pet_Form";
import Customer_Note from "components/services/edit_components/Customer_Note";
import Basic_Form from "components/services/edit_components/Basic_Form";
import Bath_Form from "components/services/edit_components/Bath_Form";
import Beauty_Form from "components/services/edit_components/Beauty_Form";
import Extra_Beauty from "components/services/edit_components/Extra_Beauty";
import Extra_Item from "components/services/edit_components/Extra_Item";
import Care_Form from "components/lodge/care/edit/Care_Form";
import Lodge_Form from "components/lodge/edit/Lodge_Form";
import Plan_Form from "components/plan/edit/Plan_Form";
import Pickup_Fee from "components/services/edit_components/Pickup_Fee";
import Summary_Fee from "components/services/edit_components/summary_fee/Summary_Fee";
import Self_Adjust_Amount from "components/services/edit_components/Self_Adjust_Amount";
import { useRating_Options } from "hooks/layout/useRating";
import { useMatch_Obj } from "containers/data_components/Condition_for_Currnet_Tab";
import { Create_Data_Type_Tab  } from "utils/Interface_Type";
import { ServiceSummaryFeeProvider } from "components/services/edit_components/summary_fee/contexts/serviceSummaryFeeContext";





/* @ 新增 : 基礎單、洗澡單、美容單 */
const Create_Service = () => {

    // 取得 context 值 : React Hook Form 屬性 
    const props_RHF = useReact_Hook_Form_Context() ;    
    const { current , register , setValue } = props_RHF ;
    
    // # 依照目前所點選 : 頁籤 ( current_Tab )，判斷 _ 是否顯示/符合條件
    const is_Obj         = useMatch_Obj( current as Create_Data_Type_Tab ) ;

    // 評分選項
    const rating_Options = useRating_Options( '櫃台人員評分' , 'admin_Rating' , register , setValue ) ;

    
    return <>

             { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
             { is_Obj.is_Show_Service_Info && <Service_Info { ...props_RHF } /> }

             { /* 客戶 */ }
             { is_Obj.is_Show_Create_Customer && <Customer_Form { ...props_RHF } /> }

             { /* 寵物 */ }
             { is_Obj.is_Show_Create_Pet && <Pet_Form { ...props_RHF } /> }

             { /* 自備物品、主人交代、櫃台備註  */ }
             { is_Obj.is_Show_Custom_Note && <Customer_Note { ...props_RHF } /> }

             { /* 基礎單項目 */ }
             { is_Obj.is_Show_Basic_Form && <Basic_Form { ...props_RHF }     /> }

             { /* 洗澡單項目 */ }
             { is_Obj.is_Show_Bath_Form  && <Bath_Form { ...props_RHF }      /> }

             { /* 美容單項目 */ }
             { current === "美容" && <Beauty_Form { ...props_RHF } /> }

             { /* 安親項目 */ }
             { current === "安親" && <Care_Form { ...props_RHF }   /> }

             { /* 住宿項目 */ }
             { current === "住宿" && <Lodge_Form { ...props_RHF }  /> }

             { /*  所有服務 : 自行調整費用金額  */ }
             { is_Obj.is_Show_Self_Adjust_Amount && <Self_Adjust_Amount { ...props_RHF } /> }

             { /* 加價項目 */ }
             { ( current === "洗澡" || current === "美容" ) && <Extra_Item { ...props_RHF } /> }

             { /* 加價美容 */ }
             { current === "洗澡" && <Extra_Beauty { ...props_RHF } /> } 

             { /* 方案項目 */ }
             { current === "方案" && <Plan_Form /> }

             { /* 接送費 */ }
             { is_Obj.is_Show_Pickup_Fee && <Pickup_Fee { ...props_RHF } /> }

             { /* 評分選項 */ }
             { is_Obj.is_Show_Rating_Options && rating_Options } 

             { /* 費用結算 */ }
             { is_Obj.is_Show_Summary_Fee &&

                <ServiceSummaryFeeProvider>
                    <Summary_Fee />
                </ServiceSummaryFeeProvider>
             
             }

          </>

} ;


export default Create_Service