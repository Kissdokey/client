//该函数用于清除cookie，因为用户的登录状态完全取决于cookie是否存在于服务端，当cookie失效或者用户主动退出时候，应该清除该cookie
export function delCookie(name:any) {
    // eslint-disable-next-line no-useless-escape
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}