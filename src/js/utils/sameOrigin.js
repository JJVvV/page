/**
 * Created by AlexLiu on 12/14/15.
 */

export default function sameOrigin(href){
    var origin = location.protocol + '//' +location.hostname;
    if(location.port) origin += ':' + location.port;

    return ~href.indexOf(origin);
}