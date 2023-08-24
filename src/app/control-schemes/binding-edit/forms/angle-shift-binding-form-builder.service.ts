import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ControlSchemeAngleShiftBinding } from '@app/store';

import { AngleShiftBindingForm } from '../types';
import { CommonFormControlsBuilderService } from './common-form-controls-builder.service';

@Injectable({ providedIn: 'root' })
export class AngleShiftBindingFormBuilderService {
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commonFormControlsBuilder: CommonFormControlsBuilderService
    ) {
    }

    public build(): AngleShiftBindingForm {
        return this.formBuilder.group({
            id: this.commonFormControlsBuilder.schemeIdControl(),
            inputs: this.formBuilder.group({
                nextAngle: this.commonFormControlsBuilder.inputFormGroup(),
                prevAngle: this.commonFormControlsBuilder.optionalInputFormGroup()
            }),
            hubId: this.commonFormControlsBuilder.hubIdControl(),
            portId: this.commonFormControlsBuilder.portIdControl(),
            angles: this.formBuilder.array<FormControl<number>>([
                this.commonFormControlsBuilder.angleSelectControl(0)
            ], {
                validators: [
                    Validators.required,
                    Validators.minLength(2)
                ]
            }),
            speed: this.commonFormControlsBuilder.speedControl(),
            power: this.commonFormControlsBuilder.powerControl(),
            endState: this.commonFormControlsBuilder.servoEndStateControl(),
            useAccelerationProfile: this.commonFormControlsBuilder.toggleControl(),
            useDecelerationProfile: this.commonFormControlsBuilder.toggleControl(),
            initialStepIndex: this.formBuilder.control<number>(0, { nonNullable: true })
        });
    }

    public patchForm(
        form: AngleShiftBindingForm,
        binding: Partial<ControlSchemeAngleShiftBinding>
    ): void {
        form.patchValue(binding);
        form.controls.angles.clear();
        if (binding.angles) {
            binding.angles.forEach((angle) =>
                form.controls.angles.push(this.commonFormControlsBuilder.angleSelectControl(angle))
            );
        } else {
            form.controls.angles.push(this.commonFormControlsBuilder.angleSelectControl(0));
            form.controls.initialStepIndex.setValue(0);
        }
    }
}
