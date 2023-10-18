

// * Redux
import { Provider } from 'react-redux';
import { store } from '../../index';

// # 需包覆 Redux 時使用
export const redux_wrapper = ( { children } : any ) => {

    return <Provider store = { store } >

                { children }

           </Provider>
   
}

 