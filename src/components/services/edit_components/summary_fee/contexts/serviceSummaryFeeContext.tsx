
import { useReducer , useContext , createContext } from 'react' ;
import serviceSummaryFeeReducer , { initState , ACTIONS } from "../reducers/serviceSummaryFeeReducer" ;

const SummaryFeeContext = createContext( initState as any ) ;



// 建立 Context Provider
export const ServiceSummaryFeeProvider = ( { children } : any ) => {

    const [ state , dispatch ] = useReducer( serviceSummaryFeeReducer , initState ) ;


    // 設定 _ 目前新增服務費用時，所選擇 : 付款方式 
    const set_Current_Payment_Method = ( current_Payment_Method : string ) => {
        
        dispatch( { type : ACTIONS.SET_CURRENT_PAYMENT_METHOD , payload : { current_Payment_Method : current_Payment_Method } } ) ;

    }  ;

    // ----------------------------

    const value = {
                     current_Payment_Method : state.current_Payment_Method ,
                     set_Current_Payment_Method
                  }


    return <SummaryFeeContext.Provider value = { value } >
    
              { children }
    
           </SummaryFeeContext.Provider>
  

}

// 自訂 Hook : 使用 context
const useCreate_Service_Summay_Fee_Context = () => { 

    const context = useContext( SummaryFeeContext ) ;

    if( context === undefined ) throw new Error( "SummaryFeeContext 錯誤" ) ;

    return context ;

}

export default useCreate_Service_Summay_Fee_Context
       
