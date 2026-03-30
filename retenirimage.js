const DUREE_IMAGE = 10;
const POINTS_PAR_BONNE_REPONSE = 80;

const manches = [
	{
		label: "Salon lumineux",
		sceneAria: "Scene avec ballon rouge, tasse verte, lampe jaune et sac bleu",
		objets: [
			{ texte: "Ballon rouge", top: "14%", left: "12%", couleur: "#d7492f" },
			{ texte: "Tasse verte", top: "69%", left: "36%", couleur: "#1d9b61" },
			{ texte: "Lampe jaune", top: "22%", left: "72%", couleur: "#f19b1f", textColor: "#1f1a13" },
			{ texte: "Sac bleu", top: "76%", left: "74%", couleur: "#2f6ee2" }
		],
		questions: [
			{
				texte: "Quelle etait la couleur du ballon ?",
				options: ["Rouge", "Bleu", "Vert"],
				bonneReponse: "Rouge"
			},
			{
				texte: "Une lampe etait-elle presente ?",
				options: ["Oui", "Non"],
				bonneReponse: "Oui"
			},
			{
				texte: "De quelle couleur etait le sac ?",
				options: ["Bleu", "Noir", "Orange"],
				bonneReponse: "Bleu"
			}
		]
	},
	{
		label: "Cuisine coloree",
		sceneAria: "Scene avec livre violet, plante verte, mug orange et casque gris",
		objets: [
			{ texte: "Livre violet", top: "18%", left: "18%", couleur: "#6c4dbd" },
			{ texte: "Plante verte", top: "66%", left: "20%", couleur: "#2f8f58" },
			{ texte: "Mug orange", top: "30%", left: "60%", couleur: "#f2822e" },
			{ texte: "Casque gris", top: "74%", left: "66%", couleur: "#667085" }
		],
		questions: [
			{
				texte: "Quel objet etait violet ?",
				options: ["Le livre", "Le casque", "La plante"],
				bonneReponse: "Le livre"
			},
			{
				texte: "Le mug etait de quelle couleur ?",
				options: ["Orange", "Rouge", "Blanc"],
				bonneReponse: "Orange"
			},
			{
				texte: "Y avait-il une plante ?",
				options: ["Oui", "Non"],
				bonneReponse: "Oui"
			}
		]
	},
	{
		label: "Bureau creatif",
		sceneAria: "Scene avec clavier noir, carnet rose, gourde cyan et chaussettes jaunes",
		objets: [
			{ texte: "Clavier noir", top: "22%", left: "14%", couleur: "#2f2f34" },
			{ texte: "Carnet rose", top: "60%", left: "34%", couleur: "#db4f87" },
			{ texte: "Gourde cyan", top: "22%", left: "64%", couleur: "#1da8b5" },
			{ texte: "Chaussettes jaunes", top: "72%", left: "68%", couleur: "#f3bb2d", textColor: "#332400" }
		],
		questions: [
			{
				texte: "Quel objet etait noir ?",
				options: ["Le clavier", "Le carnet", "La gourde"],
				bonneReponse: "Le clavier"
			},
			{
				texte: "Le carnet etait de quelle couleur ?",
				options: ["Rose", "Bleu", "Marron"],
				bonneReponse: "Rose"
			},
			{
				texte: "Quelle couleur avait la gourde ?",
				options: ["Cyan", "Orange", "Blanc"],
				bonneReponse: "Cyan"
			}
		]
	},
	{
		label: "Atelier photo",
		sceneAria: "Scene avec appareil blanc, cadre rouge, trousse verte et cable bleu marine",
		objets: [
			{ texte: "Appareil blanc", top: "20%", left: "16%", couleur: "#f3f3f3", textColor: "#1a1f2c" },
			{ texte: "Cadre rouge", top: "62%", left: "20%", couleur: "#cc3f3f" },
			{ texte: "Trousse verte", top: "30%", left: "58%", couleur: "#2f8e53" },
			{ texte: "Cable bleu marine", top: "74%", left: "62%", couleur: "#27477e" }
		],
		questions: [
			{
				texte: "L'appareil photo etait de quelle couleur ?",
				options: ["Blanc", "Noir", "Argent"],
				bonneReponse: "Blanc"
			},
			{
				texte: "Quel objet etait rouge ?",
				options: ["Le cadre", "La trousse", "Le cable"],
				bonneReponse: "Le cadre"
			},
			{
				texte: "Le cable etait plutot...",
				options: ["Bleu marine", "Jaune", "Rose"],
				bonneReponse: "Bleu marine"
			}
		]
	},
	{
		label: "Coin lecture",
		sceneAria: "Scene avec coussin beige, tasse noire, tablette verte et lampe orange",
		objets: [
			{ texte: "Coussin beige", top: "20%", left: "18%", couleur: "#b59f7a" },
			{ texte: "Tasse noire", top: "70%", left: "30%", couleur: "#2e2e30" },
			{ texte: "Tablette verte", top: "28%", left: "62%", couleur: "#389f66" },
			{ texte: "Lampe orange", top: "72%", left: "68%", couleur: "#e1822c" }
		],
		questions: [
			{
				texte: "Quelle couleur avait le coussin ?",
				options: ["Beige", "Bleu", "Rouge"],
				bonneReponse: "Beige"
			},
			{
				texte: "La tasse etait-elle noire ?",
				options: ["Oui", "Non"],
				bonneReponse: "Oui"
			},
			{
				texte: "Quel objet etait vert ?",
				options: ["La tablette", "La lampe", "La tasse"],
				bonneReponse: "La tablette"
			}
		]
	}
];

