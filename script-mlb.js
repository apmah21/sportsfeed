async function fetchMLBScores() {
  const container = document.getElementById("scoresMLB");
  container.innerHTML = "<p>Loading scores...</p>";

  try {
    const res = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard");
    const data = await res.json();
    const games = data.events;

    if (games.length === 0) {
      container.innerHTML = "<p>No games today.</p>";
      return;
    }

    container.innerHTML = ""; // Clear loading message

    games.forEach(game => {
      const competition = game.competitions[0];
      const teams = competition.competitors;
      const status = competition.status.type.shortDetail;

      const home = teams.find(t => t.homeAway === "home");
      const away = teams.find(t => t.homeAway === "away");

      const div = document.createElement("div");
      div.style.marginBottom = "1em";
      div.innerHTML = `
        <strong>${away.team.shortDisplayName}</strong> ${away.score} @ 
        <strong>${home.team.shortDisplayName}</strong> ${home.score}
        <br><small>${status}</small>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Failed to fetch MLB scores", error);
    container.innerHTML = "<p>Error loading scores.</p>";
  }
}

fetchMLBScores();
