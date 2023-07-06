/* eslint-disable react/jsx-pascal-case */

import { useState , useEffect } from "react" ;
import Data_Column from "./Data_Column";
import useCreate_Custom_Plan_Context from "../contexts/createCustomPlanContext"


const sBox = {
  height:"auto",
  padding : "20px 15px 20px 15px" , 
  border:"1px solid rgba(0,0,0,.1)" , 
}

const cAll = {
top:"-33px",
right:"-1px"
}



// @ 品種列表 ( for 選擇方案所要套用的品種 )
const Plan_Applied_Species = ( { species_Data } : { species_Data : any[] } ) => {

   
    // 是否 _ 取消全部選取
    const [ is_Clear_All , set_Is_Clear_All ] = useState( true ) ;   

    const { 
             plan_Applied_Species ,    // 新增方案，所套用的寵物品種 
             set_Plan_Applied_Species  // 設定 _ 新增方案，所套用的寵物品種 
           } = useCreate_Custom_Plan_Context();  


    // 點選 _ 取消全部選取
    const click_Clear_All       = () => {

      const species_Num = species_Data.length ; // 品種總數目

      if( plan_Applied_Species.length === species_Num ){

        set_Is_Clear_All( false ) ;
        set_Plan_Applied_Species( [] ) ;

      }else{

        set_Is_Clear_All( true );
        set_Plan_Applied_Species( species_Data ) ;
  
      }
    
    } 
 
    // 區分欄位
    const species_Section_1 = species_Data.filter( ( x : any , y : number ) => y < 10 )
    const species_Section_2 = species_Data.filter( ( x : any , y : number ) => y > 9 && y < 20 )
    const species_Section_3 = species_Data.filter( ( x : any , y : number ) => y > 19 && y < 30 )
    const species_Section_4 = species_Data.filter( ( x : any , y : number ) => y > 29 && y < 40 )
    const species_Section_5 = species_Data.filter( ( x : any , y : number ) => y > 39 && y < 50 )
    const species_Section_6 = species_Data.filter( ( x : any , y : number ) => y > 49 )
  
    useEffect( () => {

      set_Plan_Applied_Species( [...species_Data] ) ;
      
   } , [ species_Data ] ) ;


   
  
   return <div className="relative m_Top_25 m_Bottom_80 w-full" style={sBox}>

             <b className={ `tag is-medium is-danger ${ is_Clear_All ? "" : "is-light" } absolute pointer` } 
                style={ cAll } onClick={ () => click_Clear_All() }>
               <i className="fas fa-list-alt"></i> &nbsp; 全部{ species_Data.length === plan_Applied_Species.length ? '取消' : '選取' } 
             </b>   

             <div className="columns is-multiline is-mobile">
               
                <Data_Column filter_Data = { species_Section_1 } />  
                <Data_Column filter_Data = { species_Section_2 } />  
                <Data_Column filter_Data = { species_Section_3 } />  
                <Data_Column filter_Data = { species_Section_4 } />  
                <Data_Column filter_Data = { species_Section_5 } />  
                <Data_Column filter_Data = { species_Section_6 } />  

             </div>  

          </div>

} ;

export default Plan_Applied_Species
       