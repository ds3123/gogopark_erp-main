import { useReducer , useContext , createContext } from 'react' ;
import createServiceReducer , { initState , ACTIONS } from "../hooks/reducers/createServiceReducer" ;




const CreateServiceContext = createContext( initState as any ) ;



export const CreateServiceProvider = ( { children } : any ) => {


    const [ state , dispatch ] = useReducer( createServiceReducer , initState ) ;


    // 設定 _ 寵物體型 ( 小型犬、中型犬、大型犬、特大型犬 )
    const set_Pet_Size = ( size : string ) => {
    
        dispatch( { type : ACTIONS.SET_PET_SIZE , payload : { pet_Size : size } } ) ;
    
    } ;

   // ----------------------------

      const value = {
                       pet_Size : state.pet_Size ,
                       set_Pet_Size
                    }

    
     return <CreateServiceContext.Provider value = { value } >
    
                    { children }
          
            </CreateServiceContext.Provider>    


} ;




// 自訂 Hook : 使用 context
const useCreate_Service_Context = () => {

    const context = useContext( CreateServiceContext ) ;

    if( context === undefined ) throw new Error( "useCreate_Service_Context 錯誤" ) ;

    return context ;


} ;

export default useCreate_Service_Context