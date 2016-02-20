deskServices.factory('getAllCategories', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'category/:verb', {verb: 'getallcategories'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('deleteCategory', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'category/:verb', {verb: 'deletecategory', categoryID:'@categoryID'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('getCategoryByCategoryID', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'category/:verb', {verb: 'getcategorybyid', categoryID:'@categoryID'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('deleteCategory', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'category/:verb', {verb: 'deletecategory', categoryID:'@categoryID'}, {
            query: {method: "GET"}
        });
    }]);

deskServices.factory('updateCategory', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'category/:verb', {verb: 'updatecategory', categoryID:'@categoryID'}, {
            query: {method: "POST"}
        });
    }]);

deskServices.factory('addCategory', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'category/:verb', {verb: 'addcategory'}, {
            query: {method: "POST"}
        });
    }]);