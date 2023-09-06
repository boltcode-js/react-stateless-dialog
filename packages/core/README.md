# react-stateless-dialog

react-stateless-dialog is a powerful React & React Native library that allows developers to effortlessly 
show important information to users within their apps. With a range of versatile features, including a customizable snackbar, 
a global progress modal, and a convenient dialog manager, this library simplifies the process of delivering essential messages to your user without
the need of managing painful states.

## Key Features:

- DialogManager: Effortlessly push dialogs using a simple React hook.
- SnackbarManager: Display eye-catching snackbar to instantly grab user attention. Customize the content and appearance of the snackbar to suit your app's branding and requirements.
- ProgressManager: Easily manage global progress indicators that inform users about ongoing background tasks or operations. Show progress, loading spinners to provide real-time feedback on the status of actions.

# Installation & Setup

This library is under active development, it consists on 3 packages:
 - `@react-stateless-dialog/core`: An abstraction layer that manage state & managers 
 - `@react-stateless-dialog/web`: The React implementation to use on Web (currently not available, under development)
 - `@react-stateless-dialog/native`: The React Native implementation to use on mobile

## Use on React Web

IN PROGRESS

## Use on React Native

```bash
yarn add @react-stateless-dialog/core @react-stateless-dialog/native

# The library rely on react-native-reanimated & react-native-safe-area-context, you need to install these packages in your project
yarn add react-native-reanimated react-native-safe-area-context
```

Setup react-native-reanimated:
```js
// Add this to your babel.config.js :
plugins: ['react-native-reanimated/plugin']
```

Setup the provider:
```tsx
import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { overrideStatelessDialogConfig, StatelessDialogProvider } from '@react-stateless-dialog/core';
import { StatelessDialogConfigNative } from '@react-stateless-dialog/native';

// The config should be immutable and placed outside of the component
const statelessDialogConfig = overrideStatelessDialogConfig(StatelessDialogConfigNative, {
    // Customize the provider
});

function App() {
    return (
        // Note: SafeAreaProvider is required to make the library working
        <SafeAreaProvider>
            <StatelessDialogProvider config={statelessDialogConfig}>
                {/* App Content */}
            </StatelessDialogProvider>
        </SafeAreaProvider>
    );
}
```

# Usage

The full documentation is available here : https://pale-rook-06c.notion.site/React-Stateless-Dialog-d0ca1a2ee958454aa0ade7c9bddfa81f?pvs=4
