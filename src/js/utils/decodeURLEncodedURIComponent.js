/**
 * Created by AlexLiu on 12/14/15.
 */

export default function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return typeof decodeURLComponents !== 'undefined' ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
}