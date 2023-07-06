import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";


type Account = {


    account_id : string ;
    county     : string ;
    district   : string ;
    zipcode    : string ;
    shop_brand : string ;
    shop_num   : string ;
    shop_name  : string ;
    shop_owner : string ;
    account    : string ;
    password   : string ;
    auth_level : string ;

}


const Account_Rows = ( { data } : { data : Account } ) => {


    const dispatch = useDispatch() ;


    // 點選 _ 店 名
    const click_Shop_Name = () => dispatch( set_Side_Panel( true , null , {} ) ) ;


   return <tr>

             <td className="td_Left">  
                <b className="tag is-medium pointer" onClick = { () => click_Shop_Name() } >  
                    { data.shop_name } ( { data.account_id  } )
                </b>  
             </td>   
             <td> { data.county  }     </td> 
             <td> { data.district }  <span className="f_10"> ( { data.zipcode } ) </span> </td> 
             <td> { data.shop_num  }    </td> 
             <td className="td_Left"> { data.shop_brand }   </td> 
             <td> { data.shop_owner  }      </td> 
             {/* 

             <td className="td_Left"> { data.account  } </td> 
             <td className="td_Left"> { data.password } </td> 
             <td>  </td>
             <td>  </td>
             <td>  </td>
             <td>  </td>
             <td> { data.auth_level } </td>  

             */}
            
     
          </tr> 

} ;

export default Account_Rows
       