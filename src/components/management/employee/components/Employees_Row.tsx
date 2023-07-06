import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Employee from "components/management/employee/edit/Update_Employee";


type Employeee = {

    data : any ;
    tag  : any ;

}


const Employees_Row = ( { data , tag } : Employeee ) => {

     const dispatch = useDispatch() ; 

     // 點選 _ 服務單
     const click_Type = ( employee : any ) => dispatch( set_Side_Panel( true , <Update_Employee /> , { preLoadData : employee } ) ) ;


    return <tr>

                <td> 

                      { data?.shop_account?.shop_name }&nbsp;
                      ( { data?.shop_account?.account_id }  )

                </td>
                <td>
                    <span className={ `tag is-medium ${ tag } is-light pointer` }  onClick={ () => click_Type( data ) }>
                        { data['employee_type'] === '測試帳號' ? '店長帳號' : data['employee_type'] }
                    </span>
                </td>
                <td> { data['account'] }                                   </td>
                <td> { data['password'] }                                  </td>
                <td> { data['employee_name'] }                             </td>
                <td> { data['salary_type'] }                               </td>
                <td> { data['position_type'] }                             </td>
                <td className="td_Left"> { data['employee_id'] }           </td>
                <td className="td_Left"> { data['employee_mobile_phone'] } </td>
                <td> { data['nickname'] }                                  </td>
                <td className="td_Left"> { data['employee_address'] }      </td>
                <td> <i className="fas fa-download pointer"></i>           </td>

           </tr>

} ;


export default Employees_Row
       