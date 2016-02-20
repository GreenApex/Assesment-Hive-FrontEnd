deskServices.factory('getAllQuestionnarie', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'questionnaire/:verb', {verb: 'getallquestionnarie'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('updateQuestionnaire', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'questionnaire/:verb', {verb: 'addquestionnaire', questionnaireID:'@questionnaireID'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('getQuestionnarieID', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'questionnaire/:verb', {verb: 'getquestionnarieid', questionnaireID:'@questionnaireID'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('deleteQuestionnaire', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'questionnaire/:verb', {verb: 'deletequestionnaire', qid:'@qid'}, {
            query: {method: "GET"}
        });
    }]);



deskServices.factory('addQuestionnaire', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'questionnaire/:verb', {verb: 'addquestionnaire'}, {
            query: {method: "POST"}
        });
    }]);