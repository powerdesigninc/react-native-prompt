package us.powerdesigninc.prompt

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.graphics.Typeface
import android.text.InputType
import android.text.SpannableStringBuilder
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import android.widget.TextView
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReadableArray

class PromptDialog(private val activity: Activity, private val title: String, private val message: String?, private val buttonsOptions: ReadableArray,
                   private val type: String?, private val defaultValue: String?, private val keyboardType: String?, private val callback: Callback) : Dialog(activity, R.style.AlertTheme) {

  override fun show() {
    val layoutInflater = activity.layoutInflater
    val dialogView = layoutInflater.inflate(R.layout.dialog, null) as ViewGroup;

    // title
    dialogView.findViewById<TextView>(R.id.title).apply {
      text = title
    }

    // message
    if (message != null) {
      dialogView.findViewById<TextView>(R.id.message).apply {
        text = message
        visibility = View.VISIBLE
      }
    }

    // input
    val inputView = dialogView.findViewById<EditText>(R.id.input).apply {
      if (defaultValue != null) {
        text = SpannableStringBuilder(defaultValue)
      }

      if (type == "secure-text") {
        inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
      }

      // 'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter' or 'web-search'
      when (keyboardType) {
        "email-address" -> {

        }
      }
    }

    inputView.post {
      // requestFocus and show keyboard
      inputView.requestFocus()

      val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
      imm.showSoftInput(inputView, InputMethodManager.SHOW_IMPLICIT)
    }

    // buttons
    val buttonViewGroupId = activity.resources.getIdentifier("button_${buttonsOptions.size()}", "layout", activity.applicationInfo.packageName)
    val buttonViewGroup = layoutInflater.inflate(buttonViewGroupId, dialogView)

    for (index in 0 until buttonsOptions.size()) {
      val options = buttonsOptions.getMap(index)!!
      val buttonViewId = activity.resources.getIdentifier("button${index+1}", "id", activity.applicationInfo.packageName)
      val buttonView = buttonViewGroup.findViewById<TextView>(buttonViewId)

      if (options.hasKey("text")) {
        buttonView.text = options.getString("text")
      }

      if (options.hasKey("style")) {
        val style = options.getString("style")

        if (style == "cancel") {
          buttonView.typeface = Typeface.DEFAULT_BOLD
        } else if (style == "destructive") {
          buttonView.setTextColor(ContextCompat.getColor(buttonView.context, R.color.destructive))
        }
      }

      buttonView.setOnClickListener {
        callback.invoke(index, inputView.text.toString())
        dismiss()
      }
    }

    setContentView(dialogView)

    super.show()
  }
}