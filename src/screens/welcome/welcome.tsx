import React from 'react';
import { View } from 'react-native';

import { ButtonLargePrimary } from '../../components/button/button-large/button-large-primary/button-large-primary';
import { ButtonLargeSecondary } from '../../components/button/button-large/button-large-secondary/button-large-secondary';
import { ButtonsContainer } from '../../components/button/buttons-container/buttons-container';
import { Divider } from '../../components/divider/divider';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { InsetSubstitute } from '../../components/inset-substitute/inset-substitute';
import { Quote } from '../../components/quote/quote';
import { ScreenContainer } from '../../components/screen-container/screen-container';
import { ScreensEnum } from '../../navigator/enums/screens.enum';
import { useNavigation } from '../../navigator/hooks/use-navigation.hook';
import { formatSize } from '../../styles/format-size';
import { WelcomeSelectors } from './welcome.selectors';
import { useWelcomeStyles } from './welcome.styles';

export const Welcome = () => {
  const { navigate } = useNavigation();
  const styles = useWelcomeStyles();

  return (
    <ScreenContainer isFullScreenMode={true}>
      <View style={styles.imageView}>
        <InsetSubstitute />
        <Icon name={IconNameEnum.TempleLogoWithText} width={formatSize(208)} height={formatSize(64)} />
      </View>
      <Divider />
      <Quote
        quote="The only function of economic forecasting is to make astrology look more respectable."
        author="John Kenneth Galbraith"
      />
      <Divider />
      <View>
        <ButtonLargePrimary
          title="Create a new Wallet"
          iconName={IconNameEnum.PlusSquare}
          onPress={() => navigate(ScreensEnum.CreateAccount)}
          testID={WelcomeSelectors.CreateNewWalletButton}
        />
        <Divider size={formatSize(24)} />

        <ButtonsContainer>
          <ButtonLargeSecondary
            title="Import"
            iconName={IconNameEnum.DownloadCloud}
            onPress={() => navigate(ScreensEnum.ImportAccount)}
            testID={WelcomeSelectors.ImportExistingWalletButton}
          />
          <Divider size={formatSize(15)} />
          <ButtonLargeSecondary
            title="Sync"
            iconName={IconNameEnum.Link}
            onPress={() => navigate(ScreensEnum.SyncAccount)}
          />
        </ButtonsContainer>
        <Divider size={formatSize(43)} />
        <InsetSubstitute type="bottom" />
      </View>
    </ScreenContainer>
  );
};
