import { apiFetch } from "./api.js";

export function getBodegas() {
  return apiFetch("/bodegas", { method: "GET" });
}