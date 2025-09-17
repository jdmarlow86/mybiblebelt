import React, { useEffect, useMemo, useState } from "react";

// ---------------- Types ----------------
type StudyBookmark = {
  id: string;              // uuid-ish
  title: string;
  schedule: string;        // free text, e.g., "Daily 6:30 AM" or "Wednesdays @ 7pm"
  notes: string;
  createdAt: number;       // epoch ms
  updatedAt: number;       // epoch ms
};

// ---------------- Storage (Local) ----------------
const LS_KEY = "studyBookmarks";

function loadFromLocal(): StudyBookmark[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data;
  } catch {
    return [];
  }
}

function saveToLocal(bookmarks: StudyBookmark[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(bookmarks));
}

// ---------------- Optional: Electron IPC toggle ----------------
const isElectron =
  typeof window !== "undefined" &&
  // @ts-ignore
  !!window?.electron?.ipcRenderer;

async function loadFromElectron(): Promise<StudyBookmark[]> {
  // @ts-ignore
  const res = await window.electron.ipcRenderer.invoke("study-bookmarks:load");
  return Array.isArray(res) ? res : [];
}

async function saveToElectron(bookmarks: StudyBookmark[]) {
  // @ts-ignore
  await window.electron.ipcRenderer.invoke("study-bookmarks:save", bookmarks);
}

// Choose storage mode automatically
const useElectronStorage = !!isElectron;

// ---------------- Helpers ----------------
const emptyForm: Omit<StudyBookmark, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  schedule: "",
  notes: "",
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ---------------- Component ----------------
export default function StudyBookmarkCard() {
  const [bookmarks, setBookmarks] = useState<StudyBookmark[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // initial load
  useEffect(() => {
    (async () => {
      if (useElectronStorage) {
        setBookmarks(await loadFromElectron());
      } else {
        setBookmarks(loadFromLocal());
      }
    })();
  }, []);

  // persist on change
  useEffect(() => {
    if (!bookmarks) return;
    (async () => {
      if (useElectronStorage) {
        await saveToElectron(bookmarks);
      } else {
        saveToLocal(bookmarks);
      }
    })();
  }, [bookmarks]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return bookmarks.sort((a, b) => b.updatedAt - a.updatedAt);
    return bookmarks
      .filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.schedule.toLowerCase().includes(q) ||
          b.notes.toLowerCase().includes(q)
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [bookmarks, search]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const now = Date.now();

    if (editingId) {
      setBookmarks((prev) =>
        prev.map((b) =>
          b.id === editingId
            ? { ...b, ...form, updatedAt: now }
            : b
        )
      );
    } else {
      const item: StudyBookmark = {
        id: uid(),
        title: form.title.trim(),
        schedule: form.schedule.trim(),
        notes: form.notes.trim(),
        createdAt: now,
        updatedAt: now,
      };
      setBookmarks((prev) => [item, ...prev]);
    }
    resetForm();
  }

  function handleEdit(id: string) {
    const b = bookmarks.find((x) => x.id === id);
    if (!b) return;
    setForm({ title: b.title, schedule: b.schedule, notes: b.notes });
    setEditingId(id);
  }

  function handleDelete(id: string) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          Study Bookmark
        </h2>
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-sm w-40 sm:w-56 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring"
        />
      </div>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Title
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring"
              placeholder="e.g., Gospel of John — Ch. 3"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Schedule
            </label>
            <input
              required
              value={form.schedule}
              onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring"
              placeholder="e.g., Daily 6:30 AM"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Notes
          </label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring resize-y"
            placeholder="Key verses, questions, cross-references…"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow"
          >
            {editingId ? "Update Bookmark" : "Add Bookmark"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="divide-y divide-gray-200 dark:divide-neutral-800">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
            No bookmarks yet. Add your first study above.
          </p>
        ) : (
          filtered.map((b) => (
            <article key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                  Schedule: {b.schedule}
                </p>
                {!!b.notes && (
                  <p className="text-sm text-gray-700 dark:text-gray-200 mt-1 whitespace-pre-wrap break-words">
                    {b.notes}
                  </p>
                )}
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                  Updated {new Date(b.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(b.id)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium hover:bg-amber-500/20"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-700 dark:text-red-300 text-xs font-medium hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
