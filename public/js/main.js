document.getElementById('loginBtn').addEventListener('click', () => {
  window.location.href = '/auth/google';
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '/auth/logout';
});
