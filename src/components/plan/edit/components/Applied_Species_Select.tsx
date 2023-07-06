/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch } from "react-redux";
import { set_Current_Species_Select_Id } from "store/actions/action_Pet"
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;
import { useEffect_Species_Select_Options } from "../../hooks/useEffect_Applied_Species_Select" ;



// @ 寵物品種 ( 下拉選單 for 方案所要套用的品種 )
const Applied_Species_Select = ( ) => {

    
     const dispatch = useDispatch() ;

     // 取得 context 值 : React Hook Form 屬性 
     const { register , errors , editType , serviceData } = useReact_Hook_Form_Context() ;         


     // 取得 _ 目前所選擇 : 方案類型 ( 下拉選單 )，所對應的寵物品種下拉選項
     const species_Options = useEffect_Species_Select_Options() ;



    return <>

                { /* for 新增 */ }
                { editType === '編輯' ||

                    <div className="column is-3-desktop">

                        <p> <b> 寵物品種 </b> &nbsp; <b style={{ color: "red" }} > { errors.plan_Pet_Species?.message } </b> </p>

                        <div className="select">

                            <select { ...register("plan_Pet_Species") } onChange={ e => dispatch( set_Current_Species_Select_Id( e.target.value ) )   }>

                                <option value="請選擇"> 請選擇 </option>

                                { 

                                   species_Options.map( ( x , y ) => { 
                                   
                                      return <option value={ x['id'] } key={ y }> { x['serial'] } _ { x['name'] ? x['name'] : '' } </option>
                                   
                                   } ) 
                                   
                                }
                          
                            </select>

                        </div>

                    </div>

                }

                { /* for 編輯 */ }
                { 
                    editType === '編輯' &&  
                            <div className="column is-3-desktop f_14"> 寵物品種 : 
                                <b className="fDblue"> { serviceData.pet ? serviceData.pet.species :  <span className="fRed"> 已刪除 </span>  }  </b> 
                            </div>  
                }


            </>



} ;


export default Applied_Species_Select
       



