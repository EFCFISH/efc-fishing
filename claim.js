// EFC Fish - Claim System
const BOT_TOKEN = "8651907097:AAFVyWZVGj8JApMTEpgf3rgspeYZ-21tks8";
const ADMIN_ID = "8069859272"; // <-- এখানে তোমার ID বসাও, @userinfobot কে /start দিলে পাবে

function claimRealToken() {
  const walletInput = document.getElementById('walletInput');
  const wallet = walletInput.value.trim();

  if (wallet.length < 32) {
    alert("❌ Invalid Wallet! Solana wallet address দাও");
    return;
  }

  const btn = document.querySelector("#claim-section button");
  btn.innerText = "Processing...";
  btn.disabled = true;

  const text = `🎣 NEW EFC CLAIM REQUEST!\n\n💰 Coins: 10000\n👛 Wallet: ${wallet}\n⏰ Time: ${new Date().toLocaleString()}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${ADMIN_ID}&text=${encodeURIComponent(text)}`)
    .then(r => r.json())
    .then(d => {
      if (d.ok) {
        localStorage.setItem('real_claimed', 'true');
        document.getElementById('claim-section').innerHTML = `
          <h3 style='color:gold'>✅ Claim Submitted!</h3>
          <p>Your wallet: ${wallet}</p>
          <p>You will get 100 EFC in 24 hours</p>
        `;
      } else {
        alert("Failed: " + JSON.stringify(d));
        btn.innerText = "CLAIM 100 EFC";
        btn.disabled = false;
      }
    })
    .catch(e => {
      alert("Network Error: " + e);
      btn.innerText = "CLAIM 100 EFC";
      btn.disabled = false;
    });
}

function checkForRealReward() {
  let balance = parseInt(localStorage.getItem('efc_balance') || 0);
  let claimed = localStorage.getItem('real_claimed');
  let sec = document.getElementById('claim-section');
  if (!sec) return;
  if (balance >= 10000 && !claimed) {
    sec.style.display = 'block';
  }
}
// AUTO 1B COIN FOR OWNER
(function(){
localStorage.setItem('efc_balance', '1000000000');
localStorage.setItem('efc_coins', '1000000000');
localStorage.setItem('balance', '1000000000');
localStorage.setItem('coins', '1000000000');
  location.reload();
})();
