const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("Service Worker Registration Failed:", err));
  });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67+ from automatically showing the prompt
  e.preventDefault();
  deferredPrompt = e;

  // Show the install button
  installBtn.style.display = 'block';
});

// When the user clicks the install button
installBtn.addEventListener('click', async () => {
  // Hide the button
  installBtn.style.display = 'none';

  if (!deferredPrompt) return;

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user response
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the PWA install');
  } else {
    console.log('User dismissed the PWA install');
  }

  deferredPrompt = null;
});

