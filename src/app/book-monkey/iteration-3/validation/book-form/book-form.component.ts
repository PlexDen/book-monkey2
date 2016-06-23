import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlGroup, ControlArray, FormBuilder, Validators } from '@angular/common';
import { DateValidator } from '../validators/date.validator'
import { IsbnValidator } from '../validators/isbn.validator'
import { Book } from '../domain/book'
import { BookStoreService } from '../services/books/book-store.service'

@Component({
  selector: 'book-form',
  moduleId: module.id,
  templateUrl: 'book-form.component.html',
  providers: [BookStoreService]
})
export class BookFormComponent implements OnInit {
  myForm: ControlGroup;
  authorsControlArray: ControlArray;
  thumbnailsControlArray: ControlArray;
  isUpdatingBook: boolean;
  
  constructor(
    private fb: FormBuilder, 
    private bs: BookStoreService,
    private route: ActivatedRoute
  ) {
    this.isUpdatingBook = false;
    this.initBook();
  }

  ngOnInit():void {
    this.route.params.subscribe(params => {
      var isbn = params['isbn'];
    
      if(isbn) {
        this.isUpdatingBook = true;
        let book = this.bs.getSingle(isbn);
        this.initBook(book)
      }
    });
  }

  initBook(book?:Book){
    if(!book) book = new Book('', '', [''], new Date(), '', 0, [{url:'', title: ''}], '');

    this.myForm = this.fb.group({
      title: [book.title, Validators.required],
      subtitle: [book.subtitle],
      isbn: [book.isbn, Validators.compose([
        Validators.required,
        IsbnValidator.isbn
        /* TODO Async check if isbn exists */
      ])],
      description: [book.description],
      authors: this.fb.array(book.authors, Validators.required),
      thumbnails: this.fb.array(
        book.thumbnails.map(
          t => this.fb.group({
            url: this.fb.control(t.url, Validators.required),
            title: this.fb.control(t.title)
          })
        )
      ),
      published: [book.published] // , DateValidator.germanDate
    });

    // this allows us to manipulate the form at runtime
    this.authorsControlArray = <ControlArray>this.myForm.controls['authors'];
    this.thumbnailsControlArray = <ControlArray>this.myForm.controls['thumbnails'];
  }

  addAuthorControl(){
    this.authorsControlArray.push(this.fb.control(''));
  }

  addThumbnailControl(){
    this.thumbnailsControlArray.push(this.fb.group({url: [''], title: ['']}));
  }

  submitForm(formData){
    this.isUpdatingBook 
      ? this.bs.update(formData.value) 
      : this.bs.create(formData.value);
  }
}