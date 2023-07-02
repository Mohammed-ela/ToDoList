// Récupérer les éléments du DOM
const formulaire = document.getElementById('formulaire');
const inputTache = document.getElementById('input-tache');
const listTache = document.getElementById('list-tache');


// Tableau pour stocker les tâches
const tasks = loadTasksFromCookie();

// Fonction pour créer un élément DOM
function createElement(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  element.className = className;
  return element;
}

// Fonction pour ajouter une tâche
function addTask(text) {
  const taskItem = createElement('li', text);
  const deleteButton = createElement('button', 'Supprimer', 'btn-delete');
  taskItem.appendChild(deleteButton);
  listTache.appendChild(taskItem);
}

// Événement lorsque le formulaire est envoyé
formulaire.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = inputTache.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    tasks.push(taskText);
    saveTasksToCookie(tasks);
    inputTache.value = '';
  }
});

// On enregistre les informations de la liste dans un cookie
function saveTasksToCookie(tasks) {
  document.cookie = `tasks=${JSON.stringify(tasks)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

// On récupère les informations de notre cookie qu'on enregistre dans un tableau
function loadTasksFromCookie() {
  const cookie = document.cookie;
  const cookieParts = cookie.split(';');

  for (let part of cookieParts) {
    const [name, value] = part.trim().split('=');

    if (name === 'tasks') {
      return JSON.parse(value);
    }
  }

  return [];
}

// Ajouter les tâches initiales à la liste
for (let task of tasks) {
  addTask(task);
}

// Code JavaScript pour la gestion de la suppression
listTache.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-delete')) {
    const listItem = event.target.closest('li');
    listItem.remove();
    const taskText = listItem.textContent;
    tasks.splice(tasks.indexOf(taskText), 1);
    saveTasksToCookie(tasks);
    if (listTache.children.length === 0) {
      const deleteButtons = listTache.getElementsByClassName('btn-delete');
      for (let button of deleteButtons) {
        button.style.display = 'none';
      }
    }
  }
});
