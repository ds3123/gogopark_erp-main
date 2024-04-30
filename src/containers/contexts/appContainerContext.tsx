import { useReducer , useContext , createContext } from 'react' ;
import appContainerReducer , { initState , ACTIONS } from "../hooks/reducers/appContainerReducer" ;


const AppContainerContext = createContext( initState as any ) ;


export const AppContainerProvider = ( { children } : any ) => {


    const [ state , dispatch ] = useReducer( appContainerReducer , initState ) ;


    // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 
    const set_Service_Second_Nav_Tab = ( tab : string ) => {
    
        dispatch( { type : ACTIONS.SET_SERVICE_SECOND_NAV_TAB , payload : { service_Second_Nav_Tab : tab } } ) ;
    
    } ;

   // ----------------------------

      const value = {
                       service_Second_Nav_Tab : state.service_Second_Nav_Tab ,
                       set_Service_Second_Nav_Tab
                    }

    
     return <AppContainerContext.Provider value = { value } >
    
              { children }
          
            </AppContainerContext.Provider>    


} ;


// 自訂 Hook : 使用 context
const useCreate_App_Container_Context = () => {

    const context = useContext( AppContainerContext ) ;

    if( context === undefined ) throw new Error( "AppContainerContext 錯誤" ) ;

    return context ;

} ;

export default useCreate_App_Container_Context
       