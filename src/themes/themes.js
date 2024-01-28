import {
  defaultLightTheme,
  defaultDarkTheme,
  nanoDarkTheme,
  nanoLightTheme,
  radiantDarkTheme,
  radiantLightTheme,
  houseDarkTheme,
  houseLightTheme,
} from 'react-admin';

import { softDarkTheme, softLightTheme } from './softTheme';

export const themes = [
  { name: 'soft', light: softLightTheme, dark: softDarkTheme },
  { name: 'default', light: defaultLightTheme, dark: defaultDarkTheme },
  { name: 'nano', light: nanoLightTheme, dark: nanoDarkTheme },
  { name: 'radiant', light: radiantLightTheme, dark: radiantDarkTheme },
  { name: 'house', light: houseLightTheme, dark: houseDarkTheme },
];
