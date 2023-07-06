
import { Dispatch } from "redux" ;



/* @ 寵物  */

// # 設定 _ 寵物頁資料 _ 是否下載中
export const set_Pet_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type          : "SET_PET_ISLOADING" ,
                    Pet_isLoading : bool
                }) ;

           } ;

} ;

// # 設定 _ 目前 "品種" 下拉選項，所選擇的品種 Id
export const set_Current_Species_Select_Id = ( speciesId : number | string | null ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type               : "SET_CURRENT_SPECIES_ID" ,
                    current_Species_Id : speciesId
                }) ;

            } ;

} ;

// # 設定 _ 目前 : 寵物
export const set_Current_Pet = ( pet : any ) => {

    return ( dispatch : Dispatch ) => {

             dispatch({
                type        : "SET_CURRENT_PET" ,
                current_Pet : pet
             }) ;

          } ;

} ;



// # 設定 _ 目前寵物編號
export const set_Current_Pet_Serial = ( serial : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type               : "SET_CURRENT_PET_SERIAL" ,
                    current_Pet_Serial : serial
                }) ;

            } ;

} ;




// 將寵物所有狀態，設回 _ 初始值
export const set_Pet_States_To_Default = (  ) => {

    return ( dispatch : Dispatch ) => {

             dispatch({ type : "SET_PET_STATES_TO_DEFAULT" }) ;

           } ;

} ;











