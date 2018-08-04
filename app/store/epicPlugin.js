import { Subject, Observable } from 'rxjs';
import ActionsObservable from './ActionsObservable';

const createEpicPlugin = (options = {}) => {
  const epic$ = new Subject();
  const actionSubject = new Subject();
  const action$ = new ActionsObservable(actionSubject);

  const epicPlugin = store => {
    const result$ = epic$
      .map(epic => {
        const output$ = epic(action$, store.state); // should return commit.
        if (!output$) {
          throw new TypeError('epic must return a Observable.');
        }

        return output$;
      })
      .switchMap(output$ => output$)
      .subscribe(store.commit);

    store.subscribe((mutation, state) => {
      actionSubject.next(mutation);
    });
  };

  epicPlugin.run = rootEpic => {
    epic$.next(rootEpic);
  };

  return epicPlugin;
};

export default createEpicPlugin;
