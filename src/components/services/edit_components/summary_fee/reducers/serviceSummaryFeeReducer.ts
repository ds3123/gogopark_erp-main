

interface IFee {

    current_Payment_Method : string ;  // 目前新增服務費用時，所選擇 : 付款方式 ( Ex. 現金、方案... )

}

export const initState = {
    
                           current_Payment_Method : "現金" ,

                         } ;



export const ACTIONS = {

    SET_CURRENT_PAYMENT_METHOD  : "SET_CURRENT_PAYMENT_METHOD" ,   // 設定 _ 目前新增服務費用時，所選擇 : 付款方式 

    

} ;



const serviceSummaryFeeReducer = ( state : IFee = initState , action : any ) => {

     const { type , payload } = action ;

     switch( type ){

        // 設定 _ 目前新增服務費用時，所選擇 : 付款方式 
        case ACTIONS.SET_CURRENT_PAYMENT_METHOD :
             return { ...state , current_Payment_Method : payload.current_Payment_Method } ;

        
        default :
            throw new Error( `未符合 serviceSummaryFeeReducer 類型條件 : ${ type }` )

     }


} ;


export default serviceSummaryFeeReducer
       