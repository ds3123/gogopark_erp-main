 /*
 
      # 元件 : 猜測文字列表
 
      @ function
      @ param { boolean } props - 
      @ return { JSX.Element }  - 

 */


type Words = {
               guessWord        : string ;   // 使用者所輸入猜測文字  
               letterMatchCount : number ;   // 符合字數
             }

export type Type_GuessWords = {
                                secreteWord : string ;   // 伺服器所提供，用以使用者猜測文字
                                is_Success  : boolean ;  // 是否猜對
                                guessWords  : Words[] ;  
                              }      


export const GuessWords =( { secreteWord , is_Success , guessWords } : Type_GuessWords ) => {


    return <div data-test = "component-guesswords" >
   
                { /* 沒有 _ 輸入猜測文字 */ }  
                { guessWords.length === 0 && 
                    <span data-test = "guess-instruction" > 請輸入文字，猜猜看 </span>
                }
 
                { /* 有 _ 輸入猜測文字 */ }  
                { guessWords.length !== 0 && 
                    <div data-test = "guessed-words" >

                        <h3> 已經猜測文字 </h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> 猜測文字 </th>
                                    <th> 符合字數 </th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                  guessWords.map( 
                                                  ( x , y ) => <tr data-test = "guessed-word-count" key={y} > 
                                                                   <td> { x.guessWord }        </td> 
                                                                   <td> { x.letterMatchCount } </td> 
                                                               </tr> 
                                                )
                               }
                            </tbody>
                        </table>

                    </div>
                }

           </div>

} ;