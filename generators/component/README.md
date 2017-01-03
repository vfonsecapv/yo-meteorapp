## Component generator

> yo meteorapp:component <name>

The name argument is optional, if you don't provide it, it will ask you for one

The component file name will be in kebab case and the actual component name will be in snake case and the first char will be in uppercase.

This will generate the following files:

Component name: user-avatar

```sh

/imports/ui/components/user-avatar/user-avatar.html
/imports/ui/components/user-avatar/user-avatar.js
/imports/ui/components/user-avatar/user-avatar.(css|scss|less|styl) # This depends on which pre processor you chose

```

