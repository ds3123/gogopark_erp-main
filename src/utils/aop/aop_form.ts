
/*

   @ 裝飾模式 ( AOP )

     # 多層 _ 添加功能 

*/


// 之前   
export const before = ( fn : any , beforefn : any ) => ( ...args : any[] ) => {

    // 先執行 _ 新函式 ( Ex. 表單驗證 ) -> 如果回傳 false，就不再往後執行 
    if( beforefn.apply( this , args ) === false ) return ;

    // 再執行 _ 原函式 ( Ex. 表單提交 )，並回傳結果
    return fn.apply( this , args ) ;

}

// 之後
export const after = ( fn : any , afterfn : any ) => ( ...args : any[] ) => {

    // 執行 _ 原函式
    const ret = fn.apply( this , args ) ;
                         
    // 執行 _ 新函式 ( 在原函式之後才執行 )
    afterfn.apply( this , args ) ;

    // 回傳 _ 原函式執行結果
    return ret ;

}



    