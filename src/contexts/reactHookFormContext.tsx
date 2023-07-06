import { useContext , createContext } from 'react' ;
import { IReachHookFormContext } from "utils/Interface_Type" ;



// 建立欲傳遞 React Hook Form 的 Context
export const ReachHookFormContext = createContext< IReachHookFormContext >( {} as IReachHookFormContext ) ;



// 自訂 Hook : 使用 context
const useReact_Hook_Form_Context = () => {

    const context = useContext( ReachHookFormContext ) ;

    if( context === undefined ) throw new Error( "useReact_Hook_Form_Context 錯誤" ) ;

    return context ;

} ;


export default useReact_Hook_Form_Context
       