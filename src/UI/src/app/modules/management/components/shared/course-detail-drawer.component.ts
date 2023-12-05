import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Chapter, Course } from '../../models/course';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowDownCircle,
  heroArrowUpCircle,
  heroArrowUpRight,
  heroDocument,
  heroHeart,
  heroLockClosed,
  heroLockOpen,
  heroShoppingBag,
  heroTv,
  heroXCircle,
} from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { FormsModule } from '@angular/forms';
import { DrawerService } from '../../services/drawer.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { PaymentLinkRequest, PaymentService } from 'src/app/shared/service/payment.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@Component({
  selector: 'app-detail-drawer',
  standalone: true,
  imports: [CommonModule, NgIcon, FormsModule,RouterLink],
  templateUrl: './course-detail-drawer.component.html',
  viewProviders: [
    provideIcons({
      heroArrowDownCircle,
      heroArrowUpCircle,
      heroHeart,
      heroHeartSolid,
      heroShoppingBag,
      heroXCircle,
      heroTv,
      heroLockClosed,
      heroDocument,
      heroArrowUpRight,
      heroLockOpen
    }),
  ],
})
export class CourseDetailDrawer implements OnInit {
  
  @ViewChild('drawerElement') drawerElement: ElementRef;
  @Output() emitLikeCourseChange = new EventEmitter<string>();

  isDrawerOpen = false;
  showFullDescription = false;
  course: Course = null;
  generatedLink: string | null = null

  constructor(
    private sanitizer: DomSanitizer,
    private drawerService: DrawerService,
    private elementRef: ElementRef,
    private senitaizer: DomSanitizer,
    private paymentService: PaymentService,
    private authService: AuthService
  ) {
    this.drawerService.getOpenModalStatus().subscribe((isOpen) => {
      this.isDrawerOpen = isOpen;
    });
    this.drawerService.getModalData().subscribe((course: Course) => {
       this.processCourseData(course);
    });
  }

handleLikeCourse(courseId: string) {
  this.emitLikeCourseChange.emit(courseId);
  this.course.isLiked = !this.course.isLiked;
}

// PURCHASE
loading = false;
linkGenerated = false;


generateLink() {
  if(!this.course.isPurchased){
    this.loading = true;

    const userId = this.authService.getUserId();

    const request: PaymentLinkRequest = {
      courseToPurchase: {
        id: this.course.id,
        title: this.course.title,
        description: this.course.description,
        price: this.course.price,
        imageUrl: this.course.coverImageRelativePath,
      },
      quantity: 1,
      metadata: { userId: userId, courseId: this.course.id },
      successRedirectUrl:  'http://localhost:4200/dashboard',
      cancelRedirectUrl:  'http://localhost:4200/courses',
    };
    

    this.paymentService.generatePaymentLink(request).subscribe(response => {
      this.generatedLink = response.checkoutUrl;
      this.linkGenerated = true;
      this.loading = false;
    });
    
  }else {
    // open the course preview
    alert("open the course preview");
  }
 
}

// END

processCourseData(course: Course): void {

    if (course) {
        // Map chapters to a new array with isExpanded property
        const chaptersWithExpansion: Chapter[] = course.chapters.map(chapter => ({
            ...chapter,
            isExpanded: false
        }) as unknown as Chapter);

        // Sort chapters based on their positions in the database
        const sortedChapters: Chapter[] = chaptersWithExpansion.sort((a, b) => a.position - b.position);

        // Update the course object with the sorted and expanded chapters
        this.course = { ...course, chapters: sortedChapters };
        
    }
}


  toggleAccordion(chapterId: string): void {
    // Find the index of the chapter in the array
    const index = this.course.chapters.findIndex(chapter => chapter.id === chapterId);

    // findd if the chapter is free or not
    const isFree = this.course.chapters[index].isFree;
    // Toggle the isExpanded property
    if (index !== -1 && isFree) {
      this.course.chapters[index]['isExpanded'] = !this.course.chapters[index]['isExpanded'];
    }
  }



  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    const drawerElement = this.drawerElement?.nativeElement;

    // Check if the event target is not the drawer element or its descendants
    if (
      event.target !== drawerElement &&
      !drawerElement?.contains(event.target)
    ) {
      this.closeDrawer();
    }
  }

  closeDrawer() {
    this.drawerService.closeModal();
    this.course = null;
    this.generatedLink = null;
    this.linkGenerated = false;
    this.isDrawerOpen = false;
  }

  getVideoEmbedUrl(url: string): any {
    const videoId = this.extractVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return null;
  }

  private extractVideoId(url: string): string | null {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  }
  ngOnInit(): void {}
}
