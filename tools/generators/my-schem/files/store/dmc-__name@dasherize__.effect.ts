import { Injectable } from '@angular/core';

import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { myActionSuccessType, myActionType } from './dmc-<%= dasherize(name) %>.action';


@Injectable()
export class Dmc<%= classify(name) %>Effect {

  myAction$ = createEffect(() => {
    this.actions$.pipe(
      ofType(myActionType),
      mergeMap( () => this.myActionService.getAll()
        .pipe(
          map( (data) => ({ type: myActionSuccessType, payload: data })),
          catchError(() => EMPTY)
        ))
    )
  })

  constructor(
    private actions$: Actions,
    private myActionService: MyActionService
  ) {}

}
