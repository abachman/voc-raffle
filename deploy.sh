echo 'subtree'
git subtree push --prefix dist origin gh-pages
echo 'push'
git push origin gh-pages --force
