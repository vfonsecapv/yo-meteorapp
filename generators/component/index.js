'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('componentName', {
            type: String,
            desc: 'The component\'s name',
            optional: true,
            required: false
        });
    },
    askFor: function () {
        var done = this.async();
        var prompts = [];

        if (!this.componentName) {
            prompts.push({
                type: 'input',
                name: 'componentName',
                message: 'The component\'s name'
            });

            this.prompt(prompts, function (answers) {
                this.componentName = answers.componentName;

                done();
            }.bind(this));
        } else {
            done();
        }
    },
    app: function () {
        var config = this.config.get('meteorConfig');
        var kebabCase = _.kebabCase(this.componentName);
        var componentName = _.upperFirst(_.snakeCase(_.lowerCase(this.componentName)));
        var basePath = 'imports/ui/components/' + kebabCase + '/' + kebabCase;

        this.template(
            this.templatePath('component.html'),
            this.destinationPath(basePath + '.html'),
            { componentName: componentName }
        );

        this.template(
            this.templatePath('component.js'),
            this.destinationPath(basePath + '.js'),
            {
                componentName: componentName,
                componentFileName: kebabCase,
                cssFileName: kebabCase + '.' + config.cssExtension
            }
        );

        this.template(
            this.templatePath('component.' + config.cssExtension),
            this.destinationPath(basePath + '.' + config.cssExtension)
        );
    }
});
