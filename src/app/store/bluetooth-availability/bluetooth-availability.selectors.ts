import { createSelector } from '@ngrx/store';

import { BLUETOOTH_AVAILABILITY_FEATURE } from './bluetooth-availability.reducer';

export const BLUETOOTH_AVAILABILITY_SELECTORS = {
    isAvailable: createSelector(BLUETOOTH_AVAILABILITY_FEATURE.selectBluetoothAvailabilityState, (state) => state.isAvailable)
} as const;
