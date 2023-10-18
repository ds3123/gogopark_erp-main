/* eslint-disable @typescript-eslint/no-unused-vars */


import { useSelector } from "react-redux"


type Title_Bar = {
    tag_Color        : string ; 
    service_Type     : string ;
    amount_Type      : string ;
    amount_Total     : number ;
    Folding_Bt_Type  : any    ;
}




// @ 各區塊標題
const Section_Title_Bar = ( { tag_Color , service_Type , amount_Type , amount_Total , Folding_Bt_Type  } : Title_Bar ) => {


    let amount_Color = '' ;
    if( amount_Type === '扣 _ 預收款' ) amount_Color = 'fGreen' ;
    if( amount_Type === '支 出' ) amount_Color = 'fBlue' ;
    if( amount_Type !== '扣 _ 預收款' && amount_Type !== '支 出' ) amount_Color = 'fRed' ;



    return <div className = 'columns is-multiline is-mobile' >

                <div className = 'column is-9-desktop' >
                    
                    <b className={ 'tag is-large is-light ' + tag_Color }> { service_Type } :&nbsp;<span className="fBlue"> { amount_Type } </span>  </b>
                
                </div>

                <div className = 'column is-3-desktop' >

                    { /* 先隱藏扣_預收款的小計 */ }
                    { ( (  amount_Total >= 0  ) && amount_Type !== '扣 _ 預收款' ) &&
                        <b className = 'tag is-large is-white' > 小計 :&nbsp;<span className= { amount_Color } > { amount_Total } </span>&nbsp;元  </b>
                    } 
                        
                    { Folding_Bt_Type }

                </div>
    
          </div> 


} ;

export default Section_Title_Bar
       