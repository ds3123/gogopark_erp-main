

import { useReducer , useContext , createContext } from 'react' ;
import createCustomPlanReducer , { initState , ACTIONS } from '../reducers/createCustomPlanReducer' ;


const CreateContext = createContext( initState as any ) ;


// 建立 Context Provider
export const CreateCustomPlanProvider = ( { children } : any ) => {

    const [ state , dispatch ] = useReducer( createCustomPlanReducer , initState ) ;


    // 設定 _ 新增方案，所套用的所有寵物品種
    const set_Plan_Applied_Species = ( appliedSpecies : any[] ) => {
    
       dispatch( { type : ACTIONS.SET_PLAN_APPLIED_SPECIES , payload : { plan_Applied_Species : appliedSpecies } } ) ;

    }  ;

    // 設定 _ 自訂方案：洗澡次數
    const set_Current_Custom_Bath_Num = ( num : number ) => {
    
       dispatch( { type : ACTIONS.SET_CURRENT_CUSTOM_BATH_NUM , payload : { current_Custom_Bath_Num : num } } ) ;

    } ;

    // 設定 _ 自訂方案：美容次數
    const set_Current_Custom_Beauty_Num = ( num : number ) => {
    
        dispatch( { type : ACTIONS.SET_CURRENT_CUSTOM_BEAUTY_NUM , payload : { current_Custom_Beauty_Num : num } } ) ;
 
    } ;

    // 設定 _ 自訂方案：預設價格
    const set_Current_Custom_DefaultPrice = ( price : number ) => {
    
        dispatch( { type : ACTIONS.SET_CURRENT_CUSTOM_DEFAULT_PRICE , payload : { current_Custom_DefaultPrice : price } } ) ;
 
    } ;

    // 設定 _ 自訂方案：品種價格
    const set_Current_Custom_SpeciesPrice = ( price : number ) => {
    
        dispatch( { type : ACTIONS.SET_CURRENT_CUSTOM_SPECIES_PRICE , payload : { current_Custom_SpeciesPrice : price } } ) ;
 
    } ;

    // 設定 _ 計價方式 : 平均計算 / 自行計算
    const set_Current_Custom_Price_Method = ( method : string ) => {
    
        dispatch( { type : ACTIONS.SET_CURRENT_CUSTOM_PRICE_METHOD , payload : { current_Custom_Price_Method : method } } ) ;
 
    } ;
  

    // ----------------------------

    const value = {
                     plan_Applied_Species        : state.plan_Applied_Species ,
                     current_Custom_Bath_Num     : state.current_Custom_Bath_Num ,
                     current_Custom_Beauty_Num   : state.current_Custom_Beauty_Num ,
                     current_Custom_DefaultPrice : state.current_Custom_DefaultPrice ,
                     current_Custom_SpeciesPrice : state.current_Custom_SpeciesPrice ,
                     current_Custom_Price_Method : state.current_Custom_Price_Method ,
                     set_Plan_Applied_Species ,
                     set_Current_Custom_Bath_Num ,
                     set_Current_Custom_Beauty_Num ,
                     set_Current_Custom_DefaultPrice ,
                     set_Current_Custom_SpeciesPrice ,
                     set_Current_Custom_Price_Method
                   }   

    
    return <CreateContext.Provider value = { value } >
 
              { children }

           </CreateContext.Provider>

}

// 自訂 Hook : 使用 context
const useCreate_Custom_Plan_Context = () => {

    const context = useContext( CreateContext ) ;

    if( context === undefined ) throw new Error( "useCreate_Custom_Plan_Context 錯誤" ) ;

    return context ;

} ;

export default useCreate_Custom_Plan_Context
        