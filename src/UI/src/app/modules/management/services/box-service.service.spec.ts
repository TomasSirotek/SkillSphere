import { TestBed } from '@angular/core/testing';

import { ToastrModule, } from 'ngx-toastr';
import { BoxServiceService } from './box-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('BoxServiceService', () => {
  let service: BoxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,  ToastrModule.forRoot()], // Include HttpClientModule here
      
    });
    service = TestBed.inject(BoxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
