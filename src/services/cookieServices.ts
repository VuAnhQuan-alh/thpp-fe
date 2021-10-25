import Cookies from 'universal-cookie';
class CookieServices {
    cookies = new Cookies();

    setCookie(key: string, value: string) {
        let d = new Date();
        d.setTime(d.getTime() + (60 * 60 * 1000));

        this.cookies.set(key, value, { path: "/", expires: d });
    };

    getCookie(key: string) {
        return this.cookies.get(key);
    }
}

export default new CookieServices();