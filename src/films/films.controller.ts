import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { UpdateFilmDto } from './dto/update-film.dto.js';
import { FilmsService } from './films.service.js';
import { CreateFilmDto } from './dto/create-film.dto.js';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) { }

    @Get()
    getFilms(@Query('ditonton') ditonton?: string) {
        return this.filmsService.getFilms(ditonton);
    }

    @Get(':id')
    getFilmById(@Param('id') id: string) {
        return this.filmsService.getFilmById(id);
    }

    @Post()
    createFilm(@Body() isi: CreateFilmDto) {
        return this.filmsService.createFilm(isi);
    }

    @Patch(':id')
    updateFilm(@Param('id') id: string, @Body() isi: UpdateFilmDto) {
        return this.filmsService.updateFilm(id, isi);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteFilm(@Param('id') id: string) {
        this.filmsService.deleteFilm(id);
    }
}
