import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient() ;


// # for 使用 React Query 的自訂 Hook
export const wrapper = ( { children } : any ) => {

    return <QueryClientProvider client = { queryClient } >

                { children }

           </QueryClientProvider>
   
}

 