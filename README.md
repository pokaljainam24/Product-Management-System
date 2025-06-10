# 🛍️ React Product Management Appe

This is a full-featured React Product Management System with Admin Panel and Client View. It includes CRUD functionality, form validation, image uploading, rating, category/brand filtering, a shopping cart, and toast notifications.

## 🚀 Features

- Admin panel for adding, editing, deleting products.
- Dynamic form with image upload preview.
- Real-time toast notifications with react-toastify.
- Client view with product listing.
- Product detail and add-to-cart feature using localStorage.
- Cart management with quantity.
- Category and brand filtering (dropdown support).
- Routing using react-router-dom.Expanding the ESLint configuration

## 🧰 Tech Stack

- **Frontend**: React, Bootstrap/Tailwind (if used), React Router, Axios
- **Notifications**: react-toastify
- **State Handling**: useState, useEffect, localStorage 
- **Backend**: JSON Server (or your own REST API)

## 📦 Installation

```
git clone https://github.com/your-username/react-product-management.git
cd react-product-management
npm install
npm start
```

## 📁 Project Structure

```.
├── public/
├── src/
│   ├── components/
│   │   ├── Form.js
│   │   ├── Table.js
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── AdminPanel.js
│   ├── App.js
│   └── index.js
├── db.json (if using JSON Server)
└── README.md
```

## 🛠️ Key Functionalities

1. **Add / Edit Product**:
  - Fields: pName, sku, brand, category, price, rating, content, options, image, stock.
  - Validation included for all fields.

2. **Delete Product**:
  - Deletes from the JSON server and refreshes the product list with a toast message.

3. **Client View**:
  - Products are shown with price, discount, rating, and image.
  - Includes /product detail page.
  - /cart page with localStorage-based cart system.

4. **Routing**:

   | Path       | Component  | Description               |
   | ---------- | ---------- | ------------------------- |
   | `/`        | AdminPanel | Dashboard or welcome view |
   | `/form`    | Form       | Add/Edit product form     |
   | `/table`   | Table      | Admin product table       |
   | `/client`  | Home       | Client product listing    |
   | `/product` | Product    | Product details           |
   | `/cart`    | Cart       | User cart                 |


## 🖼️ Screenshots
![Admin Page](https://github.com/user-attachments/assets/d150a37d-ee5a-4742-97b7-cad98ebadc9d)



## ✅ TODO / Future Enhancements

- Search and filtering in product listing.
- Pagination in the table view.
- User login/logout system.
- Backend integration (MongoDB/Express API).
- Quantity update in cart.

## 🙋‍♂️ Author

**Jainam Pokal**:
- 📫 Reach out: LinkedIn | GitHub





