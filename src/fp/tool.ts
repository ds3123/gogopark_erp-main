
import { is_Object } from "fp/state" ;



// 自訂 _ 組合函式 ( 由左至右 )
export const compose = ( ...fns : any[] ) => ( arg : any ) => fns.reduce( ( composed , fn ) => fn( composed ) , arg ) ;


// 新增 _ 物件 : 屬性 & 值 < T >
export const append_Obj = ( key : string , value : any ) => {

    return ( obj : any ) => {

              return is_Object( obj ) ? { ...obj , [ key ] : value } : {}

           }

}  ;

