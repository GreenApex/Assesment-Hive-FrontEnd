deskServices.factory('getMyTask', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'task/:verb', {verb: 'getMyTask',userID:'@userID'
            }, {
            query: {method: "GET"}
        });
    }]);
