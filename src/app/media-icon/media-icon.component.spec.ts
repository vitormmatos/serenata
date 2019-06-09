import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaIconComponent } from './media-icon.component';

describe('MediaIconComponent', () => {
  let component: MediaIconComponent;
  let fixture: ComponentFixture<MediaIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
