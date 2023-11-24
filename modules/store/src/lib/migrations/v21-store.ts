import { Language, Override } from '@app/shared-misc';

import { AppStoreVersion } from '../app-store-version';
import { UserSelectedTheme } from '../models';
import { V22Store } from './v22-store';

export type V21Store = Override<V22Store, {
    settings: {
        theme: UserSelectedTheme;
        language: Language;
    };
    storeVersion: AppStoreVersion.v21;
}>;
