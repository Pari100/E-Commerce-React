import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Product } from '../types';

interface CartState {
  cart: Cart;
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'OPEN_CART' };

const initialState: CartState = {
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  isOpen: false,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const calculateCartTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.cart.items.find(item => item.product.id === action.payload.id);
      let newItems: CartItem[];
      
      if (existingItem) {
        newItems = state.cart.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.cart.items, { product: action.payload, quantity: 1 }];
      }
      
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount,
        },
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.cart.items.filter(item => item.product.id !== action.payload);
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount,
        },
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.cart.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount,
        },
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: initialState.cart,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};