/**
 * Created by AlexLiu on 12/14/15.
 */



export default class Context{
    constructor(path, state, base = ''){
        if(base !== ''){
            if(path.indexOf('/') === 0 && path.indexOf(base) !== 0) path = base + path;
        }
        var index = path.indexOf('?');
        this.canonicalPath = path;
        this.path = path.replace(base, '') || '/';
        this.state = state || {};
        this.state.path = path;
        this.pathname = decodeURLEncodedURIComponent(~index ? path.slice(0, index) : path);
        this.querystring = decodeURLEncodedURIComponent(~index ? path.slice(index + 1) : '');
        this.params = {};
    }

    pushState(){
        history.pushState(this.state, this.title, this.canonicalPath);
    }

    save(){
        history.replaceState(this.state, this.title, this.canonicalPath);
    }
}

