const challenges = [
    {
        question: "Combien y a t-il de triangles dans l'image ?",
        imageURL: "",
        answers: [4, 7, 9, 10]
    }
]

document.addEventListener('DOMContentLoaded', () => {
    const challengesCount = challenges.length;
    const challengesCountElement = document.getElementById("challenges-count");

    challengesCountElement.textContent = challengesCount;
})

const startGameElement = document.getElementById("startGame");