<div align="center">

# 🎂 Delicia
### *Where Every Cake Tells Your Story*

**A full-stack platform for ordering and customizing cakes online — baked with Spring Boot, served with React.**

</div>

## 🍰 About Delicia

Picture this: it's someone's birthday, and instead of scrolling through a bakery's fixed menu hoping something "close enough" shows up, they open **Delicia** — and build the cake they actually imagined.

Choose the flavor, size, shape, frosting, and toppings, add a personal message, and in a few clicks a half-formed idea turns into a real order sent straight to a baker. Prefer not to design one? Browse ready-made cakes instead.

At its core, Delicia is simple: **it's what happens when "build-a-cake" meets modern e-commerce.**


## 🎯 Project Objectives

- 🎨 Give customers a seamless way to **customize cakes** (flavor, size, layers, toppings, messages) before ordering.
- 🛒 Provide a smooth, intuitive **online ordering and checkout experience**.
- 📦 Enable bakers/admins to **manage products, orders, and inventory** through a dedicated panel.
- 🔐 Implement **secure authentication** for customers and admins.
- ⚙️ Build a **scalable, decoupled architecture** using REST APIs so the frontend and backend evolve independently.
- 📱 Ensure the platform is **responsive** across devices — desktop, tablet, and mobile.


## ✨ Key Features

### 👤 Customer Experience
- 🔑 User registration & login (JWT-based authentication)
- 🎂 Browse cakes by category, occasion, or flavor
- 🖌️ **Custom cake builder** — pick size, shape, flavor, frosting, toppings & add a personalized message
- 🛍️ Shopping cart & order checkout
- 📜 Order history & real-time order status tracking
- ⭐ Ratings & reviews for ordered cakes
- 🔍 Search & filter functionality

### 🛠️ Admin / Baker Panel
- 📊 Dashboard with order analytics
- ➕ Add / update / remove cake listings
- 📦 Inventory & ingredient stock management
- 🚚 Order status management (Pending → Baking → Out for Delivery → Delivered)
- 👥 Customer & order management

### ⚙️ Platform-Wide
- 🌐 RESTful API architecture connecting frontend & backend
- 🔒 Secure, role-based access (Customer vs Admin)
- 💾 NoSQL data persistence with MongoDB
- 📱 Fully responsive UI


## 🧰 Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React.js |
| **Backend** | Spring Boot (Java) |
| **Database** | MongoDB |
| **API Style** | RESTful APIs |
| **Version Control** | Git & GitHub |
| **IDE** | IntelliJ IDEA |
| **Build Tool** | Maven |
| **API Testing** | Postman |

</div>


## 🎨 Theme

Warm, playful, and appetizing — like walking into a boutique bakery.

- **Colors:** Soft pastel pinks, cream, and chocolate-brown accents
- **Typography:** Rounded, friendly headings + clean sans-serif body text
- **Visuals:** Rounded cards, soft shadows, bakery-themed icons
- **Feel:** Smooth transitions that make browsing cakes feel indulgent


## 🏗️ Project Structure

Delicia/
├── backend/                        # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/delicia/
│   │   │   │   ├── controller/     # REST API endpoints
│   │   │   │   ├── service/        # Business logic
│   │   │   │   ├── repository/     # MongoDB repositories
│   │   │   │   ├── model/          # Entity/Document classes
│   │   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   ├── config/         # Security & app configuration
│   │   │   │   ├── exception/      # Custom exception handling
│   │   │   │   └── DeliciaApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                   # Unit & integration tests
│   └── pom.xml
│
├── frontend/                       # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Page-level views
│   │   ├── services/                # API call handlers (Axios)
│   │   ├── context/                # Auth/State context providers
│   │   ├── assets/                 # Images, icons, fonts
│   │   ├── styles/                 # CSS / theme files
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── docs/                           # Diagrams & Postman collection
├── .gitignore
└── README.md

## 🗺️ Future Roadmap

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Live order tracking with delivery partner integration
- [ ] AI-based cake design suggestions
- [ ] Loyalty points & discount coupons
- [ ] Multi-language support
- [ ] Dockerized deployment

## 🤝 Contributing

Contributions and feature requests are welcome!
1. Fork the repo
2. Create a branch 
3. Commit your changes
4. Push and open a Pull Request

## 🔗 Connect

⭐ If you like this project, consider starring the repo on GitHub — it helps a lot!

🔗 GitHub: [github.com/gaurv-dev/delicia](https://github.com/gaurv-dev/delicia)


<div align="center">

### 🎂 *Delicia — Because every celebration deserves a cake that's uniquely yours.*

Made with ❤️ and a little bit of frosting.

</div>
