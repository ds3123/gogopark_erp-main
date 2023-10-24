
import { is_Show_Create_Use_Plans } from "fp/common/condition/edit_mode";
import { useSelector } from "react-redux";
import { useFetch_Pet_Plans } from "hooks/react-query/plan/useFetchPlans" ;
import useCreate_Service_Summay_Fee_Context from "components/services/edit_components/summary_fee/contexts/serviceSummaryFeeContext" ;
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;
import { CreateTab, EditType } from "utils/custom_types/form" ; 
import { useEffect_Get_Current_Pet_Plans } from "components/pets/hooks/useEffect_Pet_Plan";


// 是否顯示 _ 新增時，若類疊為 '洗澡' 或 '美容' 時，當支付方式為 '方案' 時， 特定寵物的：可用方案列表
export const useEffect_Is_Show_Create_Use_Plans = () : boolean => {
    
    // 取得 context 值 : React Hook Form 屬性   
    const { editType }                   = useReact_Hook_Form_Context() as { editType : EditType  } ; 
     
    // 目前所點選 _ 新增類別標籤
    const current_Create_Tab : CreateTab = useSelector(( state : any ) => state.Service.current_Create_Tab ) ;

    // 目前所選擇 _ 付款方式
    const { current_Payment_Method }     = useCreate_Service_Summay_Fee_Context() ;

    // 目前所點選 _ 定寵物 : 所有購買的方案  
    const pet_All_Plans                  = useEffect_Get_Current_Pet_Plans() ;

    return is_Show_Create_Use_Plans( editType , current_Create_Tab , current_Payment_Method , pet_All_Plans ) ;

} ;