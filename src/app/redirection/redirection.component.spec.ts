import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectionComponent } from './redirection.component';

describe('RedirectionComponent', () => {
  let component: RedirectionComponent;
  let fixture: ComponentFixture<RedirectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedirectionComponent]
    });
    fixture = TestBed.createComponent(RedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
