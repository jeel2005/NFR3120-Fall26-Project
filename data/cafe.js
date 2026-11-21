// Cafe data is stored in this file. It resets when the server restarts.
// A database can be used later. The routes use the functions from this file.
//
// CODE REFERENCES:
// - let / const, arrays and objects: Chapter 8
// - arrow functions: Demo/fat-arrow.js and Javascript/js7.js
// - filter(): Demo/filter.js and Chapter 10
// - map(): Demo/map-1.js, map-2.js, map-3.js and Chapter 10
// - find(): Demo/find.js and Chapter 10
// - reduce(): Chapter 10
// - module.exports: WebProject template (routes/index.js)
// - cafe menu, orders and order status: Made for this project

let menu = [
  { id: 1, name: 'Espresso',         category: 'Drink', description: 'Single shot of espresso',          price: 3.00 },
  { id: 2, name: 'Latte',            category: 'Drink', description: 'Espresso with steamed milk',       price: 4.50 },
  { id: 3, name: 'Cappuccino',       category: 'Drink', description: 'Espresso, steamed milk and foam',  price: 4.50 },
  { id: 4, name: 'Iced Coffee',      category: 'Drink', description: 'Cold brew over ice',               price: 4.00 },
  { id: 5, name: 'Hot Chocolate',    category: 'Drink', description: 'Rich chocolate with milk',         price: 4.25 },
  { id: 6, name: 'Butter Croissant', category: 'Food',  description: 'Freshly baked',                    price: 3.75 },
  { id: 7, name: 'Blueberry Muffin', category: 'Food',  description: 'Baked in-house daily',             price: 3.50 },
  { id: 8, name: 'Avocado Toast',    category: 'Food',  description: 'Sourdough, avocado, chili flakes', price: 8.50 },
  { id: 9, name: 'Club Sandwich',    category: 'Food',  description: 'Turkey, bacon, lettuce, tomato',   price: 10.50 }
];

let orders = [];
let nextOrderId = 1;

let getMenu = () => menu;

// Orders that are not finished yet
// (filter with an arrow function, like Demo/filter.js)
let getActiveOrders = () =>
  orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');

// quantities looks like { 1: 2, 6: 1 }  (menu id -> quantity)
// Names and prices always come from the menu, never from the browser.
let addOrder = (customer, notes, quantities) =>
{
  // filter() picks the menu items that were ordered, map() turns them into order lines
  // (like Demo/filter.js and Demo/map-1.js)
  let items = menu
    .filter(m => quantities[m.id] > 0)
    .map(m => ({ id: m.id, name: m.name, price: m.price, qty: quantities[m.id] }));

  // reduce() adds up all the line prices (Chapter 10)
  let total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  let order = {
    id: nextOrderId++,
    customer: customer,
    notes: notes,
    items: items,
    total: total,
    placed: new Date(),
    status: 'Pending'
  };
  orders.push(order);
  return order;
};

let allowedStatuses = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

let updateStatus = (id, status) =>
{
  // find() returns the first match, or undefined (like Demo/find.js)
  let order = orders.find(o => o.id === id);
  let validStatus = allowedStatuses.find(s => s === status);
  if (!order || !validStatus)
  {
    return null;
  }
  order.status = status;
  return order;
};

// The next step in an order's life: Pending -> Preparing -> Ready -> Completed
let nextStatus = (status) =>
{
  if (status === 'Pending') return 'Preparing';
  if (status === 'Preparing') return 'Ready';
  return 'Completed';
};

module.exports = { getMenu, getActiveOrders, addOrder, updateStatus, nextStatus };
