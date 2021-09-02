import { GlobalStyles } from '../styles/index'

import {
  ThemeProvider,
  SignedInProvider,
  VisibilityToggleProvider,
  OtherSettingsProvider,
} from './index'

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <SignedInProvider>
        <VisibilityToggleProvider>
          <OtherSettingsProvider>
            <GlobalStyles />
            {children}
          </OtherSettingsProvider>
        </VisibilityToggleProvider>
      </SignedInProvider>
    </ThemeProvider>
  )
}
