const itemRouter = require('./item');
const meRouter = require('./me');
const homeRouter = require('./home');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const categoryRouter = require('./category');

function route(app){
    
    app.use('/item', itemRouter);
    app.use('/cart', cartRouter);
    app.use('/me', meRouter); 
    app.use('/order',orderRouter);
    app.use('/category', categoryRouter);
    app.use('/', homeRouter);
 
}

module.exports = route;
