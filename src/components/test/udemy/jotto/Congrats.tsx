
 /*
 
      # 元件 : 恭賀訊息
 
      @ function
      @ param { boolean } props - is_Success ( boolean )
      @ return { JSX.Element }  - 如果屬性 is_Success 為 false ，回傳 null )

 */


export const Congrats = ( { is_Success } : { is_Success : boolean }  ) => {
                      
    if( is_Success ) return <div className="m_Bottom_30" data-test="component-congrats" >

                                <div data-test="congrat-message" >恭喜 ! 猜對了</div>

                            </div>

    return <div data-test="component-congrats"></div>

} ;