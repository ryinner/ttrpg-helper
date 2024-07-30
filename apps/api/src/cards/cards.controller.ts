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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardEntity } from './entities/card.entity';
import { cardEntityExample } from './entities/card.entity.example';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiCreatedResponse({
    type: CardEntity,
    description: 'Create a new card in db',
    example: cardEntityExample,
  })
  @ApiForbiddenResponse()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CardEntity,
    description: 'Get card by id',
    example: cardEntityExample,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: CardEntity,
    example: cardEntityExample,
  })
  @ApiForbiddenResponse()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiForbiddenResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.remove(id);
  }
}
