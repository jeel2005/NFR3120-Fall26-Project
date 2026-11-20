# Bean There Cafe (Part 1)

**Team Members:**
- Fazal Naqvi – 100975935
- Sharjeel Syed – 100917529
- Sohrob Niazi – 100924971

Bean There Cafe is an online coffee shop where customers can browse the menu, choose what they want, select quantities, add special requests, and place an order without waiting in line.

The home page also works as a staff dashboard. Staff can view active orders in a table and update their status to Pending, Preparing, Ready, or Completed. They can also cancel orders.

## Features

- **Landing Page:** Shows the cafe name and our original team logo (`public/Content/logo.svg`).
- **Create Order:** The "Place a New Order" button opens an order form where customers can select items, add special requests, view the total, and submit their order.
- **Display Orders:** Shows the menu and active orders in tables, with buttons to update or cancel orders.
- **Storage:** The menu and orders are kept in memory (`data/cafe.js`), so they reset when the server restarts.

## Running the Project

Open the terminal and enter:

```bash
cd CafeApp
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Project Structure

- `app.js`, `server.js` – Express app and server setup (express-generator layout from the WebProject template).
- `routes/index.js` – Handles the home page, new order form, creating orders, and updating order status.
- `data/cafe.js` – Holds the menu and orders in memory, with the functions to add orders and update their status.
- `views/` – Contains the EJS templates (`index.ejs`, `new-order.ejs`, and `partials/`).
- `public/` – Contains the CSS, client-side JavaScript, and cafe logo.

## Credits

AI was used to help come up with the cafe name, design the logo, and improve some of the code comments. It also helped with the README.