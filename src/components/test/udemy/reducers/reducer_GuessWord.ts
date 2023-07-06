
import { action_Types } from "../actions/action_Success";


// @ 猜測
type Word = {

    guessedWord      : string ;
    letterMatchCount : number ;

}

interface I_GuessedWords {

    secreteWord  : string ;

    is_Success   : boolean ;

    guessedWords : Word[] 

}


const initState : I_GuessedWords = {


    secreteWord  : "" ,

    is_Success   : false ,

    guessedWords : []

}



export const reducer_GuessWord = ( state : I_GuessedWords = initState , action : any ) => {

    switch( action.type ){

        case action_Types.GUESS_WORD :
               return { ...state , secreteWord : action.secreteWord , guessedWords : action.guessedWords } ;

        case action_Types.CORRECT_GUESS :
               return { ...state , is_Success : true }     
               
        
        case action_Types.SET_SECRET_WORD :
               return { ...state , secreteWord : action.payload }           



        default :
                  return state ;

    
    }



} ;