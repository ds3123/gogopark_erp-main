
type Column_Input = {

    value : string | number ;  
 
 }

 type Index = "isNotEmpty" | "minLength" | "isMobile" ;

 type Strategy = {

    isNotEmpty : any ;
    minLength  : any ;
    isMobile   : any ;

 }

 type Rule = {

    strategy : Index ;
    errorMsg : string ;

 }

 /*
 
    @ 策略模式應用 : 表單驗證
 
 */


// 表單驗證 _ 規則 ( 策略物件 )
export const strategies : Strategy = {

    // 不能為空
    "isNotEmpty" : ( value : string , errorMsg : string ) => { if( value === "" ) return errorMsg ; } ,

    // 最少字數  ( 目前未使用 )
    "minLength"  : ( value : string , length : number , errorMsg : string ) => { if( value.length < length ) return errorMsg ; } ,

    // 為手機號碼 ( 目前未使用 )
    "isMobile"   : ( value : string , errorMsg : string ) => { if( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){ return errorMsg ; } }
  
} ;


export const Validator = {

    // 存放驗證規則
    cache : [] as any[] ,

    // 添加驗證規格 ( 可新增一個以上規則 )
    add   : function( dom : Column_Input , rules : Rule[] | any[] ){

                var self = this ;

                for( var i = 0 , rule ; rule = rules[ i++ ] ; ){
            
                    ( function( rule ){

                        var strategyAry = rule.strategy ? rule.strategy.split( ':' ) : [] ;
                        var errorMsg    = rule.errorMsg ;

                        // 規則函式
                        const func      = () => {

                                                    const strategy : Index = strategyAry.shift()  ;
                                        
                                                    strategyAry.unshift( dom.value ) ;
                                                    strategyAry.push( errorMsg ) ;

                                                    return strategies[ strategy ]?.apply( dom , strategyAry ) ;
                        
                                                } ;
                        
                        // 加入規則函式
                        self.cache.push( func ) ;  
            
                    })( rule ) ;
            
                }

           } ,

    // 開始驗證（ 若有錯誤，回傳錯誤訊息 ）
    start : function(){

                        for( var i = 0 , validatorFunc ; validatorFunc = this.cache[ i++ ] ; ){

                            var errorMsg = validatorFunc() ;
                    
                            if( errorMsg ) return errorMsg ;
                    
                        }

            } 

}

