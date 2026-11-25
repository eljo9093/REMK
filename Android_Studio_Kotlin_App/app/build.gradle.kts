plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "eu.remk.coaching"
    compileSdk = 34

    defaultConfig {
        applicationId = "eu.remk.coaching"
        minSdk = 24
        targetSdk = 34
        versionCode = 392
        versionName = "37.22-betafinal"
    }

    signingConfigs {
        create("remkFixed") {
            storeFile = file("remk_phone_fixed.jks")
            storePassword = "remk2026fixed"
            keyAlias = "remk_phone"
            keyPassword = "remk2026fixed"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            if (file("remk_phone_fixed.jks").exists()) {
                signingConfig = signingConfigs.getByName("remkFixed")
            }
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            isMinifyEnabled = true
            if (file("remk_phone_fixed.jks").exists()) {
                signingConfig = signingConfigs.getByName("remkFixed")
            }
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.webkit:webkit:1.10.0")
}
