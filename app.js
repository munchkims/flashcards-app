// List of group  files
const groups = ['food.json', 'travel.json', 'test.json'];
const folderPath = 'flashcards/';

let cards = [];
let currentIndex = 0;
let showingFront = true;

const groupScreen = document.getElementById('group-screen');
const groupButtonsDiv = document.getElementById('group-buttons');
const flashcardScreen = document.getElementById('flashcard-screen');

const frontEl = document.getElementById('front');
const backEl = document.getElementById('back');

// Dynamically create buttons for each group
groups.forEach(group => {
  const btn = document.createElement('button');
  btn.textContent = group.replace('.json', ''); // nicer label
  btn.addEventListener('click', () => loadGroup(group));
  groupButtonsDiv.appendChild(btn);
});

// Load a group
function loadGroup(filename) {
  fetch(folderPath + filename)
    .then(res => res.json())
    .then(data => {
      cards = data;
      currentIndex = 0;
      showingFront = true;
      loadProgress(filename);
      showCard();
      // Switch screens
      groupScreen.style.display = 'none';
      flashcardScreen.style.display = 'block';
      currentGroup = filename;
    });
}

// Flip / next
document.getElementById('flip').addEventListener('click', () => {
  showingFront = !showingFront;
  showCard();
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  showingFront = true;
  showCard();
});

// Save / load
document.getElementById('save').addEventListener('click', () => {
  localStorage.setItem('flashcardsProgress_' + currentGroup, JSON.stringify({ currentIndex }));
  alert('Progress saved!');
});

document.getElementById('load').addEventListener('click', () => {
  loadProgress(currentGroup);
  showCard();
  alert('Progress loaded!');
});

document.getElementById('back-to-groups').addEventListener('click', () => {
  flashcardScreen.style.display = 'none';
  groupScreen.style.display = 'block';
});

// Show card
function showCard() {
  if (cards.length === 0) return;
  const card = cards[currentIndex];
  frontEl.textContent = card.front;
  backEl.textContent = card.back;
  frontEl.style.display = showingFront ? 'block' : 'none';
  backEl.style.display = showingFront ? 'none' : 'block';
}

// Load progress
function loadProgress(group) {
  const saved = localStorage.getItem('flashcardsProgress_' + group);
  if (saved) {
    const data = JSON.parse(saved);
    currentIndex = data.currentIndex || 0;
  } else {
    currentIndex = 0;
  }
}