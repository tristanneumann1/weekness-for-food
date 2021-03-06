#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'www.weekness-for-food.com
weekness-for-food.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git remote add origin https://github.com/tristanneumann1/weekness-for-food.git
git push -f --set-upstream origin master:gh-pages

cd -
