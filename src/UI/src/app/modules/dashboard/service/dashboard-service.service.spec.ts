import { TestBed } from '@angular/core/testing';
import { ToastrModule, } from 'ngx-toastr';

import { DashboardServiceService } from './dashboard-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardServiceService', () => {
  let service: DashboardServiceService;

  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot()], // Include HttpClientModule here
      
    });
    service = TestBed.inject(DashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
