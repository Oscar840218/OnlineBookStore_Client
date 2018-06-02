import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshellComponent } from './bookshell.component';

describe('BookshellComponent', () => {
  let component: BookshellComponent;
  let fixture: ComponentFixture<BookshellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookshellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookshellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
