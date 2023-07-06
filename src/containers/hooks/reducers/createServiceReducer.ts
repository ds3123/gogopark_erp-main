

interface ICreateService {

   pet_Size : string ;  // 寵物體型 ( 小型犬、中型犬、大型犬、特大型犬 )

}

export const initState = {
    
                            pet_Size : "" ,

                         } ;


export const ACTIONS = {

                          SET_PET_SIZE  : "SET_PET_SIZE" ,   // 設定 _ 寵物體型 ( 小型犬、中型犬、大型犬、特大型犬 )
                        
                        } ;



const createServiceReducer = ( state : ICreateService = initState , action : any ) => {

    const { type , payload } = action ;

    switch( type ){

        // 設定 _ 寵物體型 ( 小型犬、中型犬、大型犬、特大型犬 )
        case ACTIONS.SET_PET_SIZE :
             return { ...state , pet_Size : payload.pet_Size } ;

        
        default :
            throw new Error( `未符合 createServiceReducer 類型條件 : ${ type }` )

    }


} ;


export default createServiceReducer