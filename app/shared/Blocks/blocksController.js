angular.module("myApp.Templates").controller("blocksController", ["$scope", "$location", "$state", "mainService", function ($scope, $location, $state, mainService) {
	// redirect if user not found
	if(localStorage.getItem('user') == undefined || localStorage.getItem('user') == 'undefined'){
		$location.path('/signin');
		$state.go("Signin");
	}

    $scope.imagesData = JSON.parse(localStorage.getItem('images'));

    $scope.currentActive = mainService.currentPage;

    $scope.removeImage = function(image) {
        var resultData = mainService.removeImage(image);
        $scope.imagesData = resultData;
    }

}]);
