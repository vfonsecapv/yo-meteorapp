## App generator

> yo meteorapp

This will generate a basic file structure for Meteor 1.4.x

File structure:

```sh
client/
    main.js # Main entry point for the client
imports/
    api/
    startup/
        client/
            index.js
            routes/ # Put all of your routes here, one route per file
                index.js # Will be imported automatically, import all of your routes here
        server/
            index.js
            register-api.js # Import all of your collections here
    ui/
        components/
        pages/
        layouts/
        stylesheets/
packages/
tests/
public/
    favicon.png # Meteor standard favicon
    font/
    images/
private/
server/
    main.js # Main entry point for the server
package.json
.eslintrc # Will only be generated when you use ESLint
```
