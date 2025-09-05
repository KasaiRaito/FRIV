function startWordle() {
  const container = document.getElementById("wordleContainer");
  container.innerHTML = "";

  const words = ["APPLE","GRAPE","MANGO","BERRY","LEMON","PEACH","CHILI","WATER","MELON"];
  const target = words[Math.floor(Math.random() * words.length)];

  let attempts = 6;
  const rows = [];

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateRows = `repeat(${attempts}, 1fr)`;
  grid.style.gap = "5px";
  container.appendChild(grid);

  for (let i=0; i<attempts; i++) {
    const row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = "repeat(5, 50px)";
    row.style.gap = "5px";
    row.style.justifyContent = "center";

    const cells = [];
    for (let j=0; j<5; j++) {
      const cell = document.createElement("input");
      cell.maxLength = 1;
      cell.style.width = "50px";
      cell.style.height = "50px";
      cell.style.textAlign = "center";
      cell.style.fontSize = "24px";
      cell.style.textTransform = "uppercase";
      row.appendChild(cell);
      cells.push(cell);
    }
    rows.push(cells);
    grid.appendChild(row);
  }

  const button = document.createElement("button");
  button.textContent = "Check Word";
  button.style.marginTop = "10px";
  container.appendChild(button);

  let currentRow = 0;

  button.addEventListener("click", () => {
    if (currentRow >= attempts) return;

    const guess = rows[currentRow].map(c => c.value.toUpperCase()).join("");
    if (guess.length !== 5) {
      alert("Enter a 5-letter word!");
      return;
    }

    for (let i=0;i<5;i++) {
      if (guess[i] === target[i]) {
        rows[currentRow][i].style.backgroundColor = "green";
        rows[currentRow][i].style.color = "white";
      } else if (target.includes(guess[i])) {
        rows[currentRow][i].style.backgroundColor = "gold";
      } else {
        rows[currentRow][i].style.backgroundColor = "gray";
        rows[currentRow][i].style.color = "white";
      }
      rows[currentRow][i].disabled = true;
    }

    if (guess === target) {
      alert("🎉 You found the word: " + target);
      return;
    }

    currentRow++;
    if (currentRow >= attempts) {
      alert("😢 Out of tries! The word was: " + target);
    }
  });
}
