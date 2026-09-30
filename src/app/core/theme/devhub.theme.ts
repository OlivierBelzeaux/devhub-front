import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * An electric orange accent provides a clear interactive contrast over the
 * neutral graphite surfaces used throughout dark mode.
 */
export const DevHubTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#FF7A00',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
      950: '#431407'
    },
    colorScheme: {
      light: {
        primary: {
          contrastColor: '#1c1c1c'
        }
      },
      dark: {
        primary: {
          contrastColor: '#1c1c1c'
        },
        surface: {
          50: '#fcfcfc',
          100: '#fafafa',
          200: '#f6f6f6',
          300: '#e4e4e4',
          400: '#bdbdbd',
          500: '#ababab',
          600: '#999999',
          700: '#666666',
          800: '#3f3f3f',
          900: '#2e2e2e',
          950: '#242424'
        }
      }
    }
  }
});
