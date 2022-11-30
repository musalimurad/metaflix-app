import React, { useCallback, useEffect, useState } from 'react';
import { Text, View , SafeAreaView, Button} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from "expo-screen-orientation";
import * as Font from 'expo-font';
import { checkConnected } from "./checkInternet";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false);
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);

    useEffect(() => {
      async function prepare() {
        try {
          // Pre-load fonts, make any API calls you need to do here
          await Font.loadAsync(Entypo.font);
          // Artificially delay for two seconds to simulate a slow loading
          // experience. Please remove this if you copy and paste the code!
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.warn(e);
        } finally {
          // Tell the application to render
          setAppIsReady(true);
        }
      }
  
      prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
      if (appIsReady) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
      }
    }, [appIsReady]);
  
    if (!appIsReady) {
      return null;
    }
    checkConnected().then(res=>{
      setConnectStatus(res);
    })
  return (
   connectStatus? <SafeAreaView style={{ flex: 1 }}>
        <WebView onLayout={onLayoutRootView}
        allowsFullscreenVideo={true}
        // javaScriptEnabled={true}
        scrollEnabled={false}
        originWhitelist={['*']}
        // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 
        // (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          source={{ uri: 'https://metaflix.az/' }} 
        />
      </SafeAreaView> : <View style={{ textAlign:"center", flex:1, alignItems:"center", justifyContent:"center"}}>
         <Text>İnternet yoxdur!</Text>
         <Button onPress={checkConnected} title='təkrar yoxla'></Button>
       </View>
  );
}


