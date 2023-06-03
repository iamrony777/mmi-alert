export type Now = {
    success: boolean
    data: {
      fii: number
      skew: number
      nifty: number
      gold: number
      goldOnNifty: number
      date: string
      extrema: number
      trin: number
      fma: number
      sma: number
      momentum: number
      vix: number
      raw: number
      indicator: number
      lastDay: {
        fii: number
        skew: number
        nifty: number
        gold: number
        goldOnNifty: number
        date: string
        extrema: number
        trin: number
        fma: number
        sma: number
        momentum: number
        vix: number
        raw: number
        indicator: number
      }
      lastWeek: {
        fii: number
        skew: number
        nifty: number
        gold: number
        goldOnNifty: number
        date: string
        extrema: number
        trin: number
        fma: number
        sma: number
        momentum: number
        vix: number
        raw: number
        indicator: number
      }
      lastMonth: {
        fii: number
        skew: number
        nifty: number
        gold: number
        goldOnNifty: number
        date: string
        extrema: number
        trin: number
        fma: number
        sma: number
        momentum: number
        vix: number
        raw: number
        indicator: number
      }
      lastYear: {
        fii: number
        skew: number
        nifty: number
        gold: number
        goldOnNifty: number
        date: string
        extrema: number
        trin: number
        fma: number
        sma: number
        momentum: number
        vix: number
        raw: number
        indicator: number
      }
      currentValue: number
      daily: Array<{
        value: number
        date: string
      }>
    }
    error: any
    getLevel: ( mmiLevel: number ) => string
    getAlert: ( level: number ) => string
  }
  
export type Zones = {
    GREED: string;
    FEAR: string;
    EXTREME_FEAR: string;
    EXTREME_GREED: string;
    COLORS: {
      GREED: string;
      FEAR: string;
      EXTREME_FEAR: string;
      EXTREME_GREED: string;
    },
    LEVELS: {
      [key: number]: string
    },
    ALERTS: {
      GREED: string;
      FEAR: string;
      EXTREME_FEAR: string;
      EXTREME_GREED: string;
    }
  }