


import { toast } from "react-toastify" ;


// @ Toast 套件通知
export const Toast = ( info : string , config? : any ) => {

    const _config = config ? config : { position: "top-left", autoClose: 1500, hideProgressBar: false, closeOnClick: true } ;

    toast( `🦄 ${ info }`, _config );

} ;
