import { TestBed } from '@angular/core/testing';

import { ToastrModule, } from 'ngx-toastr';
import { CourseService } from './course-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('BoxServiceService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,  ToastrModule.forRoot()], // Include HttpClientModule here
      
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
