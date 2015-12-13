/**
 * Created by AlexLiu on 12/14/15.
 */

import Page from './js/Page'


const index = () => {
    document.querySelector('p')
        .textContent = 'viewing index';
}

const about = () => {
    document.querySelector('p')
        .textContent = 'viewing about';
}

const contact = (ctx) => {
    document.querySelector('p')
        .textContent = 'viewing contact ' + (ctx.params.who || '');
}


page('/page.js-master/my', index);
page('/page.js-master/my/about', about);
page('/page.js-master/my/contact', contact);
page('/page.js-master/my/contact/:who', contact);

page();

