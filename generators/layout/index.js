'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('layoutName', {
            type: String,
            desc: 'The layout\'s name',
            optional: true,
            required: false
        });
    },
    askFor: function () {
        var done = this.async();
        var prompts = [];

        if (!this.layoutName) {
            prompts.push({
                type: 'input',
                name: 'layoutName',
                message: 'The layout\'s name'
            });

            this.prompt(prompts, function (answers) {
                this.layoutName = answers.layoutName;

                done();
            }.bind(this));
        } else {
            done();
        }
    },
    app: function () {
        var config = this.config.get('meteorConfig');
        var kebabCase = _.kebabCase(this.layoutName);
        var componentName = _.upperFirst(_.snakeCase(_.lowerCase(this.layoutName)));
        var basePath = 'imports/ui/layouts/' + kebabCase + '/' + kebabCase;

        this.template(
            this.templatePath('layout.html'),
            this.destinationPath(basePath + '.html'),
            { layoutName: componentName }
        );

        this.template(
            this.templatePath('layout.js'),
            this.destinationPath(basePath + '.js'),
            {
                layoutName: componentName,
                htmlFileName: kebabCase + '.html',
                cssFileName: kebabCase + '.' + config.cssExtension
            }
        );

        this.template(
            this.templatePath('layout.' + config.cssExtension),
            this.destinationPath(basePath + '.' + config.cssExtension)
        );
    }
});
