// auth.js
export const auth = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,

  login() {
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', true);
  },

  logout() {
    this.isAuthenticated = false;
    localStorage.setItem('isAuthenticated', false);
  },
};
