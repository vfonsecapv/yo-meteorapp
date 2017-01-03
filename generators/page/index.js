'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('pageName', {
            type: String,
            desc: 'The page\'s name',
            optional: true,
            required: false
        });
    },
    askFor: function () {
        var done = this.async();
        var prompts = [];

        if (!this.pageName) {
            prompts.push({
                type: 'input',
                name: 'pageName',
                message: 'The page\'s name'
            });

            this.prompt(prompts, function (answers) {
                this.pageName = answers.pageName;

                done();
            }.bind(this));
        } else {
            done();
        }
    },
    app: function () {
        var config = this.config.get('meteorConfig');
        var kebabCase = _.kebabCase(this.pageName);
        var componentName = _.upperFirst(_.snakeCase(_.lowerCase(this.pageName)));
        var basePath = 'imports/ui/pages/' + kebabCase + '/' + kebabCase;

        this.template(
            this.templatePath('page.html'),
            this.destinationPath(basePath + '.html'),
            { pageName: componentName }
        );

        this.template(
            this.templatePath('page.js'),
            this.destinationPath(basePath + '.js'),
            {
                pageName: componentName,
                htmlFileName: kebabCase + '.html',
                cssFileName: kebabCase + '.' + config.cssExtension
            }
        );

        this.template(
            this.templatePath('page.' + config.cssExtension),
            this.destinationPath(basePath + '.' + config.cssExtension)
        );
    }
});
