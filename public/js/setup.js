document.getElementById('setupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
  
    const res = await fetch('/api/me/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age, height, weight })
    });
  
    if (res.ok) {
      window.location.href = '/dashboard.html';
    } else {
      document.getElementById('setupStatus').innerText = '❌ Failed to save profile.';
    }
  });
  