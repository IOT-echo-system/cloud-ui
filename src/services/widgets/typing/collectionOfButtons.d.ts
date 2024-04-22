export type AddButtonRequest = {
  mode: 'OUTPUT' | 'INPUT'
  min: number
  max: number
  name: string
  type: 'ANALOG' | 'DIGITAL'
  symbol: string
}
