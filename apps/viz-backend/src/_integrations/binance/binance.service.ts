// import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import Binance from 'binance-api-node';

// // interface AvgPriceResult {
// //   mins: number;
// //   price: string;
// // }

// @Injectable()
// export class BinanceService implements OnModuleInit {
//   private readonly logger = new Logger(BinanceService.name);
//   private client!: ReturnType<typeof Binance>;

//   constructor(private configService: ConfigService) {}

//   onModuleInit() {
//     this.client = Binance({
//       apiKey: this.configService.get<string>('BINANCE_API_KEY'),
//       apiSecret: this.configService.get<string>('BINANCE_API_SECRET'),
//     });
//     this.logger.log('Binance client initialized');
//   }

//   // async getCurrentPrice(symbol: string): Promise<string> {
//   //   try {
//   //     const avgPrice = (await this.client.avgPrice({
//   //       symbol,
//   //     })) as unknown as AvgPriceResult;
//   //     // const ticker = (await this.client.avgPrice({ symbol })) as AvgPriceResult;
//   //     return 'hola';
//   //   } catch (error) {
//   //     this.logger.error(`Error fetching price for ${symbol}: ${error.message}`);
//   //     throw error;
//   //   }
//   // }
// }
