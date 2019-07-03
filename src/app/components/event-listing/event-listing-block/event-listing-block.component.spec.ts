import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListingBlockComponent } from './event-listing-block.component';

describe('EventListingBlockComponent', () => {
  let component: EventListingBlockComponent;
  let fixture: ComponentFixture<EventListingBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListingBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
