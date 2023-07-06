
import { useState } from "react" ;
import { useSelector , useDispatch } from "react-redux" ;


type Input = {

   secreteWord : string ;
   is_Success  : boolean

}


export const Input = ( { secreteWord , is_Success } : Input ) => { 

  const [ currentGuess , set_CurrentGuess ] = useState( "" ) ;


  // const is_Success = useSelector( ( state : any ) => state.GuessWord.is_Success ) ;



  // 點選 _ 提交鈕
  const click_Submit = ( e : any ) => {
  
      // TODO : update guessWords
      // TODO : check against secretWord and update success if needed

      e.preventDefault() ;

      set_CurrentGuess( "" ) ;

  } ;
  
  return <div data-test = "component-input" >

            { !is_Success &&  
            
                <form>

                    <input type       = "text" 
                            data-test = "input-box" 
                            value     = { currentGuess }
                            onChange  = { e => set_CurrentGuess( e.target.value ) } /> 

                        &nbsp;

                    <button data-test="submit-button" onClick = {  e => click_Submit( e ) } > 提交 </button>
                
                </form>

            }

         </div>

}