## Page generator

> yo meteorapp:page <name>

The name argument is optional, if you don't provide it, it will ask you for one

The component file name will be in kebab case and the actual component name will be in snake case and the first char will be in uppercase.

This will generate the following files:

Component name: home_page

```sh

/imports/ui/components/home-page/home-page.html
/imports/ui/components/home-page/home-page.js
/imports/ui/components/home-page/home-page.(css|scss|less|styl) # This depends on which pre processor you chose

```

