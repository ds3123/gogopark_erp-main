
 

export const reducer_Success = ( state : boolean = false , action : any ) => {

    switch( action.type ){

       case "CORRECT_GUESS" :
             return true 

       default :
             return state 

    }


} ;



