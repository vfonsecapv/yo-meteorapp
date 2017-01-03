'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('name', {
            type: String,
            desc: 'Your project name',
            optional: true,
            required: false
        });
    },
    askFor: function () {
        var done = this.async();
        var prompts = [{
            name: 'includeESLint',
            message: 'Would you like to include eslint?',
            type: 'confirm'
        }, {
            name: 'includeReact',
            message: 'Would you like to include react?',
            type: 'confirm'
        }, {
            name: 'cssPreProcessor',
            message: 'What css pre-processor would you like to use?',
            type: 'list',
            choices: ['css', 'postcss', 'scss', 'stylus', 'less'],
            default: 'css'
        }];

        if (!this.name) {
            prompts.unshift({
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: _.kebabCase(this.appname)
            });
        }

        // Have Yeoman greet the user.
        this.log(yosay('Welcome'));

        this.prompt(prompts, function (answers) {
            this.includeESLint = answers.includeESLint;
            this.includeReact = answers.includeReact;
            this.name = !this.name ? answers.name : this.name;
            this.cssPreProcessor = answers.cssPreProcessor;

            if (this.cssPreProcessor === 'stylus') {
                this.cssExtension = 'styl';
            } else if (this.cssPreProcessor === 'postcss') {
                this.cssExtension = 'css';
            } else {
                this.cssExtension = this.cssPreProcessor;
            }

            this.config.set('meteorConfig', {
                includeReact: this.includeReact,
                cssPreProcessor: this.cssPreProcessor,
                cssExtension: this.cssExtension
            });

            done();
        }.bind(this));
    },
    app: function () {
        var eslintConfig = this.fs.readJSON(this.templatePath('.eslintrc'));

        // Copy meteor dir
        this.fs.copy([
            this.templatePath('.meteor/')
        ], this.destinationPath('.meteor/'));

        // Compile package.json
        this.template(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { title: _.kebabCase(this.name) }
        );

        // Compile head.html
        this.template(
            this.templatePath('client/head.html'),
            this.destinationPath('client/head.html'),
            { title: _.startCase(_.camelCase(this.name)) }
        );

        // Copy all standard files
        this.fs.copy([
            this.templatePath('client/main.js'),
            this.templatePath('client/main.' + this.cssExtension),
            this.templatePath('server/main.js'),
            this.templatePath('imports/startup/client/index.js'),
            this.templatePath('imports/startup/client/routes/index.js'),
            this.templatePath('imports/startup/server/index.js'),
            this.templatePath('imports/startup/server/register-api.js'),
            this.templatePath('public/favicon.png'),
            this.templatePath('imports/ui/stylesheets/main.' + this.cssExtension),
            this.templatePath('imports/ui/stylesheets/variables.' + this.cssExtension),
            this.templatePath('imports/ui/stylesheets/imports.' + this.cssExtension)
        ], this.destinationPath());

        // Generate folders
        mkdirp.sync(path.join(this.destinationPath(), 'imports/api'));
        mkdirp.sync(path.join(this.destinationPath(), 'imports/ui/components'));
        mkdirp.sync(path.join(this.destinationPath(), 'imports/ui/pages'));
        mkdirp.sync(path.join(this.destinationPath(), 'imports/ui/layouts'));
        mkdirp.sync(path.join(this.destinationPath(), 'public'));
        mkdirp.sync(path.join(this.destinationPath(), 'public/font'));
        mkdirp.sync(path.join(this.destinationPath(), 'public/images'));
        mkdirp.sync(path.join(this.destinationPath(), 'private'));
        mkdirp.sync(path.join(this.destinationPath(), 'tests'));

        // Generating .eslintrc
        if (this.includeESLint) {
            if (this.includeReact) {
                _.extend(eslintConfig.parserOptions.ecmaFeatures, {
                    jsx: true
                });

                eslintConfig.plugins.push('airbnb');

                eslintConfig.extends.push('airbnb');
            } else {
                eslintConfig.extends.push('airbnb/base');
            }

            this.fs.copy(
                this.templatePath('.eslintignore'),
                this.destinationPath('.eslintignore')
            );

            this.fs.writeJSON(
                this.destinationPath('.eslintrc'),
                eslintConfig
            );
        }
    },
    install: function () {
        var deps = [];
        var meteorAdd = ['add'];
        var meteorRemove = ['remove'];

        if (this.includeReact) {
            meteorAdd.push('react-meteor-data');
            meteorAdd.push('static-html');
            meteorRemove.push('blaze-html-templates');
        } else {
            meteorAdd.push('kadira:blaze-layout');
        }

        if (this.cssPreProcessor === 'less' || this.cssPreProcessor === 'stylus') {
            meteorAdd.push(this.cssPreProcessor);
        } else if (this.cssPreProcessor === 'sass') {
            meteorAdd.push('fourseven:scss');
        } else if (this.cssPreProcessor === 'postcss') {
            meteorAdd.push('juliancwirko:postcss');
            meteorRemove.push('standard-minifier-css');
        }

        this.spawnCommand('meteor', meteorAdd);

        if (meteorRemove.length > 1) {
            this.spawnCommand('meteor', meteorRemove);
        }

        if (this.includeESLint) {
            deps = [
                'eslint',
                'eslint-config-airbnb',
                'eslint-plugin-meteor'
            ];

            if (this.includeReact) {
                deps.push('eslint-plugin-react');
            }

            this.npmInstall(deps, { saveDev: true });
        }

        if (this.includeReact) {
            this.npmInstall([
                'react',
                'react-mounter'
            ], { save: true });
        }

        this.spawnCommand('meteor', ['run']);

        this.installDependencies();
    }
});
