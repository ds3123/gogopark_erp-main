
import { useState } from 'react' ;
import { useSelector } from 'react-redux';





type Input = {
    secreteWord : string ;
}



export const Input = ( { secreteWord } : Input ) => {


    const [ currentGuess , set_CurrentGuess ] = useState( "" ) ;


    const is_Success = true
    


    if( is_Success ) return <div data-test = "content-input" />


    return <form>

              <input type     = "text" 
                     value    = { currentGuess }
                     onChange = { e => set_CurrentGuess( e.target.value ) } 
            
              />   

              &nbsp;

              <button> 點選 </button>    
         

           </form>


} ;