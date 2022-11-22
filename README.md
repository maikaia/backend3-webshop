# backend3-webshop

## TODOS
- ~~Frontend UI for shopping cart~~ ✔
- Checkout and receipt system
- Get Docker working properly
- ~~Update user info~~ ✔

### Cart UI ✔
~~Add "Add to cart" button which sends product ID to backend which will be handled accordingly.
Add page for items in shopping cart, GET to /cart/active.~~

### Update user information ✔
~~PUT call to update user's information if they want to change it.~~

### Checkout system & receipts
When user checks out cart, save existing cart to checkout, delete cart, and give user a new cart.
Copy product id:s and info to receipt schema and load receipts on a separate endpoint.

### Docker
Solve issue with initdb.js file not executing and db-container acting weird.
