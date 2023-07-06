/* eslint-disable react/jsx-pascal-case */
import Taiwan_Zip_Code from "templates/form/Taiwan_Zip_Code";
import { Zipcode_Info } from "utils/Interface_Type" ;






// @ 員工 : 導覽區
const Employees_Nav = ( ) => {





   return <div className="columns is-multiline is-mobile m_Bottom_70">

                { /* 縣市、行政區  */ }
                {/* 
                
                    <div className="column is-3-desktop relative"> 

                        <Taiwan_Zip_Code get_ZipCode_Info = { get_ZipCode_Info } />  
                    
                    </div> 
                
                

                <div className="column is-5-desktop relative">

                    <p> 所屬店家 </p>
                    <div className="select">

                        <select onChange={ e => on_ShopNum_Change( e.target.value ) } >

                            <option value="請選擇"> 請選擇     </option>
                            <option value="1"> 1 : 狗狗公園   </option>
                            
                        </select>

                    </div>

                </div>

                */}

         </div>    


} ;

export default Employees_Nav
       