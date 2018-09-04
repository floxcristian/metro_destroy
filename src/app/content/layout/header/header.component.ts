// ANGULAR IMPORTS
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import {
	NavigationCancel,
	NavigationEnd,
	NavigationStart,
	RouteConfigLoadEnd,
	RouteConfigLoadStart,
	Router
} from '@angular/router';

// SERVICIOS
import { LayoutRefService } from '../../../core/services/layout/layout-ref.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
	selector: 'm-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

	@ViewChild('mHeader') mHeader: ElementRef;

	constructor(
		private router: Router,
		private layoutRefService: LayoutRefService,
		public loader: LoadingBarService
	) {
		//PROGRESSBAR DE LA PÁGINA
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				// set page progress bar loading to start on NavigationStart event router
				this.loader.start();
			}
			if (event instanceof RouteConfigLoadStart) {
				this.loader.increment(35);
			}
			if (event instanceof RouteConfigLoadEnd) {
				this.loader.increment(75);
			}
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
				// set page progress bar loading to end on NavigationEnd event router
				this.loader.complete();
			}
		});
	}


	ngAfterViewInit(): void {
		// keep header element in the service
		this.layoutRefService.addElement('header', this.mHeader.nativeElement);
	}
}
