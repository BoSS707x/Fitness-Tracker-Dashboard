// Fetch and display progress chart
document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('progressChart').getContext('2d');
  
    // Fetch user's workout data
    const res = await fetch('/api/workouts');
    const data = await res.json();
  
    const labels = data.map(workout => new Date(workout.date).toLocaleDateString());
    const calories = data.map(workout => workout.calories);
  
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Calories Burned',
          data: calories,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1
        }]
      }
    });
  });
  