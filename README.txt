Ridhima Proposal Firebase Website

FILES:
- index.html = public proposal website
- style.css = cute white/pink design
- script.js = saves answers to Firestore
- dashboard.html = private dashboard page
- dashboard.js = Firebase login + answer viewer
- firestore-rules.txt = security rules to paste in Firebase

SETUP:
1. Replace your old website files with index.html, style.css and script.js.
2. Keep dashboard.html and dashboard.js in the same folder.
3. In Firebase Console, enable Email/Password Authentication.
4. Create your own user in Authentication > Users.
5. Open firestore-rules.txt.
6. Replace YOUR_EMAIL@example.com with your Firebase account email.
7. Paste the rules into Firestore > Rules and click Publish.
8. Run the public website with Live Server.
9. Open dashboard.html with Live Server to view answers.

IMPORTANT:
The visitor can submit answers without logging in. Only the specified email can read them.
