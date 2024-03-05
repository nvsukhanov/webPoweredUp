import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DeepPartial } from '@app/shared-misc';
import { ControlSchemeTrainControlBinding, TrainControlInputAction } from '@app/store';
import { ControlSchemeFormBuilderService } from '@app/shared-control-schemes';

import { CommonBindingsFormControlsBuilderService } from '../common';
import { TrainControlBindingForm } from './train-control-binding-form';
import { IBindingFormBuilder } from '../i-binding-form-builder';

@Injectable()
export class TrainControlBindingFormBuilderService implements IBindingFormBuilder<TrainControlBindingForm> {
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commonFormControlsBuilder: CommonBindingsFormControlsBuilderService,
        private readonly controlSchemeFormBuilder: ControlSchemeFormBuilderService
    ) {
    }

    public build(): TrainControlBindingForm {
        return this.formBuilder.group({
            inputs: this.formBuilder.group({
                [TrainControlInputAction.NextSpeed]: this.commonFormControlsBuilder.inputFormGroup(),
                [TrainControlInputAction.PrevSpeed]: this.commonFormControlsBuilder.optionalInputFormGroup(),
                [TrainControlInputAction.Reset]: this.commonFormControlsBuilder.optionalInputFormGroup()
            }),
            hubId: this.controlSchemeFormBuilder.hubIdControl(),
            portId: this.controlSchemeFormBuilder.portIdControl(),
            levels: this.formBuilder.array<FormControl<number>>([
                this.commonFormControlsBuilder.speedLevelControl(0)
            ], {
                validators: [
                    Validators.required,
                    Validators.minLength(2)
                ]
            }),
            power: this.commonFormControlsBuilder.powerControl(),
            loopingMode: this.commonFormControlsBuilder.loopingModeControl(),
            useAccelerationProfile: this.commonFormControlsBuilder.toggleControl(),
            useDecelerationProfile: this.commonFormControlsBuilder.toggleControl(),
            initialLevelIndex: this.formBuilder.control<number>(0, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(0)
                ]
            })
        });
    }

    public patchForm(
        form: TrainControlBindingForm,
        patch: DeepPartial<ControlSchemeTrainControlBinding>
    ): void {
        form.patchValue(patch);
        form.controls.levels.clear();
        if (patch.levels) {
            patch.levels.forEach((speed) =>
                form.controls.levels.push(this.commonFormControlsBuilder.speedLevelControl(speed))
            );
        } else {
            form.controls.levels.push(this.commonFormControlsBuilder.speedLevelControl(0));
            form.controls.initialLevelIndex.setValue(0);
        }
    }
}
