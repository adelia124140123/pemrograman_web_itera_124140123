// Mengelola state, localStorage, fetch API, dan tampilan
import { TaskItem } from "./TaskItem.js";
import { formatTanggal, escapeHtml } from "./utils.js";

const STORAGE_KEY = "tugasku.tasks";
const QUOTE_URL = "https://dummyjson.com/quotes/random";
const FALLBACK_QUOTE = {
  quote: "Satu langkah kecil setiap hari akan membawamu ke tujuan besarmu.",
  author: "Tugasku",
};

export class DashboardApp {
  constructor() {
    this.tasks = [];
    this.filter = "all";
    this.editingId = null;
    this.el = {
      list: document.getElementById("taskList"),
      filters: document.querySelectorAll(".filter-btn"),
      modal: document.getElementById("modal"),
      modalTitle: document.getElementById("modalTitle"),
      form: document.getElementById("taskForm"),
      quote: document.getElementById("quote"),
      today: document.getElementById("todayText"),
    };
  }

  async init() {
    this.tasks = this.loadTasks();
    this.el.today.textContent = formatTanggal();
    this.bindEvents();
    this.render();
    await this.loadQuote();
  }

  // ---------- localStorage ----------
  loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw).map((item) => TaskItem.fromJSON(item)) : [];
    } catch {
      return [];
    }
  }

  saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  // ---------- Operasi data (state tidak dimutasi, selalu array baru) ----------
  addTask(data) {
    this.tasks = [new TaskItem(data), ...this.tasks];
    this.commit();
  }

  updateTask(id, changes) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? new TaskItem({ ...task, ...changes }) : task
    );
    this.commit();
  }

  toggleTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (task) this.updateTask(id, { done: !task.done });
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.commit();
  }

  commit() {
    this.saveTasks();
    this.render();
  }

  // ---------- API (async/await) ----------
  async loadQuote() {
    try {
      const response = await fetch(QUOTE_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const { quote, author } = await response.json();
      this.showQuote({ quote, author });
    } catch (error) {
      console.warn("Gagal memuat kutipan:", error.message);
      this.showQuote(FALLBACK_QUOTE);
    }
  }

  showQuote({ quote, author }) {
    this.el.quote.textContent = `“${quote}” — ${author}`;
  }

  // ---------- Tampilan ----------
  get visibleTasks() {
    const rules = {
      all: () => true,
      pending: (task) => !task.done,
      completed: (task) => task.done,
    };
    return this.tasks
      .filter(rules[this.filter])
      .sort((a, b) => a.done - b.done || a.deadline.localeCompare(b.deadline));
  }

  taskTemplate({ id, title, course, deadlineText, done, urgency }) {
    return `
      <article class="task-card ${done ? "is-done" : ""}" data-id="${id}">
        <span class="bar bar-${urgency.level}"></span>
        <button class="check ${done ? "checked" : ""}" data-action="toggle" aria-label="Tandai selesai">
          <span class="material-symbols-outlined">check</span>
        </button>
        <div class="task-body">
          <div class="mb-1.5 flex flex-wrap items-center gap-2">
            <span class="pill">${escapeHtml(course)}</span>
            <span class="pill badge-${urgency.level}">${urgency.label}</span>
          </div>
          <h2 class="task-title">${escapeHtml(title)}</h2>
          <p class="task-date"><span class="material-symbols-outlined">schedule</span>${deadlineText}</p>
        </div>
        <div class="flex shrink-0 gap-1">
          <button class="icon-btn" data-action="edit" aria-label="Edit tugas"><span class="material-symbols-outlined">edit</span></button>
          <button class="icon-btn" data-action="delete" aria-label="Hapus tugas"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </article>`;
  }

  render() {
    const tasks = this.visibleTasks;
    this.el.list.innerHTML = tasks.length
      ? tasks.map((task) => this.taskTemplate(task)).join("")
      : `<div class="empty"><span>🎉</span>Yeay, tidak ada tugas!</div>`;

    this.el.filters.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.filter === this.filter)
    );
  }

  // ---------- Modal & event ----------
  openModal(id = null) {
    this.editingId = id;
    const task = this.tasks.find((item) => item.id === id);
    const { title, course, deadline } = this.el.form.elements;

    this.el.form.reset();
    let heading = "Tambah Tugas Baru"; // let: nilainya bisa berubah di bawah
    if (task) {
      heading = "Edit Tugas";
      title.value = task.title;
      course.value = task.course;
      deadline.value = task.deadline;
    }
    this.el.modalTitle.textContent = heading;
    this.el.modal.classList.remove("hidden");
    this.el.modal.classList.add("flex");
    title.focus();
  }

  closeModal() {
    this.el.modal.classList.add("hidden");
    this.el.modal.classList.remove("flex");
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(this.el.form));
    const clean = {
      title: data.title.trim(),
      course: data.course.trim(),
      deadline: data.deadline,
    };
    if (!clean.title || !clean.course) return;

    if (this.editingId) this.updateTask(this.editingId, clean);
    else this.addTask(clean);
    this.closeModal();
  }

  handleListClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action } = button.dataset;
    const { id } = button.closest(".task-card").dataset;

    if (action === "toggle") this.toggleTask(id);
    if (action === "edit") this.openModal(id);
    if (action === "delete" && confirm("Hapus tugas ini?")) this.deleteTask(id);
  }

  bindEvents() {
    document.getElementById("addBtn").addEventListener("click", () => this.openModal());
    document.getElementById("cancelBtn").addEventListener("click", () => this.closeModal());
    document.getElementById("closeBtn").addEventListener("click", () => this.closeModal());
    this.el.modal.addEventListener("click", (event) => {
      if (event.target === this.el.modal) this.closeModal();
    });
    this.el.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.el.list.addEventListener("click", (event) => this.handleListClick(event));
    this.el.filters.forEach((btn) =>
      btn.addEventListener("click", () => {
        this.filter = btn.dataset.filter;
        this.render();
      })
    );
  }
}
