import { spawn } from "child_process";


type Sign = {

    is_error       : number ;
    is_delete      : number ;
    amount_payable : number ;
    amount_paid    : number ;
    is_return      : number ;
    return_status  : string ;
    extra_fee      : any[] ;

}


// @ 洗美服務列 : 服務相關標示 ( 異常、銷單、是否付費、申請退費 )
const Service_Sign = ( { is_error , is_delete , amount_paid , amount_payable , is_return , return_status , extra_fee } : Sign ) => {


   const tag = { top : "-7px", left : "5px" , color : "red" } ; 
   

   // 是否付費
   const is_Unpaid = ( amount_payable !== null && amount_paid !== null ) && amount_payable !== amount_paid ;


   // 篩選出 _ 未被刪除的加價單
   const extraFee_Not_Deleted = extra_fee.filter( x => x?.is_delete === 0 ) ;


   return <>

                { /* 異常 */ }
                 <b className="absolute" style={ { top:"-7px", left:"0px" , color:"red" } }>
                     { is_error === 1 &&  <i className="fas fa-exclamation-triangle"></i> }
                 </b>

                 { /* 銷單 */ }
                 <b className="absolute" style={ tag }>
                     { is_delete === 1 &&  <i className="fas fa-trash-alt"></i> }
                 </b>

                 { /* 是否付費( 應付金額 !== 實付金額 ) */ }
                 <b className="absolute f_14" style={{ top:"17px", left:"8px" , color:"red" }}>
                     { is_Unpaid  &&  <i className="fas fa-dollar-sign"></i> }
                 </b> 

                 { /* 是否有加價單  */ }
                 <b className="absolute f_9" style={ { top:"-9px", right:"-3px" } }>
                     { extraFee_Not_Deleted?.length > 0 &&  <span className="fRed">  加價單 ( { extraFee_Not_Deleted?.length } )  </span> }
                 </b>


                 { /* 申請退費標示  */ }
                 {/* <b className="absolute f_9" style={{top:"-10px", left:"-25px" , color:"red"}}>
                     { ( is_return === 1 && return_status ) && <span> { return_status }  </span> }
                 </b> */}
  
          </>

} ;

export default Service_Sign
       