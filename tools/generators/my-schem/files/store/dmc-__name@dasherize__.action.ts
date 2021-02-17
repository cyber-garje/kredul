import { createAction } from '@ngrx/store';

export const prefix = '[DMC <%= dasherize(name) %>]';

export const myActionType = `${prefix} my action`;
export const myActionSuccessType = `${prefix} my action success`;

export const myAction = createAction(myActionType);
