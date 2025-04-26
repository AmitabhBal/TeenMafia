// Teen Patti Page Script

const baseAmount = 100; // starting amount

// Function to deduct 10 from Amount
function bet10() {
    const rows = document.querySelectorAll("#gameTable tbody tr");

    rows.forEach(row => {
        const amountCell = row.querySelector(".amount");

        let amount = parseInt(amountCell.innerText) || 0;

        // Subtract 10 for the bet
        amount -= 10;

        // Update amount
        amountCell.innerText = amount;
    });
}

const wonBtn = document.getElementById('wonBtn');

wonBtn.addEventListener('click', () => {
    const amountCell = document.querySelector(".amount"); // Only the first .amount
    let currentAmount = parseInt(amountCell.innerText) || 0;

    const winAmount = prompt("Enter the amount you won:");
    if (winAmount !== null && !isNaN(winAmount) && Number(winAmount) >= 0) {
        currentAmount += Number(winAmount); // Add to current
        amountCell.innerText = currentAmount; // Update cell

        // Flash effect
        // Flash effect - Flash 3 times, each lasting 2 seconds
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            // Alternate between limegreen and original color
            if (amountCell.style.color === 'limegreen') {
                amountCell.style.color = ''; // Reset to original color
            } else {
                amountCell.style.color = 'limegreen'; // Change to limegreen
            }

            // Increment flash count
            flashCount++;

            // Stop the flashing after 3 flashes
            if (flashCount >= 5) {
                clearInterval(flashInterval);
                // Reset color to default after final flash
                amountCell.style.color = '';
            }
        }, 2000); // Flash every 2 seconds

        // Trigger confetti effect
        confetti({
            particleCount: 200,      // Number of confetti particles
            spread: 70,              // Spread of the confetti
            origin: { x: 0.5, y: 0.5 },  // Origin of the confetti (center)
            colors: ['#ff0', '#0f0', '#f00', '#00f'], // Color of the confetti
            scalar: 1.2,             // Size of the confetti
            disableForReducedMotion: true
        });

        // Keep the confetti running for 3-5 seconds
        setTimeout(() => {
            confetti.reset();
        }, 5000); // Stops after 5 seconds
    } else {
        alert("Please enter a valid positive number.");
    }
});


// Function to add Bank Loan to Amount WITHOUT resetting loan
// Function to add Bank Loan input to Amount and accumulate loan
function addLoan() {
    const rows = document.querySelectorAll("#gameTable tbody tr");

    rows.forEach(row => {
        const bankLoanCell = row.querySelector(".bank-loan");
        const amountCell = row.querySelector(".amount");

        let enteredLoan = parseInt(bankLoanCell.innerText) || 0;
        let currentAmount = parseInt(amountCell.innerText) || 0;
        let currentLoan = parseInt(bankLoanCell.getAttribute('data-total-loan')) || 0;

        // If it's the first time, initialize data attribute
        if (isNaN(currentLoan)) currentLoan = 0;

        // Add the entered loan to amount
        currentAmount += enteredLoan;

        // Add the entered loan to total bank loan
        currentLoan += enteredLoan;

        // Update amount and bank loan
        amountCell.innerText = currentAmount;
        bankLoanCell.innerText = currentLoan;

        // Save new loan in data attribute (optional for tracking)
        bankLoanCell.setAttribute('data-total-loan', currentLoan);
    });
}


// Function to clear Bank Loan and deduct it from Amount
function clearDebt() {
    const rows = document.querySelectorAll("#gameTable tbody tr");

    rows.forEach(row => {
        const bankLoanCell = row.querySelector(".bank-loan");
        const amountCell = row.querySelector(".amount");

        let currentLoan = parseInt(bankLoanCell.innerText) || 0;
        let currentAmount = parseInt(amountCell.innerText) || 0;

        // Deduct the loan from amount
        currentAmount -= currentLoan;

        // Set amount and reset bank loan
        amountCell.innerText = currentAmount;
        bankLoanCell.innerText = "0";

        // Reset any stored data attribute if used
        bankLoanCell.setAttribute('data-total-loan', 0);
    });
}

