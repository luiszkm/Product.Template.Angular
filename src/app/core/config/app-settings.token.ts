import { InjectionToken } from '@angular/core';
import type { AppEnvironment } from '../../../environments/env.validator';

export const APP_SETTINGS = new InjectionToken<AppEnvironment>('APP_SETTINGS');
