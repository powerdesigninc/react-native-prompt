import {
  NativeModules,
  Platform,
  AlertButton,
  AlertType,
  Alert,
} from "react-native";

const { RNAlertPrompt } = NativeModules;
const voidCallback = function () {};

type OnPress = (text: string) => void;
type KeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "ascii-capable"
  | "numbers-and-punctuation"
  | "url"
  | "number-pad"
  | "name-phone-pad"
  | "decimal-pad"
  | "twitter"
  | "web-search";

/**
 * The across platform version (android, ios) of prompt dialog
 */
export function prompt(
  title: string,
  message?: string,
  callbackOrButtons?: OnPress | AlertButton[],
  type?: AlertType,
  defaultValue?: string,
  keyboardType?: KeyboardType
) {
  if (Platform.OS == "ios") {
    // ios use original function
    Alert.prompt(
      title,
      message,
      callbackOrButtons,
      type,
      defaultValue,
      keyboardType
    );
  } else if (Platform.OS == "android") {
    // set default buttons
    let buttonOptions: AlertButton[];
    let isFunction = typeof callbackOrButtons == "function";
    if (
      isFunction ||
      callbackOrButtons == null ||
      callbackOrButtons.length == 0
    ) {
      buttonOptions = [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: isFunction ? (callbackOrButtons as OnPress) : null,
        },
      ];
    } else {
      buttonOptions = callbackOrButtons as AlertButton[];
    }

    // only pass max 3 buttons
    buttonOptions = buttonOptions.slice(0, 3);

    RNAlertPrompt.prompt(
      title,
      message,
      buttonOptions,
      type,
      defaultValue,
      keyboardType,
      (index, input) => {
        // react native doesn't support more 2 callbacks
        // so invoke there
        buttonOptions[index]?.onPress?.(input);
      }
    );
  }
}

export default prompt;
