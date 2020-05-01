package us.powerdesigninc.prompt

import com.facebook.react.bridge.*


class RNAlertPromptModule internal constructor(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext!!) {

  @ReactMethod
  fun prompt(title: String, message: String?, buttonsOptions: ReadableArray, type: String?,
             defaultValue: String?, keyboardType: String?, callback: Callback) {
    PromptDialog(currentActivity!!, title, message, buttonsOptions, type, defaultValue, keyboardType, callback).show()
  }

  override fun getName(): String {
    return "RNAlertPrompt"
  }
}