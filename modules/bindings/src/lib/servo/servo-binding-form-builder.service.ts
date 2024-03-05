import { MOTOR_LIMITS } from 'rxpoweredup';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppValidators, DeepPartial, IAppConfig } from '@app/shared-misc';
import { ControlSchemeServoBinding, ControllerInputModel, ServoInputAction } from '@app/store';
import { ControlSchemeFormBuilderService } from '@app/shared-control-schemes';

import { CommonBindingsFormControlsBuilderService } from '../common';
import { ServoBindingForm } from './servo-binding-form';
import { IBindingFormBuilder } from '../i-binding-form-builder';

export const NO_INPUTS_SERVO_ERROR = 'NO_SERVO_INPUTS_ERROR';

@Injectable()
export class ServoBindingFormBuilderService implements IBindingFormBuilder<ServoBindingForm> {
    constructor(
        private readonly formBuilder: FormBuilder,
        private commonFormControlBuilder: CommonBindingsFormControlsBuilderService,
        private readonly controlSchemeFormBuilder: ControlSchemeFormBuilderService,
        @Inject(APP_CONFIG) private readonly appConfig: IAppConfig
    ) {
    }

    public get servoMinRange(): number {
        return MOTOR_LIMITS.minServoDegreesRange;
    }

    public get servoMaxRange(): number {
        return this.appConfig.servo.maxServoRange;
    }

    public get aposCenterMin(): number {
        return -MOTOR_LIMITS.maxServoDegreesRange / 2;
    }

    public get aposCenterMax(): number {
        return MOTOR_LIMITS.maxServoDegreesRange / 2;
    }

    public build(): ServoBindingForm {
        return this.formBuilder.group({
            inputs: this.formBuilder.group({
                [ServoInputAction.Cw]: this.commonFormControlBuilder.optionalInputFormGroup(),
                [ServoInputAction.Ccw]: this.commonFormControlBuilder.optionalInputFormGroup()
            }, {
                validators: this.createInputsValidators()
            }),
            hubId: this.controlSchemeFormBuilder.hubIdControl(),
            portId: this.controlSchemeFormBuilder.portIdControl(),
            calibrateOnStart: this.commonFormControlBuilder.toggleControl(true),
            range: this.formBuilder.control<number>(this.appConfig.servo.defaultServoRange, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(this.servoMinRange),
                    Validators.max(this.servoMaxRange),
                    AppValidators.requireInteger,
                    AppValidators.requireNonZero
                ]
            }),
            aposCenter: this.formBuilder.control<number>(0, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(this.aposCenterMin),
                    Validators.max(this.aposCenterMax),
                    AppValidators.requireInteger,
                ]
            }),
            speed: this.commonFormControlBuilder.speedControl(),
            power: this.commonFormControlBuilder.powerControl(),
            invert: this.commonFormControlBuilder.toggleControl(),
            useAccelerationProfile: this.commonFormControlBuilder.toggleControl(),
            useDecelerationProfile: this.commonFormControlBuilder.toggleControl()
        });
    }

    public patchForm(
        form: ServoBindingForm,
        patch: DeepPartial<ControlSchemeServoBinding>
    ): void {
        form.patchValue(patch);
    }

    private createInputsValidators(): ValidatorFn {
        const VALIDATOR = (inputsGroup: AbstractControl<{
            [ServoInputAction.Cw]: ControllerInputModel;
            [ServoInputAction.Ccw]: ControllerInputModel;
        }>): ValidationErrors | null => {
            const cwInput = inputsGroup.value[ServoInputAction.Cw];
            const ccwInput = inputsGroup.value[ServoInputAction.Ccw];
            if (cwInput?.controllerId === null && ccwInput?.controllerId === null) {
                return { [NO_INPUTS_SERVO_ERROR]: true };
            }
            return null;
        };
        // ValidatorFn expects an AbstractControl as the first argument, which is not typed, but it is a subclass of FormGroup
        // So we can safely cast it to ValidatorFn and keep the type safety
        return VALIDATOR as ValidatorFn;
    }
}
