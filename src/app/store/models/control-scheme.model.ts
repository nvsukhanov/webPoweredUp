import { ButtonGroupButtonId, MotorServoEndState } from 'rxpoweredup';
import { ControlSchemeBindingType, ControllerInputType } from '@app/shared';

export enum LoopingMode {
    None,
    Wrap,
    Mirror
}

export enum InputGain {
    None,
    Exponential,
    Logarithmic,
}

export type ControlSchemePortConfig = {
    hubId: string;
    portId: number;
    accelerationTimeMs: number;
    decelerationTimeMs: number;
};

export type AccelerationProfileMixin = {
    useAccelerationProfile: boolean;
};

export type DecelerationProfileMixin = {
    useDecelerationProfile: boolean;
};

export type ControlSchemeInput = {
    controllerId: string;
    inputId: string;
    inputType: ControllerInputType;
    gain: InputGain;
    buttonId?: ButtonGroupButtonId;
    portId?: number;
};

export enum ControlSchemeInputAction {
    Accelerate,
    Brake,
    Servo,
    SetAngle,
    Step,
    NextLevel,
    PrevLevel,
    Reset,
}

export type ControlSchemeInputsRecord = { [k in ControlSchemeInputAction]?: ControlSchemeInput };

export type ControlSchemeSetSpeedBinding = {
    id: number;
    operationMode: ControlSchemeBindingType.SetSpeed;
    inputs: {
        [ControlSchemeInputAction.Accelerate]: ControlSchemeInput;
        [ControlSchemeInputAction.Brake]?: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    maxSpeed: number;
    isToggle: boolean;
    invert: boolean;
    power: number;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeServoBinding = {
    id: number;
    operationMode: ControlSchemeBindingType.Servo;
    inputs: {
        [ControlSchemeInputAction.Servo]: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    range: number;
    aposCenter: number;
    speed: number;
    power: number;
    invert: boolean;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeSetAngleBinding = {
    id: number;
    operationMode: ControlSchemeBindingType.SetAngle;
    inputs: {
        [ControlSchemeInputAction.SetAngle]: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    angle: number;
    speed: number;
    power: number;
    endState: MotorServoEndState;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeStepperBinding = {
    id: number;
    operationMode: ControlSchemeBindingType.Stepper;
    inputs: {
        [ControlSchemeInputAction.Step]: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    degree: number;
    speed: number;
    power: number;
    endState: MotorServoEndState;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeSpeedShiftBinding = {
    id: number;
    operationMode: ControlSchemeBindingType.SpeedShift;
    inputs: {
        [ControlSchemeInputAction.NextLevel]: ControlSchemeInput;
        [ControlSchemeInputAction.PrevLevel]?: ControlSchemeInput;
        [ControlSchemeInputAction.Reset]?: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    levels: number[];
    power: number;
    loopingMode: LoopingMode;
    initialStepIndex: number;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeAngleShiftBinding = {
    id: number;
    operationMode: ControlSchemeBindingType.AngleShift;
    inputs: {
        [ControlSchemeInputAction.NextLevel]: ControlSchemeInput;
        [ControlSchemeInputAction.PrevLevel]?: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    angles: number[];
    speed: number;
    power: number;
    loopingMode: LoopingMode;
    endState: MotorServoEndState;
    initialStepIndex: number;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeBinding = ControlSchemeSetSpeedBinding
    | ControlSchemeServoBinding
    | ControlSchemeSetAngleBinding
    | ControlSchemeStepperBinding
    | ControlSchemeSpeedShiftBinding
    | ControlSchemeAngleShiftBinding;

export type ControlSchemeModel = {
    name: string;
    portConfigs: ControlSchemePortConfig[];
    bindings: ControlSchemeBinding[];
};
