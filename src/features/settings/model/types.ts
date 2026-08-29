export interface SettingsFormValues {
  maintenanceMode: boolean
  bannerEnabled: boolean
  bannerText: string
  bannerLink: string
}

export const DEFAULT_SETTINGS_FORM: SettingsFormValues = {
  maintenanceMode: false,
  bannerEnabled: false,
  bannerText: '',
  bannerLink: '',
}
