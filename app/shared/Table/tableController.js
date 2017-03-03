angular.module("myApp.Templates").controller("tableController", ["$scope", "$location", "$state", "mainService", function ($scope, $location, $state, mainService) {
	// redirect if user not found
	if(localStorage.getItem('user') == undefined || localStorage.getItem('user') == 'undefined'){
		$location.path('/signin');
		$state.go("Signin");
	}

    $scope.imagesData = JSON.parse(localStorage.getItem('images'));

	$scope.tableHeaderFileds = ['Id', 'Image Name', 'Uploaded User', 'Image URL', 'Events'];
	$scope.tableFileds = ['id', 'imageName', 'uploadedUserName', 'fileSize'];

	$scope.currentImage = {};
	$scope.showBlockPreview = false;

    $scope.removeImage = function(image) {
        var resultData = mainService.removeImage(image);
        $scope.imagesData = resultData;
    }

    $scope.viewImage = function(image) {
    	$scope.currentImage.url = image.imageUrl;
    	$scope.showBlockPreview = true;
    }

    $scope.hideBlockPreview = function() {
    	$scope.showBlockPreview = false;
    	$scope.currentImage = {};
    }

}]);