const elBadgeEtape = document.getElementById("badge-etape");
const elScore = document.getElementById("score");
const elMetaScore = document.getElementById("meta-score");
const elScoreGain = document.getElementById("score-gain");
const elImageLabel = document.getElementById("image-label");
const elImageScene = document.getElementById("image-scene");
const elBarreTemps = document.getElementById("barre-temps");
const elAccroche = document.getElementById("accroche");
const elQuestionList = document.getElementById("question-list");
const elZoneJeu = document.getElementById("zone-jeu");
const elIntroCard = document.getElementById("intro-card");
const elJeuCard = document.getElementById("jeu-card");
const btnCommencer = document.getElementById("btn-commencer");
const btnSuivant = document.getElementById("btn-suivant");
const btnValider = document.getElementById("btn-valider");

let indexManche = 0;
let scoreTotal = 0;
let timerMasquage = null;
let mancheValidee = false;
let reponsesSelectionnees = new Map();
let phaseCourante = "image";
let indexQuestionCourante = 0;
let reponseCouranteSelectionnee = null;
let timerAnimationScore = null;

function mettreAJourTopbar() {
	const etape = String(indexManche + 1).padStart(2, "0");
	const total = String(manches.length).padStart(2, "0");
	elBadgeEtape.textContent = `Manche ${etape}/${total}`;
	elScore.textContent = `${scoreTotal} pts`;
}

function animerGainPoints(points) {
	if (!elMetaScore || !elScoreGain) {
		return;
	}

	clearTimeout(timerAnimationScore);
	elMetaScore.classList.remove("score-bump");
	elScoreGain.classList.remove("show");
	void elMetaScore.offsetWidth;

	elScoreGain.textContent = `+${points}`;
	elMetaScore.classList.add("score-bump");
	elScoreGain.classList.add("show");

	timerAnimationScore = window.setTimeout(() => {
		elMetaScore.classList.remove("score-bump");
		elScoreGain.classList.remove("show");
	}, 760);
}

function lancerBarreCompteRebours() {
	elBarreTemps.style.animation = "none";
	void elBarreTemps.offsetWidth;
	elBarreTemps.style.animation = `decompte ${DUREE_IMAGE}s linear 1 forwards`;
}

function rendreObjets(manche) {
	elImageScene.innerHTML = "";
	elImageScene.setAttribute("aria-label", manche.sceneAria);

	manche.objets.forEach((objet, idx) => {
		const span = document.createElement("span");
		span.className = "objet";
		span.textContent = objet.texte;
		span.style.top = objet.top;
		span.style.left = objet.left;
		span.style.background = objet.couleur;

		if (objet.textColor) {
			span.style.color = objet.textColor;
			span.style.textShadow = "none";
		}

		span.style.animationDelay = `${idx * 120}ms`;
		elImageScene.appendChild(span);
	});
}

function marquerOptionSelectionnee(questionIndex, reponse) {
	reponsesSelectionnees.set(questionIndex, reponse);

	const boutons = elQuestionList.querySelectorAll(`[data-question-index=\"${questionIndex}\"]`);
	boutons.forEach((btn) => {
		const estSelectionne = btn.dataset.value === reponse;
		btn.style.background = estSelectionne ? "#dce8ff" : "#ffffff";
		btn.style.borderColor = estSelectionne ? "#8ca8f3" : "#cad4e4";
	});
}

