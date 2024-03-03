import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { WidgetType } from '@app/shared-misc';
import { WidgetConfigModel } from '@app/store';

import { OrderWidgetsPipe } from './order-widgets.pipe';
import { WidgetContainerComponent } from '../widget-container';
import { CONTROL_SCHEME_WIDGET_SETTINGS_COMPONENT_FACTORY, IControlSchemeWidgetSettingsComponentFactory } from '../widget-settings-container';

type WidgetsGridWidgetViewModel = {
    config: WidgetConfigModel;
    hasSettings: boolean;
};

@Component({
    standalone: true,
    selector: 'page-control-scheme-view-control-scheme-widgets-grid',
    templateUrl: './control-scheme-widgets-grid.component.html',
    styleUrls: [ './control-scheme-widgets-grid.component.scss' ],
    imports: [
        OrderWidgetsPipe,
        WidgetContainerComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlSchemeWidgetsGridComponent {
    @Input() public editable = false;

    @Output() public deleteWidget = new EventEmitter<number>();

    @Output() public editWidget = new EventEmitter<number>();

    private _viewModels: WidgetsGridWidgetViewModel[] = [];

    constructor(
        @Inject(CONTROL_SCHEME_WIDGET_SETTINGS_COMPONENT_FACTORY) private readonly settingsFactory: IControlSchemeWidgetSettingsComponentFactory<WidgetType>
    ) {
    }

    @Input()
    public set widgetConfigs(
        data: WidgetConfigModel[]
    ) {
        this._viewModels = data.map((config) => {
            return {
                config,
                hasSettings: this.settingsFactory.hasSettings(config.widgetType)
            };
        });
    }

    public get viewModels(): WidgetsGridWidgetViewModel[] {
        return this._viewModels;
    }

    public onDeleteWidget(
        widgetIndex: number
    ): void {
        this.deleteWidget.emit(widgetIndex);
    }

    public onEditWidget(
        widgetIndex: number
    ): void {
        this.editWidget.emit(widgetIndex);
    }
}
