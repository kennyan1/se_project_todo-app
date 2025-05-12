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

const renderTodo = (item) => {
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  section.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

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
    
    renderTodo(todoData);
    todoCounter.updateTotal(true);
  }
});

section.renderItems();
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();