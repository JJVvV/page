/**
 * Created by AlexLiu on 12/14/15.
 */


export default class Route{
    constructor(path){
        this.path = path;
        this.regexp = urlToReg(path);
        var keys = this.regexp.exec(path) || [];
        this.keys = keys.slice(1).map(function(k){
            return k.slice(1);
        })
    }

    middleware(fn){

        return (ctx, next) => {
            if(this.match(ctx, ctx.params)){
                fn(ctx, next);
                return;
            }
            next();
        }

    }

    match(ctx, params){
        var path = this.path;

        var m = this.regexp.exec(ctx.pathname);

        if(!m) return false;

        for(var i=1, len=m.length; i<len; i++){
            params[this.keys[i-1]] = m[i];
        }

        return true;
    }


}
