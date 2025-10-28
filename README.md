# 🛒 Vibe Commerce - Full Stack Shopping Cart App

A **full-stack shopping cart application**.  
This project demonstrates **UI design**, **REST API handling**, **database integration**, and **mock checkout functionality** using a modern MERN-style stack.

---

## 🚀 Overview

This project implements a **basic e-commerce flow**:

- Browse and view products
- Add or remove items from the cart
- Update quantities and view totals
- Checkout with a mock receipt (no real payments)
- Demonstrates **React + Node + Express + MongoDB** integration

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (can switch to SQLite for local mock) |
| **API** | RESTful APIs |
| **Auth** |  Basic mock login using JWT |
| **Version Control** | Git + GitHub |

---

## ⚙️ Features

### 🖥️ Frontend (React)
- Responsive **product grid** with “Add to Cart” buttons  
- **Cart view** showing all items, quantities, and total  
- Ability to **update quantity** or **remove items**
- **Checkout form** (name/email) with **mock receipt modal**
- Built with **Tailwind CSS** for a clean UI  
- Responsive design for mobile, tablet, and desktop  

### ⚙️ Backend (Node/Express)
- `GET /api/products` → Returns 5–10 mock products  
- `POST /api/cart` → Add product `{ productId, qty }`  
- `GET /api/cart` → Retrieve cart items + total  
- `DELETE /api/cart/:id` → Remove item by ID  
- `POST /api/checkout` → Generates mock receipt with total + timestamp  

---

## 🗂️ Project Structure

```
vibe-commerce/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ │ ├── productRoutes.js
│ │ └── cartRoutes.js
│ ├── models/
│ │ ├── Product.js
│ │ └── Cart.js
│ ├── controllers/
│ │ ├── productController.js
│ │ └── cartController.js
│ └── config/
│ └── db.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Products.js
│ │ │ ├── Cart.js
│ │ │ └── Checkout.js
│ │ ├── components/
│ │ │ ├── Navbar.js
│ │ │ └── ReceiptModal.js
│ │ ├── App.js
│ │ └── api.js
│ └── package.json
│
├── README.md
└── package.json

```
---

## 🧠 API Reference

### **Products**
```
GET /api/products
```
Response:
```
[
  { "_id": 1, "name": "T-shirt", "price": 499 },
  { "_id": 2, "name": "Headphones", "price": 2999 }
]
```
Cart
```
POST /api/cart
```
Body:
```
{ "productId": "1", "qty": 2 }
```
```
GET /api/cart
```
Response:
```
{
  "items": [
    { "id": 1, "name": "T-shirt", "qty": 2, "price": 499, "subtotal": 998 }
  ],
  "total": 998
}
```
```
DELETE /api/cart/:id
```
Checkout
```
POST /api/checkout
```
Body:
```
{ "cartItems": [{ "id": 1, "qty": 2 }] }
```
Response:
```
{
  "message": "Checkout successful",
  "total": 998,
  "timestamp": "2025-10-28T10:30:00Z"
}
```
## 🧑‍💻 Setup Instructions ##
1️⃣ Clone the repository
```
git clone https://github.com/NandishM0618/ecomm-assessment.git
cd ecomm-assessment
```
2️⃣ Backend setup
```
npm install
npm run dev
```
Runs on http://localhost:8080

3️⃣ Frontend setup
```
cd src/frontend
npm install
npm run dev
```
Runs on http://localhost:3000

## 🧾 Mock Checkout Flow ##
Add products to cart

Go to Cart Page → View total

Proceed to Checkout Page

Fill out name & email → Click “Confirm Order”

Modal displays a mock receipt:

Customer details

Items summary

Total price

Timestamp

## 🌐 Bonus Features ##
- ✅ Persistent cart using MongoDB
- ✅ Error handling (e.g., “No token provided”, “Product not found”)
- ✅ Fake Store API integration 
- ✅ JWT authentication (mock user login)

## 📸 Screenshots ##
- Home Page and Products
  
  <img width="1684" height="937" alt="Screenshot 2025-10-28 222705" src="https://github.com/user-attachments/assets/dbb0c86c-9e56-4f3f-beec-9c2814875f22" />
  
- 🛒 Cart
  
  <img width="1686" height="935" alt="Screenshot 2025-10-28 222837" src="https://github.com/user-attachments/assets/cba31c93-1b3d-4585-8696-3d09417759ed" />
  
- 💳 Checkout
  
  <img width="1697" height="937" alt="Screenshot 2025-10-28 222930" src="https://github.com/user-attachments/assets/f0fb96c1-204e-455f-93aa-8183e2081474" />
  
- ✅ Receipt Modal
  
  <img width="1012" height="668" alt="Screenshot 2025-10-28 223001" src="https://github.com/user-attachments/assets/4a3c5529-9054-40ae-a90e-828144cc6f66" />


## 🎥 Demo Video ##
-> [Demo Video](https://www.loom.com/share/41ae33a2961b449abb85c1b9d0f358e0)

# 🧑‍💻 Author #
Nandish M
