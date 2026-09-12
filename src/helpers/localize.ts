import type { HomeAssistant } from "../types/home-assistant";
import type { FieldDefinition } from "../types/schema";

const de: Record<string, string> = {
  "section.general": "Allgemein", "section.program": "Programm", "section.actions": "Aktionen",
  "section.options": "Optionen", "section.status": "Status & Wartung", "section.settings": "Geräteeinstellungen",
  "section.appearance": "Darstellung", "section.layout": "Layout & Verhalten",
  "action.start": "Start", "action.pause": "Pause", "action.resume": "Fortsetzen", "action.cancel": "Abbrechen",
  "action.more_info": "Mehr Informationen", "action.toggle_details": "Details ein-/ausklappen",
  power: "Ein/Aus", progress: "Programmfortschritt", running: "Aktives Programm", paused: "Pausiert", ready: "Bereit",
  appliance_status: "Gerätestatus", working: "Wird ausgeführt…", not_configured: "Nicht konfiguriert",
  unavailable: "Nicht verfügbar", unknown: "Unbekannt",
  "device.dishwasher": "Spülmaschine", "device.oven": "Backofen", "device.coffee": "Kaffeemaschine", "device.dryer": "Trockner",
  "field.entity": "Geräte-Anker-Entity", "field.power_entity": "Ein/Aus", "field.status_entity": "Status",
  "field.operating_state_entity": "Betriebszustand", "field.selected_program_entity": "Ausgewähltes Programm",
  "field.active_program_entity": "Aktives Programm", "field.progress_entity": "Programmfortschritt",
  "field.remaining_time_entity": "Restzeit", "field.start_entity": "Start", "field.pause_entity": "Pause",
  "field.resume_entity": "Fortsetzen", "field.cancel_entity": "Abbrechen", "field.phase_entity": "Programmphase",
  "field.door_entity": "Tür", "field.water_entity": "Geschätzter Wasserverbrauch",
  "field.energy_entity": "Geschätzter Energieverbrauch", "field.salt_entity": "Salz",
  "field.rinse_aid_entity": "Klarspüler", "field.vario_speed_entity": "VarioSpeed Plus",
  "field.hygiene_entity": "Hygiene", "field.half_load_entity": "Halbe Ladung", "field.silent_entity": "Leisemodus",
  "field.care_entity": "Wartungsprogramm", "field.filter_check_entity": "Filtersystem prüfen",
  "field.filter_entity": "Maschinenreinigungsfilter", "field.aquastop_entity": "AquaStop aufgetreten",
  "field.heater_scale_entity": "Wasserheizung verkalkt", "field.current_temperature_entity": "Aktuelle Temperatur",
  "field.target_temperature_entity": "Solltemperatur", "field.duration_entity": "Dauer", "field.level_entity": "Stufe",
  "field.rapid_preheat_entity": "Schnelles Vorheizen", "field.water_tank_entity": "Wassertank",
  "field.alarm_entity": "Timer", "field.child_lock_entity": "Kindersicherung",
  "field.display_brightness_entity": "Displayhelligkeit", "field.key_tones_entity": "Tastentöne",
  "field.cooling_fan_entity": "Kühllüfter-Laufzeit", "field.tone_duration_entity": "Tondauer",
  "field.power_state_entity": "Betriebszustand", "field.cups_entity": "Tassen",
  "field.bean_amount_entity": "Bohnenmenge", "field.fill_quantity_entity": "Füllmenge",
  "field.coffee_temperature_entity": "Kaffeetemperatur", "field.milk_ratio_entity": "Kaffee-/Milch-Verhältnis",
  "field.bean_container_entity": "Bohnenbehälter", "field.water_temperature_entity": "Wassertemperatur",
  "field.flow_rate_entity": "Durchflussmenge", "field.multiple_beverages_entity": "Mehrere Getränke",
  "field.beans_empty_entity": "Bohnenbehälter leer", "field.drip_tray_entity": "Auffangschale",
  "field.cup_warmer_entity": "Tassenwärmer", "field.finish_at_entity": "Fertig in",
  "field.drying_target_entity": "Trockenziel", "field.speed_perfect_entity": "SpeedPerfect",
  "field.gentle_entity": "Sanft", "field.wrinkle_guard_entity": "Knitterschutz",
  "field.reload_entity": "Nachlegen möglich", "field.condensate_entity": "Kondensatbehälter",
  "field.lint_filter_entity": "Flusenfilter", "field.load_recommendation_entity": "Beladungsempfehlung",
  "field.drum_light_entity": "Trommellicht", "field.door_light_entity": "Tür-Ringlicht",
  "field.signal_volume_entity": "Signallautstärke", "field.brightness_entity": "Helligkeit",
  "field.auto_power_off_entity": "Automatische Abschaltung",
  "editor.intro": "Wähle eine beliebige Entity des Geräts als Anker. Die automatische Erkennung nutzt die Geräte- und Entity-Registry und füllt nur leere Felder; jeder Vorschlag bleibt änderbar.",
  "editor.name": "Name überschreiben", "editor.icon": "Icon überschreiben", "editor.detect": "Geräte-Entities erkennen",
  "editor.detected": "passende Entities ergänzt. Bitte alle Vorschläge vor dem Speichern prüfen.",
  "editor.no_matches": "Keine weiteren eindeutigen Zuordnungen gefunden.",
  "editor.copy_yaml": "YAML kopieren", "editor.copy_report": "Erkennungsbericht kopieren",
  "editor.yaml_copied": "YAML-Konfiguration in die Zwischenablage kopiert.",
  "editor.report_copied": "Erkennungsbericht kopiert. Bitte vor dem Teilen persönliche Bezeichnungen prüfen.",
  "configured_entity_unavailable": "konfigurierte Entity nicht verfügbar",
  "configured_entities_unavailable": "konfigurierte Entities nicht verfügbar",
  "option.default_expanded": "Standardmäßig geöffnet", "option.animations": "Animationen",
  "option.show_progress": "Fortschritt anzeigen", "option.show_remaining_time": "Restzeit anzeigen",
  "option.show_status_section": "Statusbereich anzeigen", "option.show_options_section": "Optionsbereich anzeigen",
  "option.show_settings_section": "Geräteeinstellungen anzeigen",
};

export function translate(hass: HomeAssistant | undefined, key: string, fallback: string): string {
  const language = hass?.language || hass?.locale?.language || "en";
  return language.toLowerCase().startsWith("de") ? de[key] || fallback : fallback;
}

export function fieldLabel(hass: HomeAssistant | undefined, field: FieldDefinition): string {
  return translate(hass, `field.${field.key}`, field.label);
}
