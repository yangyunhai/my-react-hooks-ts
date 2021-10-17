import { RouterType } from "./interface";
import Oder from './Order';
import User from './User';

const Routers: RouterType[] = [
 ...Oder,
 ...User,
];

export default Routers;
