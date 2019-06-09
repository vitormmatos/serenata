import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiturasComponent } from './partituras.component';

describe('PartiturasComponent', () => {
  let component: PartiturasComponent;
  let fixture: ComponentFixture<PartiturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
