import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { filter, switchMap } from 'rxjs';
import { ControllerTypeIconNamePipe, ControllerTypeToL10nKeyPipe, HintComponent, ScreenSizeObserverService, TitleService } from '@app/shared-misc';
import { ControllerProfilesFacadeService } from '@app/store';

import { CONTROLLER_PAGE_SELECTORS } from './controller-page-selectors';
import { ControllerNamePipe } from '../controller-name.pipe';
import { ControllerSettingsContainerComponent } from './controller-settings-container';

@Component({
    standalone: true,
    selector: 'app-controller-page',
    templateUrl: './controller-page.component.html',
    styleUrls: [ './controller-page.component.scss' ],
    imports: [
        NgIf,
        PushPipe,
        MatCardModule,
        HintComponent,
        TranslocoPipe,
        ControllerNamePipe,
        ControllerSettingsContainerComponent,
        MatIconModule,
        ControllerTypeIconNamePipe,
        ControllerTypeToL10nKeyPipe
    ],
    providers: [
        TitleService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerPageComponent implements OnInit {
    public readonly viewModel$ = this.store.select(CONTROLLER_PAGE_SELECTORS.selectViewModel);

    public readonly isSmallScreen$ = this.screenSizeObserver.isSmallScreen$;

    constructor(
        private readonly store: Store,
        private readonly screenSizeObserver: ScreenSizeObserverService,
        private readonly titleService: TitleService,
        private readonly controllerProfilesFacadeService: ControllerProfilesFacadeService,
        private readonly translocoService: TranslocoService
    ) {
    }

    public ngOnInit(): void {
        const title$ = this.store.select(CONTROLLER_PAGE_SELECTORS.selectCurrentlyViewedControllerId).pipe(
            filter((controllerId): controllerId is string => !!controllerId),
            switchMap((controllerId) => this.controllerProfilesFacadeService.getByControllerId(controllerId)),
            switchMap((controllerProfile) => controllerProfile.name$),
            switchMap((controllerName) => this.translocoService.selectTranslate('pageTitle.controllerView', { controllerName }))
        );
        this.titleService.setTitle$(title$);
    }
}
