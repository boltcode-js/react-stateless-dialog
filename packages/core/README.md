# react-native-global-flow

react-native-global-flow is a powerful React Native library that allows developers to effortlessly 
show important information to users within their apps. With a range of versatile features, including a customizable banner, 
a global progress modal, and a convenient dialog manager, this library simplifies the process of delivering essential messages to your user without
the need of managing painful states.

## Key Features:

- Global Banner: Display eye-catching banners at the top of the app to instantly grab user attention. Customize the content and appearance of the banners to suit your app's branding and requirements.
- Global Progress: Easily manage global progress indicators that inform users about ongoing background tasks or operations. Show progress, loading spinners to provide real-time feedback on the status of actions.
- Dialog Manager: Effortlessly push dialogs using a simple React hook.

# Installation & Setup

```bash
yarn add @boltcode/react-native-global-flow

# The library rely on react-native-reanimated & react-native-safe-area-context, you need to install these packages in your project
yarn add react-native-reanimated react-native-safe-area-context
```

Setup react-native-reanimated:
```js
// Add this to your babel.config.js :
plugins: ['react-native-reanimated/plugin']
```

Setup the provider:
```ts
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalFlowProvider } from '@boltcode/react-native-global-flow';

const App = () => {
  // Note: SafeAreaProvider is required to make the library working
  return (
    <SafeAreaProvider>
      <GlobalFlowProvider>
          {/* Your app */}
      </GlobalFlowProvider>
    </SafeAreaProvider>
  );
};
```

# Usage

The full documentation is available here : https://pale-rook-06c.notion.site/React-Native-Global-Flow-24638e4fa871412bae2991bc6342f6c1?pvs=4
