let level = 1;
let sequence = [];
let speed = 1000;
let isPlaying = false;

function updateUI() {
	document.getElementById("levelLabel").textContent = `Niveau ${level} / 3`;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startLevel() {
	if (isPlaying) return;
	isPlaying = true;

	document.getElementById("answer").value = "";
	document.getElementById("resultStatus").textContent = "";
	document.getElementById("retry").classList.add("hidden");
	document.getElementById("next").classList.add("hidden");

	if (level === 1) {
		speed = 1000;
		generateSequence(4);
	} else if (level === 2) {
		speed = 600;
		generateSequence(6);
	} else {
		speed = 400;
		generateSequence(8);
	}

	await countdown();
	await showSequence();

	isPlaying = false;
}

function generateSequence(length) {
	sequence = [];
	for (let i = 0; i < length; i++) {
		sequence.push(Math.floor(Math.random() * 10));
	}
}

async function countdown() {
	const display = document.getElementById("display");

	for (let i = 3; i > 0; i--) {
		display.textContent = i;
		await sleep(700);
	}

	display.textContent = "Go !";
	await sleep(500);
	display.textContent = "";
}

async function showSequence() {
	let display = document.getElementById("display");

	for (let i = 0; i < sequence.length; i++) {
		display.textContent = sequence[i];
		await sleep(speed);

		// IMPORTANT : on efface entre chaque chiffre
		display.textContent = "";
		await sleep(300);
	}
}

function checkAnswer() {
	let input = document.getElementById("answer").value;
	let status = document.getElementById("resultStatus");

	if (input === sequence.join("")) {
		status.textContent = "Win ✅";
		document.getElementById("next").classList.remove("hidden");
	} else {
		status.textContent = "Perdu ❌";
		document.getElementById("retry").classList.remove("hidden");
	}
}

function retryLevel() {
	startLevel();
}

function nextLevel() {
	if (level < 3) {
		level++;
		updateUI();

		document.getElementById("answer").value = "";
		document.getElementById("resultStatus").textContent = "";
		document.getElementById("display").textContent = 'Clique sur "Lancer"';
		document.getElementById("next").classList.add("hidden");
		document.getElementById("retry").classList.add("hidden");
	} else {
		alert("Bravo, tu as terminé le jeu !");
		location.reload();
	}
}

updateUI();
