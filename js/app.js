import { users } from "../data/data.js";


let usersData = [...users];

const usersWrappaerEl = document.querySelector(".users-container");
const addBtn = document.getElementById("add-user-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const closeModalXBtn = document.getElementById("close-modal-x");
const form = document.getElementById("add-user-form");


function updateUi(arr) {
  usersWrappaerEl.innerHTML = ""; 

  arr.forEach((item) => {
    let { id, name, email, role, isActive } = item;
    let avatar = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

    usersWrappaerEl.innerHTML += `
      <div class="user-card">
        <!-- SVG Ikonkali o'chirish tugmasi -->
        <button data-id="${id}" class="user-card__delete-btn" title="O'chirish">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
        
        <div class="user-card__header">
          <div class="user-card__avatar">${avatar}</div>
          <div class="user-card__info">
            <h3 class="user-card__name">${name}</h3>
            <p class="user-card__email">${email}</p>
          </div>
        </div>
        
        <div class="user-card__footer">
          <span class="user-card__role">${role}</span>
          <span class="user-card__status ${isActive ? 'user-card__status--active' : 'user-card__status--inactive'}">
            ${isActive ? "Faol" : "No faol"}
          </span>
        </div>
      </div>
    `;
  });
}


updateUi(usersData);


addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});


closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  form.reset();
});


closeModalXBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  form.reset();
});


modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    form.reset();
  }
});


form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  
  const newName = document.getElementById("name").value;
  const newEmail = document.getElementById("email").value;
  const newRole = document.getElementById("role").value;

  const newUser = {
    id: Date.now(), 
    name: newName,
    email: newEmail,
    role: newRole,
    isActive: true 
  };

  usersData.unshift(newUser); 
  updateUi(usersData); 
  
  modal.classList.add("hidden"); 
  form.reset(); 
});



usersWrappaerEl.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".user-card__delete-btn"); 
  
  if (deleteBtn) {
    const idToDelete = Number(deleteBtn.getAttribute("data-id"));
    usersData = usersData.filter(user => user.id !== idToDelete); 
    updateUi(usersData); 
  }
});