


/* @ 使用者操作紀錄  */
interface ILog {

  

}

const initState = {



} ;


const reducer_Log = ( state : ILog = initState , action : any ) => {


    switch( action.type ){

        //case  "SET_BASIC_SUM_PRICE" : return { ...state , Basic_Sum_Price : action.price } ;
       
        default : return state ;

    }


} ;

export default reducer_Log ;
