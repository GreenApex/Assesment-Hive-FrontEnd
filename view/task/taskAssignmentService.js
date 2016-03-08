deskServices.factory('getMyTask', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'task/:verb', {verb: 'getMyTasks', userID:'@userID'
            }, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('assignTask', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'task/:verb', {verb: 'assigntask', templateID:'@templateID'}, {
            query: {method: "POST"}
        });
    }]);