


import { render , screen , waitFor  }  from "@testing-library/react" ;

import { getData_fetch , getData_axios } from "store/actions/action_Log" ;


import axios  , { AxiosPromise } from 'axios' ;
import { mocked } from "ts-jest/utils" ;



// 包住要隔離的東西，並且能夠得到 mock 物件的屬性
const mockedAxios = mocked( axios , true )  ;

jest.mock( 'axios' ) ;  // This overwrites axios methods with jest Mock




test( "getData_fetch" , async() => {


    global.fetch = jest.fn( ).mockResolvedValue(  {  json : ( ) => ( { count : 5 }  )  }  )  // 異步 fetch( ) 取得的 count ，固定為 5
    
    const res = getData_fetch() ;

    const count = await res();

    expect( count ).toBe( 6 ) 


} )



test( "getData_axios" , () => {

   
    mockedAxios.mockImplementation( 

        () => Promise.resolve( { data : 123 }  ) as AxiosPromise  // 強行轉型為 AxiosPromise  

    ) ;

    
    // axios( "" ).then( res => {

    //     expect( res.data ).toBe( 123 ) ;

    // }) 
   
   
} )


