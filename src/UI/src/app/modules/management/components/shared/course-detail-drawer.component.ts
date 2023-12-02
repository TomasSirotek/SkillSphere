import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chapter, Course } from '../../models/course';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowDownCircle,
  heroArrowUpCircle,
  heroDocument,
  heroHeart,
  heroLockClosed,
  heroShoppingBag,
  heroTv,
  heroXCircle,
} from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { FormsModule } from '@angular/forms';
import { DrawerService } from '../../services/drawer.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-drawer',
  standalone: true,
  imports: [CommonModule, NgIcon, FormsModule],
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
    }),
  ],
})
export class CourseDetailDrawer implements OnInit {
  handleLikeCourse(arg0: string) {
    this.isLiked = !this.isLiked;
  }
  @ViewChild('drawerElement') drawerElement: ElementRef;

  isDrawerOpen = false;
  showFullDescription = false;
  isLiked: boolean = false;
  course: Course = null;

  constructor(
    private sanitizer: DomSanitizer,
    private drawerService: DrawerService,
    private elementRef: ElementRef,
    private senitaizer: DomSanitizer
  ) {
    this.drawerService.getOpenModalStatus().subscribe((isOpen) => {
      this.isDrawerOpen = isOpen;
    });
    this.drawerService.getModalData().subscribe((course: Course) => {
       this.processCourseData(course);
    });
  }

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
    this.isDrawerOpen = false;
  }

  getVideoEmbedUrl(url: string): any {
    // Example YouTube URL formats:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
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
