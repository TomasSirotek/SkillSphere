import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuComponent } from './profile-menu.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileMenuComponent,RouterTestingModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
