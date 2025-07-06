# 🛒 ShopHub - Premium E-commerce Store

A modern, full-featured e-commerce application built with React, TypeScript, and Tailwind CSS, featuring Razorpay payment integration and a beautiful, responsive design.

![ShopHub Preview](https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200)

## ✨ Features

### 🏠 **Homepage**
- Beautiful hero section with animated elements
- Featured products showcase
- Best sellers section
- Customer statistics and testimonials
- Responsive design with smooth animations

### 🛍️ **Shopping Experience**
- **Product Catalog**: Grid and list view modes
- **Advanced Search**: Real-time product search
- **Smart Filters**: Category, price range, brand, rating filters
- **Product Details**: Quick view modal with detailed information
- **Shopping Cart**: Add, remove, update quantities
- **Wishlist**: Save products for later

### 💳 **Checkout & Payment**
- **Multi-step Checkout**: Shipping, billing, and payment steps
- **Razorpay Integration**: Secure payment processing
- **Form Validation**: Real-time validation with error handling
- **Order Summary**: Detailed breakdown with taxes and shipping
- **Payment Success**: Order confirmation with tracking

### 🎨 **Design & UX**
- **Modern UI**: Clean, professional design
- **Responsive**: Works perfectly on all devices
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: WCAG compliant design
- **Performance**: Optimized for fast loading

## 🚀 Tech Stack

### **Frontend Framework**
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Fast build tool and development server

### **Styling & UI**
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - Automatic vendor prefixing

### **Payment Integration**
- **Razorpay 2.9.6** - Secure payment gateway for India
- **Razorpay Checkout** - Frontend payment interface

### **Development Tools**
- **ESLint 9.9.1** - Code linting and formatting
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting
- **React Hooks ESLint** - React hooks linting
- **React Refresh** - Fast refresh during development

### **State Management**
- **React Context API** - Global state management for cart
- **useReducer Hook** - Complex state logic handling
- **Local Storage** - Cart persistence


## 🛠️ Installation & Setup

### **Prerequisites**
- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher)
- **Git** (for cloning the repository)

### **1. Clone the Repository**
```bash
git clone <your-repository-url>
cd shophub
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Razorpay**
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings > API Keys**
3. Copy your **Key ID**
4. Open `src/components/RazorpayPayment.tsx`
5. Replace `YOUR_RAZORPAY_KEY_ID` with your actual Key ID:

```typescript
const options = {
  key: 'rzp_test_your_actual_key_here', // Replace this
  // ... other options
};
```

### **4. Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🔧 Configuration

### **Tailwind CSS**
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};
```

## 🌐 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **Deploy to Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### **Environment Variables**
For production, set these environment variables:
```
VITE_RAZORPAY_KEY_ID=your_live_key_id
VITE_API_URL=your_backend_api_url
```

## 🔒 Security Considerations

### **Payment Security**
- Never expose Razorpay Key Secret on frontend
- Use webhooks for payment verification
- Implement server-side order validation
- Use HTTPS in production

### **Data Protection**
- Sanitize user inputs
- Implement rate limiting
- Use secure headers
- Regular security audits

## 🎨 Customization

### **Styling**
- Modify `tailwind.config.js` for theme changes
- Update color schemes in component files
- Add custom CSS in `src/index.css`

### **Products**
- Update `src/data/products.ts` with your product data
- Connect to your backend API
- Implement product management system

### **Features**
- Add user authentication
- Implement product reviews
- Add inventory management
- Create admin dashboard

## 🐛 Troubleshooting

### **Common Issues**

**1. Razorpay not loading**
```bash
# Check if script is loaded in index.html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

**2. TypeScript errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Build errors**
```bash
# Check for unused imports
npm run lint
```


