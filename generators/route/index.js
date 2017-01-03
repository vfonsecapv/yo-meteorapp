'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);
    },
    askFor: function () {
        var done = this.async();

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'The route\'s name'
        }, {
            name: 'path',
            message: 'The routes path',
            type: 'input'
        }, {
            name: 'layout',
            message: 'What layout would you like to use?',
            type: 'input'
        }, {
            name: 'page',
            message: 'What page would you like to use?',
            type: 'input'
        }];

        this.prompt(prompts, function (answers) {
            this.name = answers.name;
            this.path = answers.path;
            this.layout = answers.layout;
            this.page = answers.page;

            done();
        }.bind(this));
    },
    app: function () {
        this.template(
            this.templatePath('route.js'),
            this.destinationPath('imports/startup/client/routes/' + this.name + '.js'),
            {
                name: this.name,
                path: this.path,
                layoutName: _.kebabCase(this.layout),
                layoutTemplateName: _.upperFirst(_.snakeCase(_.lowerCase(this.layout))),
                pageName: _.kebabCase(this.page),
                pageTemplateName: _.upperFirst(_.snakeCase(_.lowerCase(this.page)))
            }
        );
    }
});
