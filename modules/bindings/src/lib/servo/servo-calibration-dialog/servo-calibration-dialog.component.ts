import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslocoPipe } from '@ngneat/transloco';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HubServoCalibrationFacadeService } from '@app/store';

export type ServoCalibrationDialogData = {
    hubId: string;
    portId: number;
    speed: number;
    power: number;
};

@Component({
    standalone: true,
    selector: 'lib-cs-servo-calibration-dialog',
    templateUrl: './servo-calibration-dialog.component.html',
    styleUrls: [ './servo-calibration-dialog.component.scss' ],
    imports: [
        MatButtonModule,
        MatProgressBarModule,
        TranslocoPipe,
        MatDialogModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoCalibrationDialogComponent implements OnInit, OnDestroy {
    private readonly sub = new Subscription();

    private readonly calibrationRuns = 2;

    constructor(
        private readonly dialog: MatDialogRef<ServoCalibrationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly data: ServoCalibrationDialogData,
        private readonly calibrationService: HubServoCalibrationFacadeService
    ) {
    }

    public ngOnInit(): void {
        this.sub.add(
            this.calibrationService.calibrateServo(
                this.data.hubId,
                this.data.portId,
                this.data.speed,
                this.data.power,
                this.calibrationRuns
            ).subscribe((result) => {
                this.dialog.close(result);
            })
        );
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public onCancel(): void {
        this.dialog.close(null);
    }
}
