import { Injectable, NotFoundException } from '@nestjs/common';
import films from '../films.json' with { type: 'json' };
import { randomUUID } from 'node:crypto';
import { CreateFilmDto } from './dto/create-film.dto.js';
import { UpdateFilmDto } from './dto/update-film.dto.js';

@Injectable()
export class FilmsService {
    private readonly daftarFilm = [...films];

    getFilms(ditonton?: string) {
        if (ditonton === 'true') {
            return this.daftarFilm.filter((film) => film.sudahDitonton === true);
        }

        if (ditonton === 'false') {
            return this.daftarFilm.filter((film) => film.sudahDitonton === false);
        }

        return this.daftarFilm;
    }

    getFilmById(id: string) {
        const film = this.daftarFilm.find((film) => film.id === id);

        if (!film) {
            throw new NotFoundException('Film tidak ditemukan');
        }

        return film;
    }

    createFilm(isi: CreateFilmDto) {
        const filmBaru = {
            ...isi,
            id: randomUUID(),
            sudahDitonton: isi.sudahDitonton ?? false,
        };

        this.daftarFilm.push(filmBaru);
        return filmBaru;
    }

    updateFilm(id: string, isi: UpdateFilmDto) {
        const film = this.getFilmById(id);

        film.sudahDitonton = isi.sudahDitonton;
        return film;
    }

    deleteFilm(id: string) {
        const index = this.daftarFilm.findIndex((film) => film.id === id);

        if (index === -1) {
            throw new NotFoundException('Film tidak ditemukan');
        }

        this.daftarFilm.splice(index, 1);
    }
}
