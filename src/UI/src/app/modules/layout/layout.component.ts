import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AlertComponent } from 'src/app/shared/component/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import {
  CmdkModule,
  CommandComponent,
  EmptyDirective,
  GroupComponent,
  InputDirective,
  ItemDirective,
  ListComponent,
} from '@ngneat/cmdk';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { DynamicViewModule } from '@ngneat/overview';
import { Overlay } from 'ngx-toastr';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  OverlayModule,
} from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';
import { SearchService } from './services/search.service';
import { CourseService } from '../management/services/course-service.service';
import { data } from 'autoprefixer';
import { UserService } from 'src/app/core/auth/service/user.service';
import { take } from 'rxjs';
import { Drawer } from 'flowbite';
import { DrawerService } from '../management/services/drawer.service';
import { Course } from '../management/models/course';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    AlertComponent,
    CmdkModule,
    NgIf,
    OverlayModule,
    CommandComponent,
    InputDirective,
    ListComponent,
    GroupComponent,
    NgFor,
    DynamicViewModule,
    ItemDirective,
    EmptyDirective,
    CdkConnectedOverlay,
    NgStyle,
    FormsModule,
    NgClass,
  ],
})
export class LayoutComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    public searchService: SearchService,
    private userService: UserService,
    private courseService: CourseService,
    private drawerService: DrawerService,
    private routerRouter: Router
  ) {}

  @ViewChild('cmdkCommand') cmdkCommand!: ElementRef<HTMLDivElement>;

  @ViewChild(CdkConnectedOverlay, { static: false })
  connectedOverlay: CdkOverlayOrigin;

  cmdKeyDown = false;
  projectItems: any;
  selectedProjectIndex: number = -1;

  styleTransform = '';
  filteredProjectItems: any[];
  selectedProject: any;

  listener(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.altKey)) {
      e.preventDefault();
      if (this.searchService.showSearch) {
        this.searchService.toggleSidebar();
      } else {
        this.searchService.toggleSidebar();
      }
    }
  }

  async ngOnInit() {
    await this.loadAllCourses();
    document.addEventListener('keydown', (ev) => this.listener(ev));
  }

   OnDestroy() {
    document.removeEventListener('keydown', (ev) => this.listener(ev));
  }

  inputValue = '';
  pages: Array<string> = ['home'];

  readonly groups: Array<{
    group: string;
    items: Array<{
      label: string;
      itemSelected?: () => void;
      separatorOnTop?: boolean;
    }>;
  }> = [
    {
      group: 'Courses',
      items: [
        {
          label: 'Search Projects...',
          itemSelected: () => {
            this.searchProjects();
          },
        },
      ],
    },
    {
      group: 'My projects',
      items: [
        {
          label: 'Search Own courses...',
          itemSelected: () => {
            this.searchPurchased();
          },
        },
      ],
    },
    {
      group: 'Navigation',
      items: [
        {
          label: 'Store',
          itemSelected: () => {
            this.rerouteToDetail();
          },
          separatorOnTop: true,
        },
        {
          label: 'Dashboard',
          itemSelected: () => {
            this.rerouteToDashboard();
          },
          separatorOnTop: false,
        },
      ],
    },
  ];

  selectProject(course: Course) {
    const courseId = course.id;



    if (this.activePage === 'courses') {
      const currentUrl = this.routerRouter.url;

      if (currentUrl === '/courses') {
        this.drawerService.openModal();
        this.drawerService.setModalData(course);
        this.searchService.toggleSidebar();
      } else {
        // Navigate to '/courses' and perform actions after navigation
        this.routerRouter.navigate(['/courses']).then(() => {
          // Use setTimeout to ensure that the navigation has completed
          setTimeout(() => {
            this.drawerService.openModal();
            this.drawerService.setModalData(course);
            this.searchService.toggleSidebar();
          }, 0);
        });
      }
    } else if (this.activePage === 'my-courses') {
      // If on the 'my-courses' page, navigate to the project details within that page
      this.routerRouter.navigate(['/dashboard/my-courses', courseId]);
    }
  }

  async loadAllCourses() {
    await this.userService.loadData().pipe(take(1)).toPromise();
    this.courseService.getAllCourses().subscribe((data: any) => {
      this.filteredProjectItems = data.courses;
    });
  }

  get activePage() {
    return this.pages[this.pages.length - 1];
  }

  get isHome() {
    return this.activePage === 'home';
  }

  setInputValue(ev: Event) {
    this.inputValue = (ev.target as HTMLInputElement).value;
  }

  onKeyDown(ev: KeyboardEvent) {

    if (this.activePage === 'projects') {
      // Handle arrow keys to navigate through projects
      if (ev.key === 'ArrowUp' && this.selectedProjectIndex > 0) {
        this.selectedProjectIndex--;
      } else if (ev.key === 'ArrowDown' && this.selectedProjectIndex < this.filteredProjectItems.length - 1) {
        this.selectedProjectIndex++;
      }
    }

    
    
    if (ev.key === 'Enter') {
      this.bounce();
 // Check if on the 'projects' page and handle accordingly
 if (this.activePage === 'projects') {
  const selectedProject = this.filteredProjectItems[this.selectedProjectIndex];

  if (selectedProject) {
    const currentUrl = this.routerRouter.url;

    if (currentUrl === '/courses') {
      // Handle the logic when 'Enter' is pressed inside cmdk-command on the 'projects' page
      this.drawerService.openModal();
      this.drawerService.setModalData(selectedProject);
      this.searchService.toggleSidebar();
    } else {
      // Navigate to '/courses' and perform actions after navigation
      this.routerRouter.navigate(['/courses']).then(() => {
        // Use setTimeout to ensure that the navigation has completed
        setTimeout(() => {
          this.drawerService.openModal();
          this.drawerService.setModalData(selectedProject);
          this.searchService.toggleSidebar();
        }, 0);
      });
    }
  }
}
    
    }

    if (this.isHome || this.inputValue.length) {
      return;
    }

    if (ev.key === 'Backspace') {
      ev.preventDefault();
      this.popPage();
      this.bounce();
    }
  }
  popPage() {
    this.pages.splice(-1, 1);
  }
  bounce() {
    this.styleTransform = 'scale(0.96)';
    setTimeout(() => {
      this.styleTransform = '';
    }, 100);
  }
  rerouteToDetail() {
    this.searchService.toggleSidebar();
    this.routerRouter.navigate(['/courses']);
  }

  rerouteToDashboard() {
    this.searchService.toggleSidebar();
    this.routerRouter.navigate(['/dashboard/my-courses']);
  }

  // pushed project page
  searchProjects() {
    this.pages.push('courses');
  }

  searchPurchased() {
    this.pages.push('my-courses');
  }
}
