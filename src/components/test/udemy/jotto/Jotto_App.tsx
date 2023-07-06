
import { Congrats } from './Congrats';
import { GuessWords } from './GuessWords';
import { Input } from './Input';
import { useEffect } from 'react' ;
import { get_SecreteWord } from "../actions/action_Index" ;
import { useSelector , useDispatch } from 'react-redux';


export const Jotto_App = () => { 

    const dispatch   = useDispatch();

    const secretWord = useSelector( ( state : any ) => state.GuessWord.secretWord ) ;
    const is_Success = useSelector( ( state : any ) => state.GuessWord.is_Success ) ;
    const guessWords = useSelector( ( state : any ) => state.GuessWord.guessedWords ) ;
   

    useEffect( () => {
      
       // 從伺服器取得猜測文字 ( Ajax ) 

       dispatch( get_SecreteWord() ) ;

       // get_SecreteWord()
       
    } , [] ) ;
            
  return <div data-test="component-jotto-app" > 

              <div className="m_Bottom_30 f_16"> <b> Jotto </b> </div>
 
              <div> 猜測數字為 : { secretWord } </div>

              <Congrats is_Success = { is_Success }/>
              <Input is_Success = { is_Success } secreteWord = { secretWord } />
              <GuessWords secreteWord = { secretWord } is_Success = { is_Success } guessWords = { guessWords } />

          </div>

} 


