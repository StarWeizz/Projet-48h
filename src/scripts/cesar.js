const userDecallage = 14;

const challenges = [
  {
    code: "Ov ciowg eiobr asas",
    resultat: "Ah ouais quand meme",
    decallage: 14,
  },
  {
    code: "d gtbwul xgfulagffw snwu dw ugvw",
    resultat: "l object fonctionne avec le code",
    decallage: 18,
  },
];

function decodeText(text, decallage) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let index = 0; index < text.length; index++) {
    const originalChar = text[index];
    const lowerChar = originalChar.toLowerCase();
    const alphabetIndex = alphabet.indexOf(lowerChar);

    if (alphabetIndex === -1) {
      result += originalChar;
      continue;
    }

    let newIndex = (alphabetIndex - decallage) % 26;
    if (newIndex < 0) {
      newIndex += 26;
    }

    const decodedChar = alphabet[newIndex];
    result +=
      originalChar === originalChar.toUpperCase()
        ? decodedChar.toUpperCase()
        : decodedChar;
  }

  return result;
}

function checkResult(decoded, expected) {
  return decoded === expected ? "Win" : "Defaite";
}

function decodeChallenge(challenge, fallbackDecallage) {
  const decallage =
    typeof challenge.decallage === "number"
      ? challenge.decallage
      : fallbackDecallage;
  const decoded = decodeText(challenge.code, decallage);
  const status = checkResult(decoded, challenge.resultat);

  console.log(status);
  console.log(`Décalage ${decallage} → ${decoded}`);
}

for (const challenge of challenges) {
  decodeChallenge(challenge, userDecallage);
}
