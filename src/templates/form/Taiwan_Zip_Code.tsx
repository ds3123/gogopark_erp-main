import { useTwZipCode , cities , districts } from "use-tw-zipcode";
import { useEffect } from 'react' ;
import { Zipcode_Info } from "utils/Interface_Type" ;



type ZipCodeInfo = {

    get_ZipCode_Info : ( info : Zipcode_Info ) => void ; // 取得、回傳 : 郵遞區號、縣市、行政區

}



// @ 台灣縣市、行政區、郵遞區號
const Taiwan_Zip_Code = ( { get_ZipCode_Info } : ZipCodeInfo ) => {


    const {

            city ,                // 縣市
            district ,            // 行政區 
            zipCode ,             // 郵遞區號

            handleCityChange ,    // 變動處理 : 縣市
            handleDistrictChange  // 變動處理 : 行政區 

           } = useTwZipCode() ;


    // 取得、回傳 : 郵遞區號
    useEffect( () => {
      
      get_ZipCode_Info({

                          zipcode  : zipCode ,
                          city     : city ,
                          district : district 
    
                        }) ;

    } , [ zipCode , city , district ] ) ;


    


    return   <>
               
                { /* 縣市 */ }
                <span className="m_Right_30" style={{ float : "left" }}>

                    <p> 縣 市 </p> 
                    <div className="select">

                        <select onChange={ e => handleCityChange( e.target.value )}>

                            { cities.map(( city , i ) => <option key={i}>{city}</option> )}

                        </select>

                    </div> 

                </span>

                { /* 行政區 */ }
                <span style={{ float : "left" }} >

                    <p> 行政區 </p>
                    <div className="select">

                        <select onChange={e => handleDistrictChange( e.target.value )}>
                            { districts[ city ].map( ( district , i ) => <option key={ i } > { district } </option> ) }
                        </select>
                        
                    </div>

                </span>

           </>

} ;

export default Taiwan_Zip_Code
       