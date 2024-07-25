import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CollectionEntity } from './entities/collection.entity';
import { CardEntity } from '@/cards/entities/card.entity';
import {
  collectionEntityArrayExample,
  collectionEntityExample,
} from './entities/collection.entity.example';
import { cardEntityArrayExample } from '@/cards/entities/card.entity.example';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @ApiCreatedResponse({
    type: CollectionEntity,
    example: collectionEntityExample,
  })
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @ApiOkResponse({
    type: CollectionEntity,
    isArray: true,
    example: collectionEntityArrayExample,
  })
  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @ApiOkResponse({
    type: CollectionEntity,
    example: collectionEntityExample,
  })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.findOne(id);
  }

  @ApiOkResponse({
    type: CardEntity,
    isArray: true,
    example: cardEntityArrayExample,
  })
  @Get(':id/cards')
  findCards(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.findCards(id);
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({
    type: CollectionEntity,
    example: collectionEntityExample,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.remove(id);
  }
}
