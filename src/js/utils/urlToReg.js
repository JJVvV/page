/**
 * Created by AlexLiu on 12/14/15.
 */

//   /contact/:name/:age/
export default function urlToReg(url = ''){
    url = url
        .replace(/\/$/, '')
        .replace(/:([^/]+)/g, '([^/]+?)')
        .replace(/\//g, '\\/');
    url = '^' + url + '$';

    return new RegExp(url, 'i');

}