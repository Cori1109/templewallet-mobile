import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ConfirmationWindow } from '../screens/confirmation-window/confirmation-window';
import { CreateAccount } from '../screens/create-account/create-account';
import { EnterPassword } from '../screens/enter-password/enter-password';
import { ImportAccount } from '../screens/import-account/import-account';
import { Welcome } from '../screens/welcome/welcome';
import { useAppLock } from '../shelter/use-app-lock.hook';
import { useIsAuthorisedSelector } from '../store/wallet/wallet-selectors';
import { ScreensEnum, ScreensParamList } from './screens.enum';
import { WalletTabs } from './wallet-tabs';

const Stack = createStackNavigator<ScreensParamList>();

const isConfirmation = false;

export const Navigator = () => {
  const isAuthorised = useIsAuthorisedSelector();
  const { isLocked } = useAppLock();

  return (
    <>
      <Stack.Navigator headerMode="none">
        {!isAuthorised ? (
          <>
            <Stack.Screen name={ScreensEnum.Welcome} component={Welcome} />
            <Stack.Screen name={ScreensEnum.ImportAccount} component={ImportAccount} />
            <Stack.Screen name={ScreensEnum.CreateAccount} component={CreateAccount} />
          </>
        ) : (
          <Stack.Screen name={ScreensEnum.Wallet} component={WalletTabs} />
        )}
      </Stack.Navigator>

      {isAuthorised && (
        <>
          {isLocked && <EnterPassword />}
          {isConfirmation && <ConfirmationWindow />}
        </>
      )}
    </>
  );
};