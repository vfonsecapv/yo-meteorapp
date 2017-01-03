import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

<% if (layoutName) { %>import '/imports/ui/layouts/<%= layoutName %>/<%= layoutName %>.js';<% } %>
<% if (pageName) { %>import '/imports/ui/pages/<%= pageName %>/<%= pageName %>.js';<% } %>

FlowRouter.route('<%= path %>', {
    name: '<%= name %>',
    action() {
        BlazeLayout.render('<%= layoutTemplateName %>', {
            content: '<%= pageTemplateName %>'
        });
    }
});
