
import { FC } from 'react' ;
import { get_Pet_Age } from 'utils/time/date' ;
import { extract_Last_6_Nums } from 'utils/string/edit_string';
import { string_Short } from 'utils/string/edit_string';



type Pet = {

   pet : any 

}


// @ 寵物資訊欄位 
const Service_Tag_PetInfo : FC< Pet > = ( { pet } ) => {


    // 寵物年齡
    const pet_Age = pet?.birthday ? get_Pet_Age( pet?.birthday ) : '' ;


    return <>

              <div className = "t_Left m_Bottom_5 relative" >
                   名字 : <span className = "absolute" style = {{ left : "47px" , top : "-7px" }} > 
                             <b className = "f_16"> { string_Short( pet?.name , 7 ) } ( { pet?.species} )  </b>  
                          </span>   
              </div>
              <div className = "t_Left m_Bottom_5 w-50 float_Left" >  編號 : { extract_Last_6_Nums( pet?.serial ) } </div>
              <div className = "t_Left m_Bottom_5 w-50 float_Left" >  公母 : { pet?.sex }      </div>
              <div className = "t_Left m_Bottom_5 w-50 float_Left" >  顏色 : { pet?.color }    </div>
              <div className = "t_Left m_Bottom_20 w-50" >            年齡 : { pet_Age }      </div>

           </>

} ;

export default Service_Tag_PetInfo
       