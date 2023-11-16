import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelinkmodalComponent } from './updatelinkmodal.component';

describe('UpdatelinkmodalComponent', () => {
  let component: UpdatelinkmodalComponent;
  let fixture: ComponentFixture<UpdatelinkmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatelinkmodalComponent]
    });
    fixture = TestBed.createComponent(UpdatelinkmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
