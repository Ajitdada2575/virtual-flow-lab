async function loadFeedback(){

  const res = await fetch("http://localhost:5000/api/feedback");
  const data = await res.json();

  const table = document.getElementById("table");

  table.innerHTML = "";

  let counts = {
    Excellent:0,
    Good:0,
    Average:0,
    Poor:0
  };

  data.forEach(f => {

    const rating = JSON.parse(f.rating);

    // count Q1 for graph (you can expand later)
    counts[rating.q1]++;

    table.innerHTML += `
      <tr>
        <td>${f.user_id}</td>
        <td>${rating.q1}</td>
        <td>${rating.q2}</td>
        <td>${rating.q3}</td>
        <td>${rating.q4}</td>
        <td>${new Date(f.created_at).toLocaleString()}</td>
      </tr>
    `;
  });

  createChart(counts);
}

function createChart(counts){

  const total =
    counts.Excellent +
    counts.Good +
    counts.Average +
    counts.Poor;

  const data = [
    percent(counts.Excellent, total),
    percent(counts.Good, total),
    percent(counts.Average, total),
    percent(counts.Poor, total)
  ];

  new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: ["Excellent","Good","Average","Poor"],
      datasets: [{
        data: data,
        backgroundColor: [
          "#00ff9c",
          "#4dabf7",
          "#ffd43b",
          "#ff6b6b"
        ]
      }]
    }
  });

}

function percent(val,total){
  return total ? ((val/total)*100).toFixed(1) : 0;
}

loadFeedback();