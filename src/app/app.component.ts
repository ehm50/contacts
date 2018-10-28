import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ContactService } from '../app/services/contact.service';
import { Contact } from './models/model-interfaces';

@Component({
  selector: 'ch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChild('togglerButton') togglerButton: ElementRef<HTMLButtonElement>;
  @ViewChild('mydiv') mydiv: ElementRef<HTMLDivElement>;
  @ViewChild('mynav') mynav: ElementRef<HTMLDivElement>;
  contactCounter: number;
  flag: boolean = false;

  constructor(private contactService: ContactService, private changeDetector: ChangeDetectorRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.loadContactCounter();
  }
  ngAfterViewInit() {
    this.navTogglerButton();
  }

  loadContactCounter() {
    this.contactService.contacts$.subscribe((contacts) => {
      this.contactCounter = contacts.map((contact: Contact) => { }).length;
      this.changeDetector.markForCheck();
    });

  }

  navTogglerButton() {

    this.renderer.listen(this.togglerButton.nativeElement, 'click', (event) => {
      let navwidth = this.mynav.nativeElement.offsetWidth;
      if (navwidth < 576) {
        if (!this.flag) {
          this.renderer.removeClass(this.mydiv.nativeElement, 'margintop-sm');
          this.renderer.addClass(this.mydiv.nativeElement, 'margintop-toggler-sm');
          this.flag = true;
        } else {
          this.renderer.removeClass(this.mydiv.nativeElement, 'margintop-toggler-sm');
          this.renderer.addClass(this.mydiv.nativeElement, 'margintop-sm');
          this.flag = false;
        }
      } else if (navwidth > 576 && navwidth < 992) {
        if (!this.flag) {
          this.renderer.removeClass(this.mydiv.nativeElement, 'margintop-sm');
          this.renderer.addClass(this.mydiv.nativeElement, 'margintop-toggler-md');
          this.flag = true;
        } else {
          this.renderer.removeClass(this.mydiv.nativeElement, 'margintop-toggler-md');
          this.renderer.addClass(this.mydiv.nativeElement, 'margintop-sm');
          this.flag = false;
        }

      }
    });

  }


}