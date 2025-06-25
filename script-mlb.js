async function fetchMLBScores() {
  const container = document.getElementById("scoresMLB");
  container.innerHTML = "<p>Loading scores...</p>";

  try {
    // Route through a CORS proxy so GitHub Pages can fetch ESPN's JSON
    const proxyUrl  = "https://corsproxy.io/?";
    const targetUrl = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard";
    const res       = await fetch(proxyUrl + targetUrl);
    const data      = await res.json();
    const games     = data.events;

    if (!games || games.length === 0) {
      container.innerHTML = "<p>No games today.</p>";
      return;
    }

    container.innerHTML = ""; // clear "Loading..." text

    games.forEach(game => {
      const comp  = game.competitions[0];
      const teams = comp.competitors;
      const status= comp.status.type.shortDetail;

      const home = teams.find(t => t.homeAway === "home");
      const away = teams.find(t => t.homeAway === "away");

      const div = document.createElement("div");
      div.className = "game";
      div.innerHTML = `
        <strong>${away.team.shortDisplayName}</strong> ${away.score} @
        <strong>${home.team.shortDisplayName}</strong> ${home.score}
        <br><small>${status}</small>
      `;
      container.appendChild(div);
    });
  }
  catch (err) {
    console.error("Failed to fetch MLB scores", err);
    container.innerHTML = "<p>Error loading scores.</p>";
  }
}

fetchMLBScores();
