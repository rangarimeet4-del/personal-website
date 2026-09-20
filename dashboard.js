import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

const loginCard = document.getElementById("login-card");
const dashboard = document.getElementById("dashboard-content");
const status = document.getElementById("login-status");
const list = document.getElementById("responses-list");

document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    status.textContent = "Email aur password dono bharo.";
    return;
  }

  status.textContent = "Signing in...";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginCard.classList.remove("active");
    dashboard.classList.add("active");
    await loadResponses();
  } catch (error) {
    console.error(error);
    status.textContent = "Login failed. Email/password check karo.";
  }
});

async function loadResponses() {
  list.textContent = "Loading responses...";
  try {
    const responseQuery = query(collection(db, "responses"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(responseQuery);
    list.innerHTML = "";

    if (snapshot.empty) {
      list.textContent = "Abhi koi response nahi aaya.";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("div");
      item.className = "response";

      const question = document.createElement("div");
      question.innerHTML = "<strong>Question:</strong> ";
      question.append(document.createTextNode(data.question || "—"));

      const answer = document.createElement("div");
      answer.innerHTML = "<strong>Answer:</strong> ";
      answer.append(document.createTextNode(data.answer || "—"));

      const time = document.createElement("div");
      time.className = "muted";
      const dateText = data.createdAt?.toDate
        ? data.createdAt.toDate().toLocaleString()
        : "Time unavailable";
      time.textContent = dateText;

      item.append(question, answer, time);
      list.appendChild(item);
    });
  } catch (error) {
    console.error(error);
    list.textContent = "Responses load nahi ho paaye. Firestore rules check karo.";
  }
}

document.getElementById("refresh-btn").addEventListener("click", loadResponses);

document.getElementById("logout-btn").addEventListener("click", async () => {
  await signOut(auth);
  dashboard.classList.remove("active");
  loginCard.classList.add("active");
  status.textContent = "";
});

window.loadResponses = loadResponses;
