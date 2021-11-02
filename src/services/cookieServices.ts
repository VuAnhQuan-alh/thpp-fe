import { ApiException } from './../constants/exception';
import Cookies from 'universal-cookie';
import { UNAUTHENTICATED } from 'constants/errorCode';
class CookieServices {
    cookies = new Cookies();

    setCookie(key: string, value: string, hasExpires: boolean = true) {
        var options;

        if (hasExpires) {
            let d = new Date();
            d.setTime(d.getTime() + (60 * 60 * 1000));
            options = { path: "/", expires: d };
        }

        this.cookies.set(key, value, options);
    };

    getCookie(key: string) {
        var cookie = this.cookies.get(key);
        if (cookie == null) {
            throw {
                response: {
                    status: UNAUTHENTICATED
                }
            };
        }
        return cookie;
    }
}

export const TOKEN_KEY = 'token';
export const CALLBACK_URL = 'callbackURL';

export default new CookieServices();