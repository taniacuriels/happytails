import { EventMapBase, NavigationState, RouteProp, ScreenListeners } from "@react-navigation/native";
import { useCallback, useRef } from 'react';
import { StackNavigatorParamList } from "../types/navigation";

export const useStackNavigationScreenListeners = () => {
    const previousStackLength = useRef(0);
    const listeners = useCallback(
      () =>
        ({
          state: ({ data }) => {
            if (!data) {
              return;
            }

            const { state } = data as { state: NavigationState };
            const stackLength = state.routes[state.index].state?.routes.length ?? 1;
            previousStackLength.current = stackLength;
          },
        } as ScreenListeners<NavigationState, EventMapBase>),
      []
    );

    return listeners as (props: {
      route: RouteProp<StackNavigatorParamList>;
    }) => ScreenListeners<NavigationState, EventMapBase>;
  };
