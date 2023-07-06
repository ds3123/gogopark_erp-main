
import { setupServer } from "msw/node" ;
import { handlers } from "./handlers";


// @ Mock Service Worder -> Server 設定
export const server = setupServer( ...handlers ) ;

