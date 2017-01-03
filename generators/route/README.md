## Route generator

> yo meteorapp:route

This will generate a file named /imports/startup/client/routes/<route-name>.js

You still need to import the file in /imports/startup/client/routes/index.js

Example file:

Answers:
name: blog
path: /blog
layout: blog_layout // This could be blog-layout too!
page: blog_home // This could be blog-home too!

/imports/startup/client/routes/blog.js

```js
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/blog-layout/blog-layout.js';
import '/imports/ui/pages/blog-home/blog-home.js';

FlowRouter.route('/blog', {
    name: 'blog',
    action() {
        BlazeLayout.render('blog_layout', {
            content: 'blog_home'
        });
    }
});
```
