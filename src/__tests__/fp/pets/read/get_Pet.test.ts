/* eslint-disable jest/valid-title */
import { 
 
    get_ServiceOrder_By_PetId
    

} from "fp/pets/read/get_Pet" 


describe( "特定服務日期，所有服務單中，是否 _ 有屬於特定寵物的服務單" , () => { 

    test( "是否有 _ 特定寵物 id 的服務單" , () => {

        const data = [ 
                        { pet : { pet_id : 33 } } ,
                        { pet : { pet_id : 12 } } ,
                        { pet : { pet_id : 8 } } ,
                        { pet : { pet_id : 55 } } 
                     ] ;

        expect( get_ServiceOrder_By_PetId( 8 )( data ) ).toEqual( [ { pet : { pet_id : 8 } } ] ) ;            
        expect( get_ServiceOrder_By_PetId( 5 )( data ) ).toEqual( [] ) ;            

    }) ;

}) ; 




