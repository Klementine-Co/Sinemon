

## **Step 2: Install Volta (If Not Installed)**

If Volta isn’t installed, install it using:

```
sh

curl https://get.volta.sh | bash
```

Then restart your terminal or run:
```
sh

source ~/.zshrc  # or source ~/.bashrc
```

Verify installation:

```
sh

volta --version
```
## **Step 3: Install the Correct Node & npm Versions**

Must be in the project folder for Volta to detect and install the pinned versions.

```
sh
cd your-project

volta install
```

This will automatically install and use the Node.js and npm versions specified in the project.

To verify the installed versions:
```
sh

node -v
npm -v
```

They should match the versions pinned in the project (e.g., Node.js 20.17.0 and npm 11.1.0).

## **Step 4: Install Project Dependencies**

After ensuring the correct Node.js version, install dependencies:

```
sh

npm install
```
```
sh

cd ios
pod install --repo-update --verbose
cd ..
```
## **Step 5: Run Metro**
```
sh

npx react-native start
```

Run ios simulator through command line (npx react-native run-ios) or Xcode.

