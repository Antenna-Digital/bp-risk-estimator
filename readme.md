# Workflow

## First time setup
Clone the repository

```bash
git clone https://github.com/Antenna-Digital/bp-risk-estimator.git
```

### if you have already cloned the repository

```bash
git pull
```

### Webpack Changes

Switch production to development

```js
mode: 'production'
```

to

```js
mode: 'development'
```

### Run directory on a local server

Utilize a chrome extension to swap current js with local js
 - Requestly (requestly.com/)

```
https://cdn.jsdelivr.net/gh/Antenna-Digital/bp-risk-estimator@main/scripts.js
```

## Making changes
Edit the script.js file in the root directory

## Testing changes
run `npx webpack` to build the project

After building the project the dist/bundle.js file will be updated with the new changes and is ready to be tested on webflow.

## Pushing changes
Swap development to production

```js
mode: 'development'
```

to

```js
mode: 'production'
```

Run `npx webpack` to build production bundle.js

Push the changes to the main branch

```bash
git add .
git commit -m "your commit message"
git push origin main
```

Purge the jsDeliver cache

```
https://purge.jsdelivr.net/gh/Antenna-Digital/bp-risk-estimator@main/scripts.js
```

After 5-10 minutes the purge should be complete.
