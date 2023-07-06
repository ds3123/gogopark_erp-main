/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-lone-blocks */

import is_Dead_Pic from 'imgs/is_dead_red.png'
import { get_Pet_Age } from 'utils/time/date'
import { usePet_Update_Panel } from "hooks/data/usePet" ;
import { useAccount_Shop_Id } from 'hooks/data/useAccount';




// 回傳 _ 寵物按鈕 ( 無、1隻、多隻 )
const usePet_Button = ( pets : any[] ) => {

    // 所屬店家 id
    const shop_Id = useAccount_Shop_Id();



    // 點選 : 寵物 ( 顯示右側滑動寵物資訊面板 )
    const click_Pet = usePet_Update_Panel() ;
    
    let pet_Button = [] as any[] ;


    // 1 隻 ( 顯示 : 名字、品種、 )
    if( pets.length === 1 ){

        pet_Button = pets.map( ( x , y ) => {

            if( !x ) return null ;

            // 如果寵物所屬店家 id ，不符合目前使用者所屬店家 id --> 不顯示
            if( shop_Id !== x.account_id ) return false ;

            { /* 年齡標示 */ }
            const birtyday_Str =  x?.birthday ? get_Pet_Age( x?.birthday ) : '' ;

            let btStyle   = 'is-white' ;
            let fontColor = { color : "rgb(0,0,150)" }

            if( parseInt( birtyday_Str.slice( 0 , 2 ) ) > 12 || birtyday_Str === '未滿週歲' ){
                btStyle   = 'is-danger' ;
                fontColor = { color : 'white' } ;
            } 


            return  <span key       = { y }
                          className = "tag is-medium relative pointer"
                          style     = { { paddingTop : "4px" } }
                          onClick   = { () => click_Pet( x ) } >

                
                        { /* 死亡標示 */ }
                        { x?.is_dead === 1 && 
                            <b className="fRed absolute" style={{ left : "-15px" , top : "-11px" }}> 
                                <img src={is_Dead_Pic}  width='30px'/>
                            </b>
                        }


                        { /* 拒接標示 */ }
                        { ( x?.is_dead !== 1 && x?.is_rejected === 1 ) && 
                            <b className="fRed absolute" style={{ left : "-8px" , top : "5px" }}> 
                                <i className="fas fa-ban"></i> 
                            </b>
                        }

                       <b> { x["name"] } ( { x["species"] } ) &nbsp;

                           { ( x["sex"] && x["sex"] !== '請選擇' ) && <>
                                                                       <b className="tag is-rounded is-white" style={{  color : "rgb(0,0,150)" }}>
                                                                           { x["sex"] }
                                                                       </b>  &nbsp;
                                                                     </>
                           }

                           
                           { x["color"] && <>
                                                <b className="tag is-rounded is-white" style={{ color: "rgb(0,0,150)"}}>
                                                    {x["color"]}
                                                </b>   &nbsp;
                                           </>
                           }

                            { /* { x["age"] && <> */ }
                            { birtyday_Str && <>
                                                <b className={ `tag is-rounded ${ btStyle }` } style={ fontColor }>
                                                        {/* { x["age"] } 歲 */}
                                                        { birtyday_Str }
                                                </b> &nbsp;
                                              </>
                           }

                       </b>

                    </span> ;

        }) ;

    }

    // 多隻 ( 僅顯示名字 )
    if( pets.length > 1 ){

        pet_Button = pets.map( ( x , y ) => {

            const birtyday_Str = x?.birthday ? get_Pet_Age( x?.birthday ) : '' ;

            let btStyle   = 'is-white' ;
            let fontColor = { color : "rgb(0,0,150)" } ;

            if( parseInt( birtyday_Str.slice( 0 , 2 ) ) > 12 || birtyday_Str === '未滿週歲' ){

                btStyle   = 'is-danger' ;
                fontColor = { color : 'white' } ;

            } 

            // 如果寵物所屬店家 id ，不符合目前使用者所屬店家 id --> 不顯示
            if( shop_Id !== x.account_id ) return false ;


            // 有多隻寵物，僅顯示名字
            return  <span key       = { y }
                          className = "tag is-medium relative m_Right_20 m_Bottom_10 pointer"
                          style     = {{ paddingTop : "4px" }}
                          onClick   = { () => click_Pet( x )  } >

                          <b className="relative"> 

                                { /* 死亡標示 */ }
                                { x?.is_dead === 1 && 
                                     <b className="fRed absolute" style={{ left : "-20px" , top : "-20px"  }}> 
                                        <img src={is_Dead_Pic}  width='30px'/>
                                     </b>
                                }

                                { /* 拒接標示 */ }
                                { ( x?.is_dead !== 1 && x?.is_rejected === 1 ) && 
                                    <b className="fRed absolute" style={{ left : "-20px" , top : "0px" }}> 
                                        <i className="fas fa-ban"></i> 
                                    </b>
                                }

                                { /* 寵物名字 */ } 
                                { x['name'] } &nbsp;

                                { /* 年齡標示 */ } 
                                { birtyday_Str && <b className={ `tag is-rounded ${ btStyle }`  } style={ fontColor }>
                                                   { birtyday_Str }
                                                </b>  }    
                              
                          </b>

                    </span> ;

        }) ;

    }

    return pet_Button ;

} ;

export default usePet_Button

