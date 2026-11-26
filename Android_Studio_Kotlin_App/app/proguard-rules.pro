# ============================================================================
# RE:MK Coaching v37.14 – R8 Obfuscation & Anti-Tamper Keep Rules
# Copyright (c) RE:MK Coaching (eu.remk.coaching)
# ============================================================================

# Keep all WebView @JavascriptInterface methods and bridge class
-keepattributes JavascriptInterface, *Annotation*
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class eu.remk.coaching.RemkNativeBridge { *; }

# Keep Android Manifest entry points (Activities, Widgets, Services, Receivers)
-keep public class eu.remk.coaching.MainActivity { *; }
-keep public class eu.remk.coaching.RemkQuickInputActivity { *; }
-keep public class eu.remk.coaching.RemkLockscreenActivity { *; }
-keep public class eu.remk.coaching.RemkLockscreenService { *; }
-keep public class eu.remk.coaching.RemkLockscreenReceiver { *; }
-keep public class eu.remk.coaching.RemkBootReceiver { *; }
-keep public class eu.remk.coaching.RemkWidgetProvider { *; }
-keep public class eu.remk.coaching.RemkWorkoutWidgetProvider { *; }
-keep public class eu.remk.coaching.RemkEnduranceWidgetProvider { *; }
-keep public class eu.remk.coaching.RemkHealthWidgetProvider { *; }
-keep public class eu.remk.coaching.RemkCockpitWidgetProvider { *; }
-keep public class eu.remk.coaching.RemkCalendarWidgetProvider { *; }

# Keep AndroidX WebKit, Core FileProvider & JSON utilities
-keep class androidx.webkit.** { *; }
-keep class androidx.core.content.FileProvider { *; }
-keep class org.json.** { *; }

# Strip verbose debug logs in obfuscated builds
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
    public static int i(...);
}

# Repackage internal classes cleanly & hide source filenames
-repackageclasses 'remk.sec'
-renamesourcefileattribute REMK
-keepattributes LineNumberTable
