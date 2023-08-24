import { ButtonGroupButtonId, MotorServoEndState } from '@nvsukhanov/rxpoweredup';
import { ControlSchemeBindingType, ControllerInputType } from '@app/shared';

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
    buttonId: ButtonGroupButtonId | null;
    portId: number | null;
};

export type ControlSchemeInputsRecord = Record<string, ControlSchemeInput>;

export type ControlSchemeSetSpeedBinding = {
    id: string;
    operationMode: ControlSchemeBindingType.SetSpeed;
    inputs: {
        accelerate: ControlSchemeInput;
        brake?: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    maxSpeed: number;
    isToggle: boolean;
    invert: boolean;
    power: number;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeServoBinding = {
    id: string;
    operationMode: ControlSchemeBindingType.Servo;
    inputs: {
        servo: ControlSchemeInput;
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
    id: string;
    operationMode: ControlSchemeBindingType.SetAngle;
    inputs: {
        setAngle: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    angle: number;
    speed: number;
    power: number;
    endState: MotorServoEndState;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeStepperBinding = {
    id: string;
    operationMode: ControlSchemeBindingType.Stepper;
    inputs: {
        step: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    degree: number;
    speed: number;
    power: number;
    endState: MotorServoEndState;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeSpeedShiftBinding = {
    id: string;
    operationMode: ControlSchemeBindingType.SpeedShift;
    inputs: {
        nextSpeed: ControlSchemeInput;
        prevSpeed?: ControlSchemeInput;
        stop?: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    levels: number[];
    power: number;
    initialStepIndex: number;
} & AccelerationProfileMixin & DecelerationProfileMixin;

export type ControlSchemeAngleShiftBinding = {
    id: string;
    operationMode: ControlSchemeBindingType.AngleShift;
    inputs: {
        nextAngle: ControlSchemeInput;
        prevAngle?: ControlSchemeInput;
    } & ControlSchemeInputsRecord;
    hubId: string;
    portId: number;
    angles: number[];
    speed: number;
    power: number;
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
    id: string;
    name: string;
    portConfigs: ControlSchemePortConfig[];
    bindings: ControlSchemeBinding[];
};
