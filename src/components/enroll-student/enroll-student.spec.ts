/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollStudent } from './enroll-student';

describe('EnrollStudent', () => {
  let component: EnrollStudent;
  let fixture: ComponentFixture<EnrollStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
