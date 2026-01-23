import { syncTasks } from "./taskSync.service";

const SYNC_INTERVAL =  2 * 60 * 1000; // 2 minutos

let timer: number | null = null;

export function stopSyncScheduler() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

export function startSyncScheduler() {
  if (timer) return;

  const trySync = () => {
    if (navigator.onLine) {
      syncTasks();
    }
  };

  window.addEventListener("online", trySync);

  timer = window.setInterval(trySync, SYNC_INTERVAL);
}
