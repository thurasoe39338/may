const destination = "https://t.me/channel_h1_bot/watch/";
const button = document.getElementById("copy-btn");
const buttonText = document.getElementById("button-text");
const status = document.getElementById("status");
document.getElementById("year").textContent = new Date().getFullYear();

button.addEventListener("click", async () => {
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
      if (!ok) throw new Error("Copy unavailable");
    }
    buttonText.textContent = "Link Copy ကူးပြီးပါပြီ ✓";
    status.textContent = "Telegram မှာ Paste လုပ်ပြီး ဖွင့်ကြည့်နိုင်ပါတယ်။";
    status.className = "status success";
  } catch (e) {
    status.textContent = "Copy မရပါက အပေါ်က Link ကို ဖိထားပြီး Copy ကို ရွေးပါ။";
    status.className = "status error";
  }
});
