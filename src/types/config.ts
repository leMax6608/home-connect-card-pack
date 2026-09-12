export type ApplianceKind = "dishwasher" | "oven" | "coffee" | "dryer";

export interface BaseApplianceCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  power_entity?: string;
  status_entity?: string;
  operating_state_entity?: string;
  active_program_entity?: string;
  selected_program_entity?: string;
  progress_entity?: string;
  remaining_time_entity?: string;
  start_entity?: string;
  pause_entity?: string;
  resume_entity?: string;
  cancel_entity?: string;
  default_expanded?: boolean;
  animations?: boolean;
  show_progress?: boolean;
  show_remaining_time?: boolean;
  show_status_section?: boolean;
  show_options_section?: boolean;
  show_settings_section?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface DishwasherCardConfig extends BaseApplianceCardConfig {
  door_entity?: string;
  phase_entity?: string;
  water_entity?: string;
  energy_entity?: string;
  salt_entity?: string;
  rinse_aid_entity?: string;
  vario_speed_entity?: string;
  hygiene_entity?: string;
  half_load_entity?: string;
  silent_entity?: string;
  care_entity?: string;
  filter_check_entity?: string;
  filter_entity?: string;
  aquastop_entity?: string;
  heater_scale_entity?: string;
}

export interface OvenCardConfig extends BaseApplianceCardConfig {
  current_temperature_entity?: string;
  target_temperature_entity?: string;
  duration_entity?: string;
  level_entity?: string;
  door_entity?: string;
  water_tank_entity?: string;
  rapid_preheat_entity?: string;
  alarm_entity?: string;
  child_lock_entity?: string;
  display_brightness_entity?: string;
  key_tones_entity?: string;
  cooling_fan_entity?: string;
  tone_duration_entity?: string;
}

export interface CoffeeCardConfig extends BaseApplianceCardConfig {
  cups_entity?: string;
  bean_amount_entity?: string;
  fill_quantity_entity?: string;
  coffee_temperature_entity?: string;
  milk_ratio_entity?: string;
  bean_container_entity?: string;
  water_temperature_entity?: string;
  flow_rate_entity?: string;
  multiple_beverages_entity?: string;
  water_tank_entity?: string;
  beans_empty_entity?: string;
  drip_tray_entity?: string;
  door_entity?: string;
  cup_warmer_entity?: string;
  child_lock_entity?: string;
}

export interface DryerCardConfig extends BaseApplianceCardConfig {
  phase_entity?: string;
  finish_at_entity?: string;
  drying_target_entity?: string;
  duration_entity?: string;
  speed_perfect_entity?: string;
  hygiene_entity?: string;
  half_load_entity?: string;
  gentle_entity?: string;
  wrinkle_guard_entity?: string;
  silent_entity?: string;
  door_entity?: string;
  reload_entity?: string;
  condensate_entity?: string;
  lint_filter_entity?: string;
  care_entity?: string;
  load_recommendation_entity?: string;
  drum_light_entity?: string;
  door_light_entity?: string;
  signal_volume_entity?: string;
  brightness_entity?: string;
  auto_power_off_entity?: string;
}

export type ApplianceCardConfig =
  | DishwasherCardConfig
  | OvenCardConfig
  | CoffeeCardConfig
  | DryerCardConfig;
