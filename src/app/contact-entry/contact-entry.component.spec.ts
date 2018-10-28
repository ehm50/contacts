import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEntryComponent } from './contact-entry.component';

describe('ContactEntryComponent', () => {
  let component: ContactEntryComponent;
  let fixture: ComponentFixture<ContactEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
