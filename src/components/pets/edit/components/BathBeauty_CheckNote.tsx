import { FC } from 'react' ;
import { useAccount_Shop_Id } from 'hooks/data/useAccount';
import { useFetch_Shop_BathBeauty_CheckNotes } from "hooks/react-query/service/useFetchServices" ;


type Note = {

    register : any

}


// @ 寵物 _ 洗澡美容備註：checkbox
const BathBeauty_CheckNote : FC< Note > = ( { register } ) => {


    // 店家 id  
    const shopId = useAccount_Shop_Id() ;


    // 取得 _ 所有新增標籤
    const data = useFetch_Shop_BathBeauty_CheckNotes( shopId ) ;



    return <div className = "columns is-multiline is-mobile relative" style = {{ left : "15px" }} > 

               {
                  data?.map( ( x , y ) => <div className = 'column is-2-desktop' key = { y } > 
                                             <input type = "checkbox" value = { x?.text } { ...register( "checkNote_BathBeauty" )} className = "m_Right_5" /> 
                                             { x?.text  } 
                                          </div> )
               }

           </div>

} ;

export default BathBeauty_CheckNote
       