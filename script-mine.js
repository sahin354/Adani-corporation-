document.addEventListener('DOMContentLoaded', () => {
    const profileIdEl = document.getElementById('profileId');
    const profileEmailEl = document.getElementById('profileEmail');
    const profileBalanceEl = document.getElementById('profileBalance');
    const logoutBtn = document.getElementById('logoutBtn');
    const rechargeBtn = document.getElementById('rechargeBtn');
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    profileIdEl.textContent = `ID: ${userData.userId || 'N/A'}`;
                    profileEmailEl.textContent = userData.email || user.email;
                    profileBalanceEl.textContent = `₹${(userData.balance || 0).toFixed(2)}`;
                }
            });
        } else {
            window.location.href = 'login.html';
        }
    });

    // --- Logic for the Recharge Button ---
    if (rechargeBtn) {
        rechargeBtn.addEventListener('click', () => {
            // This correctly takes the user to the recharge page
            window.location.href = 'recharge.html';
        });
    }

    // --- Logic for the Log Out Button ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // This correctly signs the user out
            firebase.auth().signOut().then(() => {
                window.location.href = 'login.html';
            });
        });
    }
});
