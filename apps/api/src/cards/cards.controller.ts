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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardEntity } from './entities/card.entity';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiCreatedResponse({
    type: CardEntity,
    description: 'Create a new card in db',
  })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CardEntity,
    description: 'Get card by id',
  })
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: CardEntity,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.remove(id);
  }
}
