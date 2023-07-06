
interface IContainer {

    service_Second_Nav_Tab : string ;  // 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 

}

export const initState = {
    
                           service_Second_Nav_Tab : "" ,

                         } ;



export const ACTIONS = {

                         SET_SERVICE_SECOND_NAV_TAB  : "SET_SERVICE_SECOND_NAV_TAB" ,   // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤  
                        
                        } ;



const appContainerReducer = ( state : IContainer = initState , action : any ) => {

    const { type , payload } = action ;

    switch( type ){

        // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 
        case ACTIONS.SET_SERVICE_SECOND_NAV_TAB :
            return { ...state , service_Second_Nav_Tab : payload.service_Second_Nav_Tab } ;

        
        default :
            throw new Error( `未符合 appContainerReducer 類型條件 : ${ type }` )

    }


} ;


export default appContainerReducer
                              

