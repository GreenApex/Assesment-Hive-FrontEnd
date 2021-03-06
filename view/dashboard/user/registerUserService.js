deskServices.factory('registerUser', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'user/:verb', {verb: 'register'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('getAllRegisterUser', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'user/:verb', {verb: 'getActiveUsers'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('deleteUsers', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'user/:verb', {verb: 'deleteUsers', email:'@email'}, {
            query: {method: "GET"}
        });
    }]);