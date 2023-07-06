

/* @ 測試練習 ( 2022.03.06 ) */
interface ITest {

    user : any ;

}


 const initState : ITest = {

    user : {} ,

  } ;
   


  const reducer_Test = ( state = initState, action : any ) => {

    switch (action.type) { 

      case 'SET_USER' : return { ...state , user : action.payload.user };
      
      default: return state;

    }
  };
   
  export default reducer_Test ;