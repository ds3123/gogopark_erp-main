import useCreate_Custom_Plan_Context from "../contexts/createCustomPlanContext"


type columnType = {
    filter_Data              : any[] ;
}


// 資料欄位
const Data_Column = ( { filter_Data } : columnType ) => {

   const { 
           plan_Applied_Species ,        // 新增方案，所套用的寵物品種 
           set_Plan_Applied_Species      // 設定 _ 新增方案，所套用的寵物品種 
         } = useCreate_Custom_Plan_Context();  
    

    // 點選 _ 寵物項目 
    const click_Speices_Item = ( species : any ) => {
    
       const fResult = plan_Applied_Species.filter( ( x : any ) => x['name'] === species['name'] ) ;
 
       if( fResult.length > 0 ){   // 有 --> 取消選取 ( 再點一次 )
 
         const _fResult = plan_Applied_Species.filter( ( x : any ) => x['name'] !== species['name'] ) ;
 
         set_Plan_Applied_Species( _fResult ) ;
 
     
       }else{                      // 沒有 --> 加入選取
 
         set_Plan_Applied_Species( [ ...plan_Applied_Species , species ] );
 
       }
 
    }  
 
 
    return  <div className="column is-2-desktop">
 
                {
                   filter_Data.map( ( x:any , y:number ) => {
 
                     const fResult    = plan_Applied_Species.filter( ( _x : any ) => _x['name'] === x['name']  )
                     const is_Clicked = fResult.length > 0 ? true : false ;
 
                     return <b key={y} className={`tag is-medium m_Right_20 m_Bottom_10 pointer ${ is_Clicked ? "is-success" : ""  }`}  
                               onClick={ () => click_Speices_Item( x ) } > 
                                  <span className="tag is-white is-rounded"> { x['serial'] } </span> &nbsp;  { x['name'] } 
                             </b>     
 
                   })
 
                }
    
             </div>   
 
 } ;
 

export default Data_Column
       