function rendreQuestions(manche) {
	elQuestionList.innerHTML = "";

	manche.questions.forEach((question, questionIndex) => {
		const article = document.createElement("article");
		article.className = "question-item";

		const p = document.createElement("p");
		p.textContent = `${questionIndex + 1}. ${question.texte}`;

		const chips = document.createElement("div");
		chips.className = "chips";

		question.options.forEach((option) => {
			const button = document.createElement("button");
			button.type = "button";
			button.textContent = option;
			button.dataset.questionIndex = String(questionIndex);
			button.dataset.value = option;
			button.addEventListener("click", () => {
				if (mancheValidee) {
					return;
				}
				marquerOptionSelectionnee(questionIndex, option);
			});
			chips.appendChild(button);
		});

		article.appendChild(p);
		article.appendChild(chips);
		elQuestionList.appendChild(article);
	});
}

function rendreQuestionCourante() {
	const manche = manches[indexManche];
	const question = manche.questions[indexQuestionCourante];

	if (!question) {
		terminerMancheQuestions();
		return;
	}

	elQuestionList.innerHTML = "";

	const article = document.createElement("article");
	article.className = "question-item";

	const p = document.createElement("p");
	p.textContent = `${indexQuestionCourante + 1}. ${question.texte}`;

	const chips = document.createElement("div");
	chips.className = "chips";
	reponseCouranteSelectionnee = reponsesSelectionnees.get(indexQuestionCourante) || null;

	question.options.forEach((option) => {
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = option;
		button.dataset.value = option;

		if (option === reponseCouranteSelectionnee) {
			button.style.background = "#dce8ff";
			button.style.borderColor = "#8ca8f3";
		}

		button.addEventListener("click", () => {
			if (phaseCourante !== "questions" || mancheValidee) {
				return;
			}

			reponseCouranteSelectionnee = option;
			reponsesSelectionnees.set(indexQuestionCourante, option);
			const boutons = chips.querySelectorAll("button");
			boutons.forEach((btn) => {
				const estSelectionne = btn.dataset.value === option;
				btn.style.background = estSelectionne ? "#dce8ff" : "#ffffff";
				btn.style.borderColor = estSelectionne ? "#8ca8f3" : "#cad4e4";
			});
			btnValider.disabled = false;
		});
		chips.appendChild(button);
	});

	article.appendChild(p);
	article.appendChild(chips);
	elQuestionList.appendChild(article);

	btnValider.textContent = "Valider ma reponse";
	btnValider.disabled = reponseCouranteSelectionnee === null;
	elAccroche.textContent = `Question ${indexQuestionCourante + 1}/${manche.questions.length}`;
}

function validerQuestionCourante() {
	if (phaseCourante !== "questions" || mancheValidee) {
		return;
	}

	const manche = manches[indexManche];
	const question = manche.questions[indexQuestionCourante];
	const reponse = reponsesSelectionnees.get(indexQuestionCourante);

	if (!question || !reponse) {
		return;
	}

	if (reponse === question.bonneReponse) {
		scoreTotal += POINTS_PAR_BONNE_REPONSE;
		animerGainPoints(POINTS_PAR_BONNE_REPONSE);
	}

	mettreAJourTopbar();
	indexQuestionCourante += 1;
	reponseCouranteSelectionnee = null;
	rendreQuestionCourante();
}

function masquerImage() {
	const objets = elImageScene.querySelectorAll(".objet");
	objets.forEach((objet) => {
		objet.style.filter = "blur(9px)";
		objet.style.opacity = "0.22";
	});
}

function afficherImage() {
	const objets = elImageScene.querySelectorAll(".objet");
	objets.forEach((objet) => {
		objet.style.filter = "none";
		objet.style.opacity = "1";
	});
}

function verifierReponses() {
	if (mancheValidee) {
		return;
	}

	const manche = manches[indexManche];
	let nbBonnes = 0;

	manche.questions.forEach((question, questionIndex) => {
		const reponse = reponsesSelectionnees.get(questionIndex);
		if (reponse === question.bonneReponse) {
			nbBonnes += 1;
		}
	});

	const pointsGagnes = nbBonnes * POINTS_PAR_BONNE_REPONSE;
	scoreTotal += pointsGagnes;
	mancheValidee = true;

	mettreAJourTopbar();
	elAccroche.textContent = `Resultat manche: ${nbBonnes}/${manche.questions.length} bonnes reponses (+${pointsGagnes} pts).`;
}

