document.addEventListener("DOMContentLoaded", () => {
  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const grid = document.querySelector('.product-grid');
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <button class="buy-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">
            Buy ₹${product.price}
          </button>
        `;
        grid.appendChild(card);
      });

      setupCartButtons(); // Attach listeners after cards are rendered
    });
});

function setupCartButtons() {
  const buttons = document.querySelectorAll('.buy-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        price: btn.dataset.price
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('cart', JSON.stringify(cart));
window.location.href = "checkout.html";

    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  const cards = document.querySelectorAll('.product-card');
  const noResults = document.getElementById('no-results');
  const resetBtn = document.getElementById('reset-btn');

  function filterCards() {
    const searchValue = input.value.toLowerCase();
    let matches = 0;

    cards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const desc = card.getAttribute('data-description').toLowerCase();

      if (title.includes(searchValue) || desc.includes(searchValue)) {
        card.style.display = 'block';
        card.style.opacity = 0;
        setTimeout(() => card.style.opacity = 1, 100); // Smooth fade in
        matches++;
      } else {
        card.style.opacity = 0;
        setTimeout(() => card.style.display = 'none', 200); // Smooth fade out
      }
    });

    noResults.style.display = matches === 0 ? 'block' : 'none';
  }

  input.addEventListener('input', filterCards);
  resetBtn.addEventListener('click', () => {
    input.value = '';
    filterCards();
  });

  filterCards(); // initial check
});
