/* eslint-disable jsx-a11y/aria-role */


type Relatives = {

    current                    : string | undefined ;     // 目前所在新增標籤
    Current_Customer_Relatives : any[] ;                  // 客戶已新增關係人
  
    click_Relatives_Btn        : ( data : any ) => void ; // 點選 _ 關係人列表按鈕 

}


// @ 顯示 _ 該客戶 : 已新增關係人
const Show_Customer_Relatives_Row = ( { current , Current_Customer_Relatives , click_Relatives_Btn } : Relatives ) => {

    const rel = { display:"inline-block" , width:"80%" , height:"40px" , overflow : "hidden" , top:"15px" }

    return <>
                { 
                    
                    ( current && Current_Customer_Relatives.length > 0 ) && 

                            <span data-testid="relatives-row" className="relative" style={ rel }>

                                {
                                    
                                    Current_Customer_Relatives.map( ( x : any , y : number ) => (

                                         <b key={y} role="relativeButton" className="tag is-medium m_Right_20 pointer" onClick = { () => click_Relatives_Btn( x ) } > 

                                                            { x['name'] } 
                                                            
                                                            { ( x['tag'] && x['tag'] !== "請選擇" ) &&  <> ( { x['tag'] } / { x['type'] } )  </>  }
                                                            
                                         </b>    

                                    ))

                                }   
                                
                            </span>
            
                }
                
            </>

} ;


export default Show_Customer_Relatives_Row
       