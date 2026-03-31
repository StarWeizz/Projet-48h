let level = 1;
let sequence = [];
let speed = 1000;
let isPlaying = false;
let score = 0;

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
	score++;
	if (level < 3) {
		level++;
		updateUI();

		document.getElementById("answer").value = "";
		document.getElementById("resultStatus").textContent = "";
		document.getElementById("display").textContent = 'Clique sur "Lancer"';
		document.getElementById("next").classList.add("hidden");
		document.getElementById("retry").classList.add("hidden");
	} else {
		document.getElementById("next").classList.add("hidden");
		document.getElementById("resultStatus").textContent = "Bravo, tu as terminé le jeu ! 🏆";

		if (typeof Quiz48h !== 'undefined') {
			Quiz48h.saveScore('number', 'Séquences de chiffres', score, 3);
			const container = document.getElementById("resultStatus").parentNode;
			const scoresDiv = document.createElement('div');
			scoresDiv.style.marginTop = '1.5rem';
			scoresDiv.innerHTML = '<h3 style="margin-bottom:0.5rem;">Meilleurs scores</h3><div id="end-scores-list"><p style="color:#888;font-style:italic;">Chargement...</p></div>';
			container.appendChild(scoresDiv);
			Quiz48h.getScores('number').then(function(scores) {
				Quiz48h.renderScoreList(scores, document.getElementById('end-scores-list'));
			});
		}
	}
}

updateUI();
