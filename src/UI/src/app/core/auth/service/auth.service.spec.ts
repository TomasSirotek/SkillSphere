import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let fixture: ComponentFixture<AuthService>;
  
  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpClientTestingModule,HttpClientModule ], // Include HttpClientModule here
      
    });
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});