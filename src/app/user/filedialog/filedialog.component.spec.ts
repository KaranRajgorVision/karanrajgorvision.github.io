import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledialogComponent } from './filedialog.component';

describe('FiledialogComponent', () => {
  let component: FiledialogComponent;
  let fixture: ComponentFixture<FiledialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiledialogComponent]
    });
    fixture = TestBed.createComponent(FiledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
