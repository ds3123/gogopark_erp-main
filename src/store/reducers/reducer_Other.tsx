

/* @ 其他收支資料  */
interface IOther {

    others_Income_Total      : number ; // "收入" 總計
    others_Expenditure_Total : number ; // "支出" 總計

}

const initState = {

    others_Income_Total      : 0 ,
    others_Expenditure_Total : 0 
   
} ;


const reducer_Other = ( state : IOther = initState , action : any ) => {

    switch( action.type ){

        
        // # 設定 _ 其他 "收入" 總計金額 
        case  "SET_OTHERS_INCOME_TOTAL" : return { ...state , others_Income_Total : action.others_Income_Total } ;
       
        // # 設定 _ 其他 "支出" 總計金額 
        case  "SET_OTHERS_EXPENDITURE_TOTAL" : return { ...state , others_Expenditure_Total : action.others_Expenditure_Total } ;
        
        default : return state ;

    }

} ;

export default reducer_Other ;
