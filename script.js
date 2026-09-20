import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPO4Fj_ZGcA-CVYo2IWOr4Tc49WlFx5A8",
  authDomain: "ridhima-proposal.firebaseapp.com",
  projectId: "ridhima-proposal",
  storageBucket: "ridhima-proposal.firebasestorage.app",
  messagingSenderId: "7466157324",
  appId: "1:7466157324:web:111ce1a1032b1d8b383529",
  measurementId: "G-V6WBB754SY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.nextSection = function (currentId, nextId) {
  const currentSection = document.getElementById(currentId);
  const nextSectionElement = document.getElementById(nextId);

  if (!currentSection || !nextSectionElement) {
    console.error("Section not found:", currentId, nextId);
    return;
  }

  currentSection.classList.remove("active");
  nextSectionElement.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

window.submitAnswer = async function (
  questionId,
  question,
  answer,
  nextId
) {
  const status = document.getElementById("save-status");

  try {
    await addDoc(collection(db, "responses"), {
      questionId: questionId,
      question: question,
      answer: answer,
      createdAt: serverTimestamp(),
      source: "Ridhima Proposal Website"
    });

    console.log("Answer saved successfully:", answer);

  } catch (error) {
    console.error("Firebase save error:", error);

    if (status) {
      status.textContent =
        "Answer save nahi ho paya. Please tell Meet.";
    }
  }

  const currentCard = document.querySelector(".card.active");

  if (currentCard) {
    window.nextSection(currentCard.id, nextId);
  }
};

function createFallingElement() {
  const container = document.getElementById("falling-container");

  if (!container) return;

  const item = document.createElement("span");

  item.className = "falling";
  item.textContent = Math.random() > 0.45 ? "💗" : "✨";

  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = Math.random() * 13 + 10 + "px";
  item.style.animationDuration = Math.random() * 5 + 5 + "s";
  item.style.animationDelay = Math.random() * 2 + "s";

  container.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 12000);
}

for (let i = 0; i < 45; i++) {
  setTimeout(createFallingElement, i * 100);
}

setInterval(createFallingElement, 500);