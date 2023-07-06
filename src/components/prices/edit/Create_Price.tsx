import { Edit_Form_Type } from "utils/Interface_Type";
import Price_Form from "components/prices/edit/Price_Form";




/* @ 新增 _ 價格 */
const Create_Price = ( { register , setValue , errors , isDirty , isValid, current } : Edit_Form_Type ) => {

    const props = {
        register : register ,
        setValue : setValue ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : current
    } ;

    return  <Price_Form {...props}  />



} ;

export default Create_Price