function terminerMancheQuestions() {
	if (mancheValidee) {
		return;
	}

	const manche = manches[indexManche];
	const nbBonnes = manche.questions.reduce((total, question, indexQuestion) => {
		const reponse = reponsesSelectionnees.get(indexQuestion);
		return total + (reponse === question.bonneReponse ? 1 : 0);
	}, 0);

	const pointsGagnes = nbBonnes * POINTS_PAR_BONNE_REPONSE;
	mancheValidee = true;

	elQuestionList.innerHTML = "";
	elAccroche.textContent = `Resultat manche: ${nbBonnes}/${manche.questions.length} bonnes reponses (+${pointsGagnes} pts).`;
	btnSuivant.hidden = false;
	btnSuivant.disabled = indexManche >= manches.length - 1;
	btnValider.textContent = "Valider mes reponses";
	btnValider.disabled = true;
	btnValider.hidden = true;

	if (indexManche === manches.length - 1) {
		afficherResumeFinal();
		indexManche = manches.length;
	}
}

function afficherResumeFinal() {
	clearTimeout(timerMasquage);
	phaseCourante = "final";
	elZoneJeu.classList.remove("phase-image", "phase-questions");

	const totalQuestions = manches.reduce((acc, manche) => acc + manche.questions.length, 0);
	const scoreMax = totalQuestions * POINTS_PAR_BONNE_REPONSE;

	elImageLabel.textContent = "Partie terminee";
	elImageScene.innerHTML = "";
	elImageScene.setAttribute("aria-label", "Resume final du mini jeu");

	const resume = document.createElement("span");
	resume.className = "objet";
	resume.textContent = `Score final ${scoreTotal}/${scoreMax} pts`;
	resume.style.top = "44%";
	resume.style.left = "50%";
	resume.style.transform = "translate(-50%, -50%)";
	resume.style.background = "#2f6ee2";
	resume.style.padding = "0.75rem 0.95rem";
	resume.style.fontSize = "0.95rem";
	elImageScene.appendChild(resume);

	elQuestionList.innerHTML = "";
	elAccroche.textContent = "Clique sur Recommencer pour rejouer toutes les manches.";
	btnValider.textContent = "Recommencer";
	btnValider.disabled = false;
	btnValider.hidden = false;
	btnSuivant.hidden = true;
	btnSuivant.disabled = true;
	elBarreTemps.style.animation = "none";
}

function afficherQuestionsApresImage() {
	phaseCourante = "questions";
	masquerImage();
	elZoneJeu.classList.remove("phase-image");
	elZoneJeu.classList.add("phase-questions");
	btnValider.hidden = false;
	btnSuivant.hidden = true;

	rendreQuestionCourante();
}

function afficherManche() {
	clearTimeout(timerMasquage);
	mancheValidee = false;
	reponsesSelectionnees = new Map();
	phaseCourante = "image";
	indexQuestionCourante = 0;
	reponseCouranteSelectionnee = null;

	const manche = manches[indexManche];

	mettreAJourTopbar();
	elImageLabel.textContent = `Observe et memorise: ${manche.label}`;
	elAccroche.textContent = "Observe l'image. Les questions arrivent apres le chrono.";
	btnValider.textContent = "Valider mes reponses";
	btnValider.disabled = true;
	btnValider.hidden = false;
	elZoneJeu.classList.remove("phase-questions");
	elZoneJeu.classList.add("phase-image");
	btnSuivant.hidden = true;
	btnSuivant.disabled = true;

	rendreObjets(manche);
	elQuestionList.innerHTML = "";
	afficherImage();
	lancerBarreCompteRebours();

	timerMasquage = window.setTimeout(afficherQuestionsApresImage, DUREE_IMAGE * 1000);
}

function demarrerPartie() {
	indexManche = 0;
	scoreTotal = 0;
	elIntroCard.classList.add("is-hidden");
	elJeuCard.classList.remove("is-hidden");
	afficherManche();
}

btnValider.addEventListener("click", () => {
	if (indexManche >= manches.length) {
		indexManche = 0;
		scoreTotal = 0;
		afficherManche();
		return;
	}

	if (phaseCourante === "questions") {
		validerQuestionCourante();
	}
});

btnSuivant.addEventListener("click", () => {
	if (indexManche >= manches.length - 1) {
		return;
	}

	indexManche += 1;
	afficherManche();
});

btnCommencer.addEventListener("click", demarrerPartie);
