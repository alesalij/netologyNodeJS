import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { book } from './types';

@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): object[] {
    return this.booksService.getBooks();
  }
  @Post()
  addBook(@Body() data: { title: book }) {
    console.log('jsonData', data.title);
    //const data: object = JSON.parse(jsonData);

    this.booksService.addBook(data);
  }
}
