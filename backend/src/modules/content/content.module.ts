import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { MockContentProvider } from './providers/mock-content.provider';
import { WordPressContentProvider } from './providers/wordpress-content.provider';

@Module({
  controllers: [ContentController],
  providers: [ContentService, MockContentProvider, WordPressContentProvider],
  exports: [ContentService],
})
export class ContentModule {}
