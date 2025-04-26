// mafia.js

const assignRolesBtn = document.getElementById('assignRolesBtn');
const playersInput = document.getElementById('players');
const assignedRolesDiv = document.getElementById('assignedRoles');

assignRolesBtn.addEventListener('click', () => {
    const players = playersInput.value.split(',').map(name => name.trim()).filter(name => name !== '');
    if (players.length === 0) {
        alert('Please enter player names.');
        return;
    }

    const specialRoles = Array.from(document.querySelectorAll('.special-role:checked')).map(cb => cb.value);
    const mafiaRoles = Array.from(document.querySelectorAll('.mafia-role:checked')).map(cb => cb.value);

    const totalSpecialRoles = specialRoles.length + mafiaRoles.length;

    if (players.length < totalSpecialRoles) {
        alert('Not enough players for the selected roles.');
        return;
    }

    const roles = [];

    // Add special roles
    roles.push(...specialRoles);

    // Add Mafia roles
    mafiaRoles.forEach(() => roles.push('Mafia'));

    // Fill the rest with Villagers
    while (roles.length < players.length) {
        roles.push('Villager');
    }

    // Shuffle roles
    roles.sort(() => Math.random() - 0.5);

    // Assign roles
    assignedRolesDiv.innerHTML = '<h2>Assigned Roles</h2>';
    const ul = document.createElement('ul');
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${player}: ${roles[index]}`;
        ul.appendChild(li);
    });
    assignedRolesDiv.appendChild(ul);
});

// Timer
let timerInterval;
const startTimerBtn = document.getElementById('startTimerBtn');
const stopTimerBtn = document.getElementById('stopTimerBtn');
const timerDisplay = document.getElementById('timerDisplay');
const discussionDuration = document.getElementById('discussionDuration');

startTimerBtn.addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);

    let time = parseInt(discussionDuration.value);
    updateTimerDisplay(time);

    timerInterval = setInterval(() => {
        time--;
        updateTimerDisplay(time);

        if (time <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Time\'s up!';
        }
    }, 1000);
});

stopTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerDisplay.textContent = '';
});

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
