import { BigNumber } from 'bignumber.js';
import React, { FC } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import { useVisibleTokensDollarBalance } from '../../hooks/use-visible-tokens-dollar-balance';
import { useExchangeRatesSelector } from '../../store/currency/currency-selectors';
import { TokenMetadataInterface } from '../../token/interfaces/token-metadata.interface';
import { getTokenSlug } from '../../token/utils/token.utils';
import { isDefined } from '../../utils/is-defined';
import { formatAssetAmount } from '../../utils/number.util';
import { mutezToTz } from '../../utils/tezos.util';

interface Props {
  token: TokenMetadataInterface;
  amount: string;
  style?: StyleProp<TextStyle>;
  isNegativeAmount?: boolean;
  isSummaryEquityValue?: boolean;
}

// TODO: Replace with AssetValueText
export const DollarValueText: FC<Props> = ({
  token,
  style,
  amount,
  isNegativeAmount = false,
  isSummaryEquityValue = false
}) => {
  const exchangeRates = useExchangeRatesSelector();
  const summaryDollarValue = useVisibleTokensDollarBalance();
  const exchangeRate: number | undefined = exchangeRates[getTokenSlug(token)];
  const parsedAmount = mutezToTz(new BigNumber(amount), token.decimals).multipliedBy(exchangeRate);

  return isDefined(exchangeRate) ? (
    <Text style={style}>
      ≈ {isNegativeAmount && '- '}
      {isSummaryEquityValue ? summaryDollarValue : formatAssetAmount(parsedAmount, BigNumber.ROUND_DOWN, 2)} $
    </Text>
  ) : null;
};
