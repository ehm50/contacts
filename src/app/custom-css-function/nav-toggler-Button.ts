export function navTogglerButton():void {

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