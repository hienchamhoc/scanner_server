import * as jwt from 'jsonwebtoken';
import {AccountJwt} from "../type/accountJwt";


const JWT_SECRET = 'e7a67e013369ba17e622af20aa523d116291245e41ce97d798723e8961118778'
const EXPIRE_TIME = '2 days';


function sign(user: AccountJwt) {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: EXPIRE_TIME,
    });
}

function decode(token: string): jwt.JwtPayload | string {
    return jwt.verify(token, JWT_SECRET);
}

export {
    sign,
    decode
}

