/**
 * Created by AlexLiu on 12/14/15.
 */


import {decodeURLEncodedURIComponent, sameOrigin, urlToReg} from './utils'
import Context from './Context'
import Route from './Route'


let clickEvent = 'click';

const page = (path, fn) => {
    if(typeof fn === 'function'){
        var route = new Route(path);
        page.callbacks.push(route.middleware(fn));
    }else{
        page.start(path);
    }
}

const onclick = (e) => {
    var el = e.target;
    while(el && el.nodeName.toUpperCase() !== 'A') el = el.parentNode;
    if(!el || el.nodeName.toUpperCase() !== 'A') return;

    if(!sameOrigin(el.href)) return;
    var link = el.getAttribute('href');
    var path = el.pathname + el.search + (el.hash || '');



    e.preventDefault();
    page.show(path);
}

const onpopstate = (() => {
    var loaded = false;
    //if(typeof window === 'undefined') return;

    if(document.readyState === 'complete'){
        loaded = true;
    }else {
        window.addEventListener('load', function(){
            setTimeout(function(){
                loaded = true;
            }, 0);
        });
    }

    return () =>(e){
        if(!loaded) return;
        if(e.state){
            var path = e.state.path;
            page.replace(path, e.state);
        }else {
            page.show(location.pathname + location.hash, undefined, undefined, false);
        }
    }
})();



page.callbacks = [];
page.exits = [];

page.start = function(options){
    window.addEventListener('popstate', onpopstate, false);
    document.addEventListener(clickEvent, onclick, false);
    var url = location.pathname + location.search + location.hash;
    page.replace(url);
}

page.show = function(path){
    var ctx = new Context(path);
    page.dispatch(ctx);
    ctx.pushState();

}

page.replace = function(path, state){
    var ctx = new Context(path, state);
    page.dispatch(ctx);
    ctx.save();
}

page.dispatch = function(ctx){
    let i = 0;


    const nextState = () => {
        var fn = page.callbacks[i++];
        if(!fn) return;
        fn(ctx, nextState);
    }

    nextState();
}


export default page;

































