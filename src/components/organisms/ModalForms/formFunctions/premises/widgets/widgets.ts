import {AddToggle} from './AddToggle'
import {AddSlider} from './AddSlider'

export const widgets = {
  TOGGLE: {component: AddToggle},
  // MOMENTARY: {component: AddMomentary},
  SLIDER: {component: AddSlider}
  // GAUGE: {component: AddGauge}
} as const

export const widgetTypes = Object.keys(widgets)
export type WidgetTypes = keyof typeof widgets
