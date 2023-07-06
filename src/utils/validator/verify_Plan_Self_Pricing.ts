

// 自訂方案 : 驗證 _ 自行定價條件
export const verify_Plan_Self_Pricing = ( bath_Num : number , beauty_Num : number , plan_Price : number  , data : any ) => {

    let bath_Amount   = 0 ;
    let beauty_Amount = 0 ;
   
    let bathArr       = [] ;
    let beautyArr     = [] ;

    let Flag          = true ;

    // 洗澡
    if( bath_Num > 0 ){

        for( let i = 1 ; i<= bath_Num ; i++  ){

            // 未填入價格檢查
            if( !data[ 'plan_bath_price_' + i ] ){
                alert( `「洗澡」第 ${ i } 個價格，尚未填入。` ) ; 
                Flag = false 
                return false
            } 

            bathArr.push( data[ 'plan_bath_price_' + i ] ) ;         // 放入各個價格
            bath_Amount += Number( data[ 'plan_bath_price_' + i ] ) ; // 加總洗澡金額

        }

    }

    // 美容 
    if( beauty_Num > 0 ){

        for( let i = 1 ; i<= beauty_Num ; i++  ){

            // 未填入價格檢查
            if( !data[ 'plan_beauty_price_' + i ] ){
                alert( `「美容」第 ${ i } 個價格，尚未填入。` ) ; 
                Flag = false 
                return false
            } 

            beautyArr.push( data[ 'plan_beauty_price_' + i ] ) ;          // 放入各個價格
            beauty_Amount += Number( data[ 'plan_beauty_price_' + i ] ) ; // 加總美容金額 

        }

    }


    // # 檢查 _ 金額分配，是否符合方案預設價格 
    if( plan_Price > ( bath_Amount + beauty_Amount ) ){
        alert( `尚有未分配金額 : ${ plan_Price - ( bath_Amount + beauty_Amount ) } 元` ) ;
        Flag = false
        return false
    }

    if( plan_Price < ( bath_Amount + beauty_Amount ) ){
        alert( `分配價格總和，"超過" 預設價格 : ${ ( bath_Amount + beauty_Amount ) - plan_Price } 元` ) ;
        Flag = false 
        return false
    }


    return Flag ? { bathArr , beautyArr } : false ;

} ;
