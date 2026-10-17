// Model data satu tugas
import { parseDate, startOfToday, formatTanggal } from "./utils.js";

export class TaskItem {
  // Destructuring di parameter + nilai default
  constructor({
    id = `t_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    title,
    course,
    deadline, // format "YYYY-MM-DD"
    done = false,
  }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.done = done;
  }

  // Sisa hari sampai deadline (0 = hari ini, negatif = lewat)
  get daysLeft() {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((parseDate(this.deadline) - startOfToday()) / msPerDay);
  }

  // Warna & label dihitung otomatis, tidak disimpan di localStorage
  get urgency() {
    if (this.done) return { level: "done", label: "Selesai" };
    const days = this.daysLeft;
    if (days < 0) return { level: "late", label: "Terlambat" };
    if (days === 0) return { level: "red", label: "Hari ini" };
    if (days === 1) return { level: "red", label: "Besok" };
    if (days <= 3) return { level: "yellow", label: `${days} hari lagi` };
    return { level: "green", label: `${days} hari lagi` };
  }

  get deadlineText() {
    return formatTanggal(parseDate(this.deadline), {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    });
  }

  static fromJSON(data) {
    return new TaskItem(data);
  }
}
