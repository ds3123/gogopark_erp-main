/* eslint-disable react/jsx-pascal-case */
import { useState , createRef } from 'react' ;

import Service_Tag_1 from '../Service_Tag_1';
import Service_Tag_2 from '../Service_Tag_2';
import Service_Tag_3 from '../Service_Tag_3';
import Service_Tag_4 from '../Service_Tag_4';
import Service_Tag_5 from '../Service_Tag_5';

// import Pdf from 'react-to-pdf'
import { useReactToPrint } from 'react-to-print'


// 顯示 _ 目前所點選的列印聯內容
export const useEffect_Show_Current_Tag = (  ) => {


     // 顯示 _ 目前所點選的列印聯內容
     const show_Current_Tag = ( current_Tag : number , service : any ) : JSX.Element | null => {

        switch( current_Tag ) { 
  
           case 1 : return <Service_Tag_1 data = { service } />
           case 2 : return <Service_Tag_2 data = { service } />
           case 3 : return <Service_Tag_3 data = { service } />
           case 4 : return <Service_Tag_4 data = { service } />
           case 5 : return <Service_Tag_5 data = { service } />
  
           default : return null ;
  
        }
   
     } 

     return show_Current_Tag

} ;


// 點選 _ 列印單據 ( 出單機 )
export const useEffect_Click_Print = () => {


   const ref = createRef() ;


   // 列印尺寸
   const [ length , set_Length ] = useState({ width: 70 , height: 180 }) ;


   // 點選 _ 列印
   const click_Print = useReactToPrint({

      pageStyle : `@media print {
                                  @page {
                                          size   : ${ length.width }mm ${ length.height }mm ;
                                          margin : 0 ;
                                          
                                         } 
                                }`,
      content   : () : any => ref.current,
      
     // onAfterPrint : () => handleResetPrint()

   }) ;

   return { ref , click_Print }

} ;