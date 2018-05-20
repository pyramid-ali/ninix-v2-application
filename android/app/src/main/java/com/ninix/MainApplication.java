package com.ninix;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import io.sentry.RNSentryPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.pilloxa.dfu.RNNordicDfuPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
// import io.sentry.RNSentryPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.polidea.reactnativeble.BlePackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SvgPackage(),
            new RNSentryPackage(MainApplication.this),
            new ReactNativePushNotificationPackage(),
            new RNNordicDfuPackage(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeConfigPackage(),
            new MPAndroidChartPackage(),
            new BlePackage(),
            new LottiePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
