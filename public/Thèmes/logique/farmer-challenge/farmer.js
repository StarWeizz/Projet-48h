function checkAnswer() {
  const poulesInput = document.getElementById("poules");
  const lapinsInput = document.getElementById("lapins");
  const result = document.getElementById("result");

  if (!poulesInput.value || !lapinsInput.value) {
    result.textContent = "Les deux champs sont obligatoires";
    result.style.color = "orange";
    return;
  }

  const poules = Number(poulesInput.value);
  const lapins = Number(lapinsInput.value);

  if (poules + lapins !== 100) {
    result.textContent = "Le total doit etre 100";
    result.style.color = "orange";
    return;
  }

  if (poules === 62 && lapins === 38) {
    result.textContent = "Correct !";
    result.style.color = "green";
  } else {
    result.textContent = "Mauvaise reponse";
    result.style.color = "red";
  }
}
