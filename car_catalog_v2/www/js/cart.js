// ===== Shopping Cart Object =====
const ShoppingCart = {
  items: [],
  
  // Add item to cart
  addItem: function(id, name, price, quantity) {
    const existingItem = this.items.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      this.items.push({
        id: id,
        name: name,
        price: parseFloat(price),
        quantity: parseInt(quantity)
      });
    }
    
    this.saveToLocalStorage();
    this.updateCartBadge();
  },
  
  // Remove item from cart
  removeItem: function(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToLocalStorage();
    this.updateCartBadge();
  },
  
  // Update item quantity
  updateQuantity: function(id, quantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = parseInt(quantity);
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.saveToLocalStorage();
      }
    }
    this.updateCartBadge();
  },
  
  // Get total price
  getTotalPrice: function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  // Get total items count
  getTotalItems: function() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },
  
  // Save to localStorage
  saveToLocalStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },
  
  // Load from localStorage
  loadFromLocalStorage: function() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  },
  
  // Update cart badge
  updateCartBadge: function() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.getTotalItems();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  },
  
  // Clear cart
  clearCart: function() {
    this.items = [];
    this.saveToLocalStorage();
    this.updateCartBadge();
  }
};

// Load cart when page loads
document.addEventListener('DOMContentLoaded', function() {
  ShoppingCart.loadFromLocalStorage();
  ShoppingCart.updateCartBadge();
});

// Add to cart function
function addToCart(event) {
  event.preventDefault();
  
  const form = event.target;
  const carId = form.getAttribute('data-car-id');
  const carName = form.getAttribute('data-car-name');
  const carPrice = form.getAttribute('data-car-price');
  const quantity = form.querySelector('select').value;
  
  ShoppingCart.addItem(carId, carName, carPrice, quantity);
  
  // Show success message
  alert(`${carName} added to cart!`);
}
