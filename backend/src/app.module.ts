import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ContentModule } from './modules/content/content.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { EnquiriesModule } from './modules/enquiries/enquiries.module';
import { InsightsModule } from './modules/insights/insights.module';
import { PrestayModule } from './modules/prestay/prestay.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ContentModule,
    RecommendationsModule,
    EnquiriesModule,
    InsightsModule,
    PrestayModule,
  ],
})
export class AppModule {}
