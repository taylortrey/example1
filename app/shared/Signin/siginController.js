angular.module("myApp.Templates").controller("signinController", ["$scope", "dataService", "$state", "mainService", function ($scope, dataService, $state, mainService) {
	var getDataJson;
	var usersData = [];
	$scope.user = {};
	$scope.showError = false;

	if(localStorage.getItem('user') == undefined || localStorage.getItem('user') == 'undefined'){
		getDataJson = dataService.getConfigJson("users-data.json").then(function(data){
			usersData = data.Users;

			init();

		});
	} else {
		changeServiceValue("Blocks");
	}


	function init(){
		changeServiceValue("Signin");

		$scope.checkUser = function(userInfo) {
			usersData.map(function(singleUser){
				if(userInfo.email == singleUser.email && userInfo.password == singleUser.password){
					// Put user info to storage
					localStorage.setItem('user', JSON.stringify(singleUser));

					// Retrieve the object from storage
					var retrievedObject = localStorage.getItem('user');

					changeServiceValue("Blocks");
					$state.go("Blocks");
				}
			});

		}
	}


	function changeServiceValue(namePage){
		$scope.currentActive = namePage;
		mainService.currentPage = namePage;
	}

}]);
