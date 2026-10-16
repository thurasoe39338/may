const destination = "https://t.me/channel_h1_bot/watch/";
const copyButton = document.getElementById("copy-btn");
const buttonText = document.getElementById("button-text");
const statusText = document.getElementById("status");
document.getElementById("year").textContent = new Date().getFullYear();

copyButton.addEventListener("click", async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(destination);
    } else {
      const input = document.createElement("textarea");
      input.value = destination;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);
      const ok = document.execCommand("copy");
      input.remove();
      if (!ok) throw new Error("Copy failed");
    }
    buttonText.textContent = "Link Copy ကူးပြီးပါပြီ ✓";
    statusText.textContent = "Telegram မှာ Paste လုပ်ပြီး ဖွင့်ကြည့်နိုင်ပါတယ်။";
    statusText.className = "status success";
  } catch (err) {
    statusText.textContent = "Copy မရပါက Link ကို ဖိထားပြီး Copy ကို ရွေးပါ။";
    statusText.className = "status error";
  }
});

const cards = [...document.querySelectorAll("[data-image]")];
const viewer = document.getElementById("image-viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerTitle = document.getElementById("viewer-title");
let activeIndex = 0;
function showImage(index) {
  activeIndex = (index + cards.length) % cards.length;
  const card = cards[activeIndex];
  viewerImage.src = card.dataset.image;
  viewerImage.alt = card.dataset.title;
  viewerTitle.textContent = card.dataset.title;
}
cards.forEach((card, index) => card.addEventListener("click", () => {
  showImage(index);
  if (typeof viewer.showModal === "function") viewer.showModal();
  else viewer.setAttribute("open", "");
}));
document.getElementById("close-viewer").addEventListener("click", () => viewer.close());
document.getElementById("prev-image").addEventListener("click", () => showImage(activeIndex - 1));
document.getElementById("next-image").addEventListener("click", () => showImage(activeIndex + 1));
viewer.addEventListener("click", event => { if (event.target === viewer) viewer.close(); });
document.addEventListener("keydown", event => {
  if (!viewer.open) return;
  if (event.key === "ArrowLeft") showImage(activeIndex - 1);
  if (event.key === "ArrowRight") showImage(activeIndex + 1);
});
