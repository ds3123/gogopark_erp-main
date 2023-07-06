


/* @ 搜尋  */
interface ISearch {

    iS_Csutomer_Relative_Info : string | '' ;

}

const initState = {

    iS_Csutomer_Relative_Info : '' ,  

} ;


const reducer_Search = ( state : ISearch = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 為客戶關係人相關資訊
        case  "SET_IS_CUSTOMER_RELATIVES_INFO" : return { ...state , iS_Csutomer_Relative_Info : action.iS_Csutomer_Relative_Info } ;
        
        default : return state ;

    }

} ;

export default reducer_Search ;
