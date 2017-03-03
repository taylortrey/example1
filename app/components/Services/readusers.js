angular.module("myApp.readusers", []).factory("dataService", ['$http', function ($http) {
    var obj = {};

    obj.getConfigJson = function (jsonFile) {
        return $http.get(jsonFile).then(function (results) {
            return results.data;
        }, function (error) {
            return error;
        });
    };


    return obj;
}
]);

