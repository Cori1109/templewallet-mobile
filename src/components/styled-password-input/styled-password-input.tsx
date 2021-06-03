import React, { FC, useState } from 'react';
import { TextInputProps, View } from 'react-native';

import { isString } from '../../utils/is-string';
import { IconNameEnum } from '../icon/icon-name.enum';
import { TouchableIcon } from '../icon/touchable-icon/touchable-icon';
import { StyledTextInput } from '../styled-text-input/styled-text-input';
import { useStyledPasswordInputStyles } from './styled-password-input.styles';

interface Props extends Omit<TextInputProps, 'style'> {
  isError?: boolean;
  isShowCleanButton?: boolean;
}

export const StyledPasswordInput: FC<Props> = ({ value, ...props }) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const styles = useStyledPasswordInputStyles();

  return (
    <View style={styles.view}>
      <StyledTextInput secureTextEntry={isSecureTextEntry} value={value} isPasswordInput {...props} />
      {isString(value) && (
        <View style={styles.eyeButton}>
          <TouchableIcon
            name={isSecureTextEntry ? IconNameEnum.EyeOpenBold : IconNameEnum.EyeClosedBold}
            onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
          />
        </View>
      )}
    </View>
  );
};