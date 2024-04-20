export type ButtonType = {
  buttonId: string
  name: string
  mode: 'INPUT' | 'OUTPUT'
  type: 'ANALOG' | 'DIGITAL'
  value: number
  min: number
  max: number
}
