import type { HassEntity, HomeAssistant } from "../types/home-assistant";

const INVALID = new Set(["unknown", "unavailable", "none", "null", ""]);

export function isAvailable(state?: HassEntity): boolean {
  return !!state && !INVALID.has(String(state.state).toLowerCase());
}

export function cleanLabel(value: string): string {
  const enumValue = /enumtype|eventpresentstate|operationstate|powerstate/i.test(value);
  const last = enumValue && value.includes(".") ? value.split(".").pop()! : value.includes(".") && /^[a-z_]+\./i.test(value) ? value.split(".").pop()! : value;
  return last
    .replace(/^BSH[._]Common[._]|^Dishcare[._]|^Cooking[._]|^LaundryCare[._]|^ConsumerProducts[._]CoffeeMaker[._]/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

export function canonicalState(state?: HassEntity): string {
  if (!state) return "";
  const raw = state.state.trim().toLowerCase();
  const tail = raw.split(/[.:/]/).filter(Boolean).pop() || raw;
  return tail.replace(/[\s_-]+/g, "");
}

function formatIsoDuration(value: string): string | undefined {
  const match = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i.exec(value);
  if (!match) return undefined;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0) + Math.floor(Number(match[3] || 0) / 60);
  return hours ? `${hours}:${String(minutes).padStart(2, "0")} h` : `${minutes} min`;
}

export function displayState(hass: HomeAssistant, state?: HassEntity): string {
  const german = (hass.language || hass.locale?.language || "").toLowerCase().startsWith("de");
  if (!state) return german ? "Nicht konfiguriert" : "Not configured";
  if (!isAvailable(state)) return state?.state === "unavailable" ? german ? "Nicht verfügbar" : "Unavailable" : german ? "Unbekannt" : "Unknown";
  if (hass.formatEntityState) {
    try {
      const formatted = hass.formatEntityState(state);
      if (formatted && formatted !== state.state) {
        const rawLabel = cleanLabel(state.state).toLowerCase();
        if (formatted.toLowerCase() !== rawLabel) return formatted;
      }
    } catch { /* fallback */ }
  }
  const known = canonicalState(state);
  const knownLabels: Record<string, [string, string]> = {
    run: ["Running", "Läuft"], running: ["Running", "Läuft"], active: ["Active", "Aktiv"],
    ready: ["Ready", "Bereit"], pause: ["Paused", "Pausiert"], paused: ["Paused", "Pausiert"],
    off: ["Off", "Aus"], on: ["On", "Ein"], inactive: ["Inactive", "Inaktiv"],
    finished: ["Finished", "Beendet"], completed: ["Completed", "Beendet"], error: ["Error", "Fehler"],
  };
  if (knownLabels[known] && /enumtype|eventpresentstate|operationstate|powerstate/i.test(state.state)) return knownLabels[known][german ? 1 : 0];
  const duration = formatIsoDuration(state.state);
  if (duration) return duration;
  return `${cleanLabel(state.state)}${state.attributes.unit_of_measurement ? ` ${state.attributes.unit_of_measurement}` : ""}`;
}

export function numericState(state?: HassEntity): number | undefined {
  if (!state || !isAvailable(state)) return undefined;
  const value = Number.parseFloat(state.state.replace(",", "."));
  return Number.isFinite(value) ? value : undefined;
}

export function progressValue(state?: HassEntity): number | undefined {
  const value = numericState(state);
  if (value === undefined) return undefined;
  return Math.max(0, Math.min(100, value <= 1 && !state?.attributes.unit_of_measurement ? value * 100 : value));
}

export function friendlyName(state?: HassEntity, fallback = "Entity"): string {
  return state?.attributes.friendly_name || fallback;
}

export function isOn(state?: HassEntity): boolean {
  if (!state || !isAvailable(state)) return false;
  return ["on", "open", "true", "active", "running", "run", "1", "present"].includes(canonicalState(state));
}

export function isWarningActive(state?: HassEntity): boolean {
  if (!state || !isAvailable(state)) return false;
  const value = canonicalState(state);
  return !["off", "closed", "ok", "normal", "none", "false", "0", "available", "full", "notpresent", "ready", "good"].includes(value);
}

export type ApplianceMode = "off" | "idle" | "running" | "paused" | "unavailable";

export function isActiveMode(mode: ApplianceMode): boolean {
  return mode === "running" || mode === "paused";
}

export function deriveMode(...states: Array<HassEntity | undefined>): ApplianceMode {
  const available = states.filter((state): state is HassEntity => !!state && isAvailable(state));
  if (!available.length && states.some(Boolean)) return "unavailable";
  const values = available.map(canonicalState);
  if (states[0] && isAvailable(states[0]) && ["off", "aus", "ausgeschaltet", "inactive"].includes(canonicalState(states[0]))) return "off";
  if (values.some((value) => ["pause", "paused", "angehalten", "unterbrochen"].includes(value))) return "paused";
  if (values.some((value) => ["run", "running", "active", "inoperation", "betrieb", "heat", "heating", "brew", "brewing", "drying", "trocknen"].includes(value))) return "running";
  if (values.some((value) => ["off", "aus", "ausgeschaltet", "inactive", "standby"].includes(value))) return "off";
  return "idle";
}
