import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadlistComponent } from './file-uploadlist.component';

describe('FileUploadlistComponent', () => {
  let component: FileUploadlistComponent;
  let fixture: ComponentFixture<FileUploadlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadlistComponent]
    });
    fixture = TestBed.createComponent(FileUploadlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
