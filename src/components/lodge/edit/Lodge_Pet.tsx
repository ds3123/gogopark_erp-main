/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-pascal-case */


import { FC , useState } from 'react' ;
import { useDispatch } from "react-redux" ;
import Pet_Buttom_Sign from 'components/pets/edit/info/components/Pet_Button_Sign' ; 
import { get_Pet_AgeDescription } from 'utils/time/date' ;
import { set_Lodge_Together_Amount } from "store/actions/action_Extra_Service_Fee" ;
import { useEffect_Pet_Options , useEffect_Selected_Pets , useEffect_Insert_SelectedPets } from "../hooks/useEffect_Lodge_Pet" ;
import is_Dead_Pic from 'imgs/is_dead_red.png' ;


type Pet = {

  editType     : string | undefined ; 
  register     : any ;
  setValue     : any ;
  serviceData? : any ; // 編輯資料

}

type Create_Together = {

    register : any ;
    setValue : any ;

}

type Update_Together = {

    serviceData : any ;

}



// 新增 _ 同住寵物
const Create_Lodge_Together_Pet : FC< Create_Together > = ( { register , setValue } ) => {


    const dispatch = useDispatch() ;


    // 是否顯示
    const [ is_On , set_Is_ON ] = useState< boolean >( false ) ;

    // 取得 _ 目前所點選住宿寵物、可供同住寵物選項
    const { current_Pet , pet_Options } = useEffect_Pet_Options() ;


    // 取得 _ 所選擇同住寵物 
    const { selected_Pets , click_Pet } = useEffect_Selected_Pets( setValue ) ;
    

    // 將所選擇寵物資料，輸入 input 欄位：lodge_Together_Pets
    useEffect_Insert_SelectedPets( pet_Options , selected_Pets , setValue ) ;


    // 若未先點選 _ 目前住宿寵物 -> 不顯示
    if( !current_Pet ) return <></> ;

    // 僅 1 隻寵物，沒有同住寵物可供選擇 -> 不顯示
    if( pet_Options?.length === 0 ) return <></> ;


    return <>
 
                { /* 標籤 */ }
                <b className = { `tag is-medium is-warning ${ is_On ? "" : "is-light" } relative p_20 pointer m_Right_20` } onClick = { () => set_Is_ON( !is_On ) } >  
                
                    <i className = "fas fa-dog" ></i>&nbsp; 和 &nbsp; <span className = "fBlue" > { current_Pet?.name } ( { current_Pet?.species } ) </span> &nbsp; 同住寵物 &nbsp;&nbsp;

                    { /* 輸入價格 */ }
                    { selected_Pets.length > 0 &&

                        <>
                        
                            { /* 同住寵物 */ }
                            <input type      = "hidden" { ...register( "lodge_Together_Pets" ) }  />

                            { /* 同住費用 */ }
                            <input className = "input" type = "number" { ...register( "lodge_Together_Fee" ) } min = "0" style = {{ width : "100px" , height : "32px" }} 
                                    onClick  = { e => e.stopPropagation() } 
                                    onChange = { e => dispatch( set_Lodge_Together_Amount( e.target.value ) ) } /> &nbsp; 元

                        </>

                    }
                
                </b>   

                { /* 可同住 _ 寵物選項 : 1 隻以上 */ }
                { is_On && pet_Options.map( ( x : any , y : number ) => { 

                    // 取得 _ 寵物年齡描述
                    const { is_Careful_Pet , petAge_Str } = get_Pet_AgeDescription( x ) ;

                    return <span key = { y } className = "relative" onClick = { () => click_Pet( x ) } > 

                        
                                <b className = {  `tag ${ selected_Pets.includes( x?.pet_id ) ? "is-primary" : "" } is-medium is-rounded m_Right_15 m_Bottom_40 pointer relative` }  > 

                                    { /* 標示 ( 拒接、已死亡、有方案 ) */ }
                                    <span className = "absolute" style = {{ left : "5px" , top: "-27px" }} >

                                        { /* 拒接 */ } 
                                        { x?.is_rejected === 1 && <i className = "fas fa-ban fRed m_Right_10 f_13"  ></i>  }
                                        
                                        { /* 已經過世 */ }
                                        { x?.is_dead === 1 && <img className = "relative" src={ is_Dead_Pic } width='28px'  /> }

                                    </span>

                                    
                                    { x?.name } ( { x?.species } ) &nbsp;
                                    
                                    { is_Careful_Pet && <b className = "tag is-danger is-rounded"> { petAge_Str } </b> }
                                
                                </b>
                    
                            </span> 

                }) }

           </>

} ;

// 編輯 _ 同住寵物
const Updge_Lodge_Together_Pet : FC< Update_Together > = ( { serviceData } ) => {


    // 同住寵物 ( 編輯 )
    const edit_Together_Pets = serviceData?.together_pets ? ( serviceData?.together_pets ).split( ',' ) : [] ;

    return <>

                <b className = "tag is-large is-warning is-light" > 
                    <i className="fas fa-dog"></i>&nbsp; 同住費
                    <span className = "tag is-white m_Left_10 m_Right_10 fRed f_12 is-rounded" > { serviceData?.together_price }  </span> 元
                </b>

                { /* 同處寵物 */ }
                { edit_Together_Pets?.length > 0  && edit_Together_Pets?.map( ( x : any ,y : number ) => 
                    <b key = { y } className = "tag is-medium m_Left_20" > { x } </b> ) 
                }

             </>

} ;



// @ 同住寵物
const Lodge_Pet : FC< Pet > = ( { register , setValue , editType , serviceData } ) => {


    return  <div className = "columns is-multiline is-mobile m_Top_30" >
 
                <div className = "column is-12-desktop" >

                   { /* 新增 */ }
                   { !editType && <Create_Lodge_Together_Pet register = { register } setValue = { setValue } /> }
                   
                   { /* 編輯 */ }
                   { editType &&  <Updge_Lodge_Together_Pet serviceData = { serviceData } />  }

                </div>   
              
            </div>


} ;

export default Lodge_Pet
       