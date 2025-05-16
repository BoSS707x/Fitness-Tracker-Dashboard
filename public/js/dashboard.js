document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '/auth/logout';
});

async function fetchUser() {
  const res = await fetch('/api/me');
  const user = await res.json();
  document.getElementById('displayName').innerText = user.displayName || 'User';
}

function groupByDate(workouts) {
  const map = {};
  workouts.forEach(w => {
    const date = new Date(w.createdAt).toLocaleDateString();
    if (!map[date]) map[date] = [];
    map[date].push(w);
  });
  return map;
}

async function fetchWorkouts() {
  const res = await fetch('/api/workouts');
  const workouts = await res.json();
  const grouped = groupByDate(workouts);
  const list = document.getElementById('workoutHistory');
  list.innerHTML = '';

  for (const date in grouped) {
    const section = document.createElement('li');
    section.innerHTML = `<strong>${date}</strong><ul></ul>`;
    grouped[date].forEach(w => {
      const item = document.createElement('li');
      item.innerHTML = `
        ${w.type} - ${w.duration}min - ${w.calories}cal
        <button onclick="deleteWorkout('${w._id}')">🗑️</button>
      `;
      section.querySelector('ul').appendChild(item);
    });
    list.appendChild(section);
  }

  updateChart(workouts);
}

async function deleteWorkout(id) {
  await fetch(`/api/workouts/${id}`, { method: 'DELETE' });
  fetchWorkouts();
}

document.getElementById('workoutForm').addEventListener('submit', async e => {
  e.preventDefault();
  const type = document.getElementById('type').value.trim();
  const duration = Number(document.getElementById('duration').value);
  const calories = Number(document.getElementById('calories').value);

  await fetch('/api/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, duration, calories })
  });

  document.getElementById('workoutForm').reset();
  fetchWorkouts();
});

function updateChart(workouts) {
  const ctx = document.getElementById('progressChart').getContext('2d');
  const labels = workouts.map(w => new Date(w.createdAt).toLocaleDateString());
  const calories = workouts.map(w => w.calories);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Calories Burned',
        data: calories,
        borderColor: '#00bcd4',
        backgroundColor: 'transparent',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: '#ccc' } },
        y: { ticks: { color: '#ccc' } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchUser();
  fetchWorkouts();
});
