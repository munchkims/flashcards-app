let cards = [];
let currentIndex = 0;
let showingFront = true;

// Load cards from JSON
fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    cards = data;
    loadProgress();
    showCard();
  });

const frontEl = document.getElementById('front');
const backEl = document.getElementById('back');

function showCard() {
  if (cards.length === 0) return;
  const card = cards[currentIndex];
  frontEl.textContent = card.front;
  backEl.textContent = card.back;
  frontEl.style.display = showingFront ? 'block' : 'none';
  backEl.style.display = showingFront ? 'none' : 'block';
}

document.getElementById('flip').addEventListener('click', () => {
  showingFront = !showingFront;
  showCard();
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  showingFront = true;
  showCard();
});

// Manual save/load
document.getElementById('save').addEventListener('click', () => {
  localStorage.setItem('flashcardsProgress', JSON.stringify({ currentIndex }));
  alert('Progress saved!');
});

document.getElementById('load').addEventListener('click', () => {
  loadProgress();
  showCard();
  alert('Progress loaded!');
});

function loadProgress() {
  const saved = localStorage.getItem('flashcardsProgress');
  if (saved) {
    const data = JSON.parse(saved);
    currentIndex = data.currentIndex || 0;
  }
}