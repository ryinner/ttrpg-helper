import { CardEntity } from '@/cards/entities/card.entity';
import { cardEntityArrayExample } from '@/cards/entities/card.entity.example';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionEntity } from './entities/collection.entity';
import {
  collectionEntityArrayExample,
  collectionEntityExample,
} from './entities/collection.entity.example';

@ApiBearerAuth()
@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @ApiCreatedResponse({
    type: CollectionEntity,
    example: collectionEntityExample,
  })
  @ApiForbiddenResponse()
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @ApiOkResponse({
    type: CollectionEntity,
    isArray: true,
    example: collectionEntityArrayExample,
  })
  @ApiForbiddenResponse()
  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @ApiOkResponse({
    type: CollectionEntity,
    example: collectionEntityExample,
  })
  @ApiForbiddenResponse()
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
  @ApiForbiddenResponse()
  @Get(':id/cards')
  findCards(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.findCards(id);
  }

  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
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
  @ApiForbiddenResponse()
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.remove(id);
  }
}
