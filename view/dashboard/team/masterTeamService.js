deskServices.factory('getAllTeam', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'team/:verb', {verb: 'getallteam'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('updateTeam', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'team/:verb', {verb: 'updateteam', teamID:'@teamID'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('getTeamByID', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'team/:verb', {verb: 'getteambyid', teamID:'@teamID'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('getTeamMembers', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'team/:verb', {verb: 'getTeamMembers', teamID:'@teamID'}, {
            query: {method: "GET"}
        });
    }]);


deskServices.factory('deleteTeam', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'team/:verb', {verb: 'deleteteam', qid:'@qid'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('addTeam', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'team/:verb', {verb: 'addteam'}, {
            query: {method: "POST"}
        });
    }]);