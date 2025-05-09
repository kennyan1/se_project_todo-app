import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const dateInput = values.date;
    const date = dateInput ? new Date(dateInput) : null;
    if (date) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }
    
    const id = uuidv4();
    const todoData = { 
      name: values.name, 
      date: date,
      id: id,
      completed: false
    };
    
    const todo = new Todo(todoData, "#todo-template", handleCheck, handleDelete);
    const todoElement = todo.getView();
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
  }
});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
    const todoElement = todo.getView();
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();