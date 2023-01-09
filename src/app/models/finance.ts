
export interface Pre {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface Regular {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface Post {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface CurrentTradingPeriod {
  pre: Pre;
  regular: Regular;
  post: Post;
}

export interface Meta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  priceHint: number;
  currentTradingPeriod: CurrentTradingPeriod;
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface Quote {
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

export interface Adjclose {
  adjclose: number[];
}

export interface Indicators {
  quote: Quote[];
  adjclose: Adjclose[];
}

export interface Result {
  meta: Meta;
  timestamp: number[];
  indicators: Indicators;
}

export interface Chart {
  result: Result[];
  error?: any;
}

export interface FinanceDTO {
  chart: Chart;
}