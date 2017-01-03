'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('collectionName', {
            type: String,
            desc: 'The collection\'s name',
            optional: true,
            required: false
        });
    },
    askFor: function () {
        var done = this.async();
        var prompts = [];

        if (!this.collectionName) {
            prompts.push({
                type: 'input',
                name: 'collectionName',
                message: 'The collection\'s name'
            });

            this.prompt(prompts, function (answers) {
                this.collectionName = answers.collectionName;

                done();
            }.bind(this));
        } else {
            done();
        }
    },
    app: function () {
        var kebabCase = _.kebabCase(this.collectionName);
        var collectionName = _.upperFirst(_.snakeCase(_.lowerCase(this.collectionName)));
        var basePath = 'imports/api/' + kebabCase + '/';
        
        this.template(
            this.templatePath('collection.js'),
            this.destinationPath(basePath + kebabCase + '.js'),
            {
                collectionName: collectionName,
                fileName: kebabCase
            }
        );

        this.template(
            this.templatePath('methods.js'),
            this.destinationPath(basePath + 'methods.js'),
            {
                collectionName: collectionName,
                fileName: kebabCase
            }
        );

        this.template(
            this.templatePath('server/startup.js'),
            this.destinationPath(basePath + 'server/startup.js'),
            {
                collectionName: collectionName,
                fileName: kebabCase
            }
        );

        this.template(
            this.templatePath('server/publications.js'),
            this.destinationPath(basePath + 'server/publications.js'),
            {
                collectionName: collectionName,
                fileName: kebabCase
            }
        );
    }
});
