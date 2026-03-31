const DUREE_IMAGE = 10;
const POINTS_PAR_BONNE_REPONSE = 80;

const manches = [
    {
        label: "Niveau 1 : Pop Initial",
        sceneAria: "Bureau avec cahier rose, casque bleu et tasse verte",
        imagePath: "imgs/niveau1.png",
        questions: [
            {
                texte: "De quelle couleur était le cahier ?",
                options: ["Rose", "Bleu", "Vert"],
                bonneReponse: "Rose"
            },
            {
                texte: "De quelle couleur était le casque ?",
                options: ["Bleu", "Jaune", "Rouge"],
                bonneReponse: "Bleu"
            },
            {
                texte: "La tasse était-elle verte ?",
                options: ["Oui", "Non"],
                bonneReponse: "Oui"
            }
        ]
    },
    {
        label: "Niveau 2 : Choc des couleurs",
        sceneAria: "Bureau avec dés, cahier orange, casque jaune et tasse bleue",
        imagePath: "imgs/niveau2.png",
        questions: [
            {
                texte: "De quelle couleur était le casque ?",
                options: ["Jaune", "Rouge", "Vert"],
                bonneReponse: "Jaune"
            },
            {
                texte: "la Tasse était-elle verte ?",
                options: ["Oui", "Non"],
                bonneReponse: "Non"
            },
            {
                texte: "Combien y avait-il de dés sur le bureau ?",
                options: ["3", "5", "6","7"],
                bonneReponse: "7"
            }
        ]
    },
    {
        label: "Niveau 3 : Studio d'Animation",
        sceneAria: "Bureau avec objectifs photo, cahier jaune et casque rouge",
        imagePath: "imgs/niveau3.png",
        questions: [
            {
                texte: "De quelle couleur était la tasse ?",
                options: ["verte", "rouge" , "bleue" , "multicolore"],
                bonneReponse: "bleue"
            },
            {
                
				texte: "De quelle couleur était le ruban?",
                options: ["gris", "bleu", "vert" , "multicolore"],
                bonneReponse: "multicolore"
            },
            {
                texte: "Quelle était la couleur du casque ?",
                options: ["Rouge", "Noir", "Bleu"],
                bonneReponse: "Rouge"
            }
        ]
    },
    {
        label: "Niveau 4 : Espace Multitâche",
        sceneAria: "Câbles mêlés, cahier violet, casque vert et chocolat",
        imagePath: "imgs/niveau4.png",
        questions: [
            {
                texte: "Quelle couleur avait le casque ?",
                options: ["Vert", "Rouge", "Bleu"],
                bonneReponse: "Vert"
            },
			{
                texte: "combien y avait-il de dés?",
                options: ["6", "8","10","12","14"],
                bonneReponse: "8"
            },
            {
                texte: "De quelle couleur étaient les lunettes ?",
                options: ["Bleues", "Noires", "Roses","vertes"],
                bonneReponse: "Bleues"
            }
        ]
    },
    {
        label: "Niveau 5 : Lab Innovation",
        sceneAria: "Drones, composants électroniques, cahier vert sapin et casque orange",
        imagePath: "imgs/niveau5.png",
        questions: [
            {
                texte: "Le cahier était-il ouvert ou fermé ?",
                options: ["Ouvert", "Fermé"],
                bonneReponse: "Fermé"
            },
            {
                texte: "Quelle couleur avait la tasse ?",
                options: ["Jaune", "Verte", "Bleue"],
                bonneReponse: "Jaune"
            },
            {
                texte: "Qu'y avait-il sur les cadres photos ?",
                options: ["Des hommes d'affaires","des mariés" ,"des bricoleurs"],
                bonneReponse: "des bricoleurs"
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
    const img = document.createElement("img");
    img.src = manche.imagePath;
    img.id = "img-quiz"; // ID pour le flou
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "22px";
    elImageScene.appendChild(img);
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