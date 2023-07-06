
import { useState , useEffect } from 'react' ;


export const Click_Count = () => {

    const [ count , setCount ] = useState( 0 ) 

    const click_Btn = () => setCount( count + 1 ) ;


    return <div data-test="component-app">  
 
               <h1 data-test="counter-display" > 
                    目前計數 : <span data-test="count">{ count }</span>  
               </h1>  
 
               <button data-test="increment-button" onClick={ click_Btn }> 加一 </button>
  
           </div>

} ;
