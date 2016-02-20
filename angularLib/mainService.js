'use strict';

deskServices.factory('getCategories', ['$resource',
    function ($resource) {
        return $resource("json/" + ':verb', {verb: 'category.json'}, {
            query: {method: "GET"}
        });

    }]);

deskServices.factory('getPrinciple', ['$resource',
    function ($resource) {
        return $resource("json/" + ':verb', {verb: 'principle.json'}, {
            query: {method: "GET"}
        });

    }]);

deskServices.factory('getQuestion', ['$resource',
    function ($resource) {
        return $resource("json/" + ':verb', {verb: 'question.json'}, {
            query: {method: "GET"}
        });

    }]);

deskServices.factory('login', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'user/:verb', {verb: 'auth', email: '@email', password: '@password'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('getAllUser', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'user/:verb', {verb: 'getAllUsers'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('register', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'user/:verb', {verb: 'register'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('assignUsers', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'team/:verb', {verb: 'assignusers', teamID:'@teamID'}, {
            query: {method: "POST"}
        });
    }]);

//----------------------------------------------------------------- Template

deskServices.factory('createTemplate', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'desk/:verb', {verb: 'createTemplate'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('updateTemplate', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'desk/:verb', {verb: 'createTemplate', templateID:'@templateID'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('getAllTemplates', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'desk/:verb', {verb: 'getAllTemplates'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('getTemplateByTemplateID', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'desk/:verb', {verb: 'gettemplate', templateID:'@templateID'}, {
            query: {method: "POST"}
        });
    }]);




