/* eslint-disable react/jsx-pascal-case */

import { useSelector } from "react-redux" ; 
import Pet_Buttom_Sign from 'components/pets/edit/info/components/Pet_Button_Sign' ; 
import { get_Pet_AgeDescription } from 'utils/time/date' ;



interface IPet{
   current               : string | undefined ;    // 目前所在位置
   current_Customer_Pets : any[] ;                 // 客戶所有寵物    
   click_Pet_Button      : ( pet : any ) => void ; // 點選 _ 寵物動作      
}


// @ 顯示 _ 客戶所有寵物
const Customer_Pets = ( { current , current_Customer_Pets , click_Pet_Button } : IPet ) => {

    
    // 目前所點選寵物
    const current_Pet = useSelector( ( state : any ) => state.Pet.current_Pet ) ; 


  return <>
            {

              ( current && current_Customer_Pets.length > 0 ) &&

                 current_Customer_Pets.map( ( x : any , y : any ) => {

                     // 取得 _ 寵物年齡描述
                     const { is_Careful_Pet , petAge_Str } = get_Pet_AgeDescription( x ) ;

                     
                    return  <b key       = { y } 
                               onClick   = { () => click_Pet_Button( x ) }  
                               className = { `tag relative is-medium pointer is-rounded m_Bottom_30 m_Right_20 ${ current_Pet?.serial === x?.serial ? 'is-primary' : '' }` }  > 
                                
                               { /* 標示 ( 拒接、已死亡、有方案 ) */ }
                               <Pet_Buttom_Sign pet = { x } />

                               { /* 名字 ( 品種 )  */ }       
                               { x['name'] } ( { x['species'] } ) &nbsp;
                               
                               { is_Careful_Pet && <b className="tag is-danger is-rounded"> { petAge_Str } </b> }

                            </b> 

                })

            }
         </>

} ;

export default Customer_Pets