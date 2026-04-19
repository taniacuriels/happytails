import { UnknownAction } from '@reduxjs/toolkit';
import { PersistRootState, startAppListener, RootState } from '../../redux/store';
import { setFirstTimeInstallation } from './appSlice';

export const onAppLaunchOrRehydratePredicate = (action: UnknownAction, currentState: RootState, prevState: RootState) => {
  const currentPersistState = currentState as PersistRootState;
  const prevPersistState = prevState as PersistRootState;
  console.log('onAppLaunchOrRehydratePredicate');
  return !prevPersistState?._persist?.rehydrated && currentPersistState?._persist?.rehydrated;
};

startAppListener({
    predicate: onAppLaunchOrRehydratePredicate,
    effect: (_, listenerAPI) => {
        console.log('State Before: ', listenerAPI.getState());
        listenerAPI.dispatch(setFirstTimeInstallation(false));
        console.log('State After: ', listenerAPI.getState());
    },
});

startAppListener({
    actionCreator: setFirstTimeInstallation,
    effect: (_, listenerAPI) => {
        console.log('State Before: ', listenerAPI.getState());
    },
});
