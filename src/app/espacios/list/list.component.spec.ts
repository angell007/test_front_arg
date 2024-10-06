import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosListComponent } from './list.component';

describe('EspaciosListComponent', () => {
  let component: EspaciosListComponent;
  let fixture: ComponentFixture<EspaciosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaciosListComponent]
    });
    fixture = TestBed.createComponent(EspaciosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
