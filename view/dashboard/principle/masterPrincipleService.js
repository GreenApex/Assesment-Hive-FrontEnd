deskServices.factory('getAllPrincipal', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'principal/:verb', {verb: 'getallprincipal'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('updatePrincipal', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'principal/:verb', {verb: 'updateprincipal', principalID:'@principalID'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('getPrincipalByPrincipalID', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'principal/:verb', {verb: 'getprinciplabyid', principalID:'@principalID'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('deletePrinciple', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'principal/:verb', {verb: 'deleteprinciple', principleid:'@principleid'}, {
            query: {method: "GET"}
        });
    }]);



deskServices.factory('addPrincipal', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'principal/:verb', {verb: 'addprincipal'}, {
            query: {method: "POST"}
        });
    }]);