
import { is_Object } from "fp/state" ;
import { s } from "msw/lib/glossary-c690f512";



// 自訂 _ 組合函式 ( 由左至右 )
export const compose = ( ...fns : any[] ) => ( data : any ) => fns.reduce( ( a_data , fn ) => fn( a_data ) , data ) ;


// 新增 _ 物件 : 屬性 & 值 < T >
export const append_Obj = ( key : string , value : any ) => {

    return ( obj : any ) => {

              return is_Object( obj ) ? { ...obj , [ key ] : value } : {}

           }

}  ;


// 執行 _ 所接收的函式
export const take_Action = ( fn : any ) => { 
    
      fn() ; 

      return fn() ; // 回傳 _ 執行結果 
    
} ;


//  執行 _ callback 函式
export const dispatch = ( fn : any ) => () => { fn() ; } ;


// console 顯示 _ 輸入訊息
export const log = ( msg : string ) => console.log( msg ) ;



// # 排序 _ 依照 : 物件屬性 ( objAttr ) 與 新舊方向 ( sortDirection ) < T >
export const sort_ObjAttr = ( objAttr : string , sortDirection : 'asc' | 'desc' ) => 

                              ( data : any[] ) => {

                                    if( sortDirection === 'desc' ){

                                        return data.sort( ( a : any , b : any ) => a[ objAttr ] < b[ objAttr ] ? 1 : -1  )

                                    }else{

                                        return data.sort( ( a : any , b : any ) => a[ objAttr ] > b[ objAttr ] ? 1 : -1  )  

                                    }

                              } 





