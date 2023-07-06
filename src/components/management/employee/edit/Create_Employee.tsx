/* eslint-disable react/jsx-pascal-case */

import { Edit_Form_Type } from "utils/Interface_Type";
import Employee_Form from "components/management/employee/edit/Employee_Form";



// @ 新增 _ 員工
const Create_Employee = ( { register , control  , setValue , errors , isDirty, isValid , current } : Edit_Form_Type ) => {


    const props = {
                    register : register ,
                    setValue : setValue ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : current ,
                    control  : control
                  } ;

    return <>

              <label className="label"> <i className="fas fa-user-circle"></i> &nbsp; 員工資料 </label> <br/>

              <Employee_Form { ...props } />

           </>

} ;

export default Create_Employee
