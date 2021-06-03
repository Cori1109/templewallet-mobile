import React, { FC, useContext } from 'react';
import { View } from 'react-native';

import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { InsetSubstitute } from '../../components/inset-substitute/inset-substitute';
import { isDefined } from '../../utils/is-defined';
import { CurrentRouteNameContext } from '../current-route-name.context';
import {
  dAppsStackScreens,
  ScreensEnum,
  settingsStackScreens,
  swapStackScreens,
  walletStackScreens
} from '../screens.enum';
import { TabBarButton } from './tab-bar-button/tab-bar-button';
import { useTabBarStyles } from './tab-bar.styles';

export const TabBar: FC = () => {
  const styles = useTabBarStyles();
  const currentRouteName = useContext(CurrentRouteNameContext);

  const isStackFocused = (screensStack: ScreensEnum[]) =>
    isDefined(currentRouteName) && screensStack.includes(currentRouteName);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TabBarButton
          label="Wallet"
          iconName={IconNameEnum.XtzWallet}
          routeName={ScreensEnum.Wallet}
          focused={isStackFocused(walletStackScreens)}
        />
        <TabBarButton
          label="DApps"
          iconName={IconNameEnum.SoonBadge}
          routeName={ScreensEnum.DApps}
          focused={isStackFocused(dAppsStackScreens)}
          disabled={true}
        />
        <TabBarButton
          label="Swap"
          iconName={IconNameEnum.SoonBadge}
          routeName={ScreensEnum.Swap}
          focused={isStackFocused(swapStackScreens)}
          disabled={true}
        />
        <TabBarButton
          label="Settings"
          iconName={IconNameEnum.Settings}
          routeName={ScreensEnum.Settings}
          focused={isStackFocused(settingsStackScreens)}
        />
      </View>
      <InsetSubstitute type="bottom" />
    </View>
  );
};