export interface FormatedChartData {
  labels: string[],
  data: number[],
  formatedData: FormatedData[]
}

export interface FormatedData {
  open: number,
  data: Date,
  variationDay: string,
  variationForFirst: string,
}