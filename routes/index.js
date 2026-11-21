// CODE REFERENCES:
// - require('express'), express.Router(), router.get(), res.render(), module.exports,
//   and the "/" and "/home" routes: WebProject template (routes/index.js)
// - express.urlencoded() for handling form data (req.body): WebProject template (app.js)
// - arrow functions (=>): Demo/fat-arrow.js
// - forEach(): Chapter 10
// - filter(): Demo/filter.js and Chapter 10
// - if / else, isNaN and parseInt: Chapter 8 and Demo files
// - order form routes (/orders/new, POST /orders, POST /orders/:id/status)
//   and form validation: Created for this project

let express = require('express');
let router = express.Router();
let cafe = require('../data/cafe');

// Site name and team name
let site = { name: 'Bean There Cafe', team: 'Bean Team' };

/* GET home (landing) page. */
let showHome = (req, res, next) =>
{
  res.render('index', {
    title: 'Home',
    site: site,
    menu: cafe.getMenu(),
    orders: cafe.getActiveOrders(),
    nextStatus: cafe.nextStatus,
    placed: req.query.placed
  });
};
router.get('/', showHome);
router.get('/home', showHome);

/* GET new order form. */
router.get('/orders/new', function(req, res, next) {
  res.render('new-order', {
    title: 'New Order',
    site: site,
    menu: cafe.getMenu(),
    errors: [],
    form: { customer: '', notes: '', qty: {} }
  });
});

/* POST create a new order. */
router.post('/orders', function(req, res, next) {
  let menu = cafe.getMenu();
  let customer = String(req.body.customer || '').trim();
  let notes = String(req.body.notes || '').trim();
  let qty = {};
  let errors = [];

  // Gets the quantity for each item from the form (between 0 and 20).
  menu.forEach(m =>
  {
    let q = parseInt(req.body['qty_' + m.id]);
    if (isNaN(q) || q < 0) q = 0;
    if (q > 20) q = 20;
    qty[m.id] = q;
  });

  // filter() keeps only the menu items that have a quantity
  let hasItems = menu.filter(m => qty[m.id] > 0).length > 0;

  if (customer == '') errors.push('Please enter your name.');
  if (!hasItems) errors.push('Please choose at least one item.');

  if (errors.length > 0)
  {
    return res.status(400).render('new-order', {
      title: 'New Order',
      site: site,
      menu: menu,
      errors: errors,
      form: { customer: customer, notes: notes, qty: qty }
    });
  }

  let order = cafe.addOrder(customer, notes, qty);
  res.redirect('/?placed=' + order.id);
});

/* POST change an order's status (Preparing, Ready, Completed or Cancelled). */
router.post('/orders/:id/status', function(req, res, next) {
  let updated = cafe.updateStatus(parseInt(req.params.id), String(req.body.status));
  if (!updated)
  {
    let err = new Error('Order or status not found');
    err.status = 404;
    return next(err);
  }
  res.redirect('/#orders');
});

module.exports = router;
