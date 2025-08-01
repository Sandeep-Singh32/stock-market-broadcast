import { Injectable } from "@nestjs/common";

interface StockMarketInterface {
  getStockPrices(): Record<string, number>;
  getRandomPrice(symbol: string): number;
}

@Injectable()
export class StockMarket implements StockMarketInterface {
  private stocks: string[] = ['TCS', 'RELIANCE', 'INFY', 'HDFCBANK'];

  getStockPrices(): Record<string, number> {
    const stockPrices: Record<string, number> = {};
    this.stocks.forEach((stock) => {
      stockPrices[stock] = this.getRandomPrice(stock);
    });
    return stockPrices;
  }

  getRandomPrice(symbol: string) {
    const base = {
      TCS: 3800,
      RELIANCE: 2400,
      INFY: 1500,
      HDFCBANK: 1600,
    };
    const fluctuation = (Math.random() - 0.5) * 10;
    return +(base[symbol] + fluctuation).toFixed(2);
  }
}
