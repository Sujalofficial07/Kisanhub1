# KisanHub - ready-to-upload project (JS + CI build)

This repository contains the React Native app source (JavaScript) and a GitHub Actions workflow
that will initialize a temporary React Native CLI project in CI, copy these JS files into it,
install dependencies, and build an Android debug APK. This approach helps when you cannot
run `npx react-native init` locally (for example, when you only have a phone).

**How to use**
1. Upload all files in this ZIP to a new GitHub repository (root).
2. Commit to `main` branch.
3. Open the repository on GitHub -> Actions -> see the "Build Android APK (init in CI)" run.
4. When finished, download the `app-debug-apk` artifact and install on your Android device.

**Notes**
- This workflow uses `npx react-native@0.72.0 init` in CI to generate native `android/` files.
- Network access is required in CI (GitHub Actions runners have it).
- If any native dependency build fails (e.g., sqlite native linking), I'll help debug the logs.
