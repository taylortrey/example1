angular.module("myApp.Templates").directive("navDir", [ "$state", "mainService", function ($state, mainService) {
	return {
		restrict: 'E',
		scope: "=",
		templateUrl: "app/components/Directives/nav.html",
		link: function($scope, element, attrs) {
            $scope.currentActive = mainService.currentPage;

            $scope.goToState = function(state){
            	if (state == "Signin"){
                    localStorage.setItem('user', undefined);
                    changeServiceValue("Signin");
            		$state.go("Signin");
            	} else {
                   changeServiceValue(state);
            	   $state.go(state);
                }
            }

            // route change
            $scope.$on('$locationChangeStart', function(event) {
                $scope.imagesData = JSON.parse(localStorage.getItem('images'));

                $scope.currentActive = mainService.currentPage;

                if(localStorage.getItem('user') === undefined ){
                    $location.path('/signin');
                }
            });

            function changeServiceValue(namePage){
                $scope.currentActive = namePage;
                mainService.currentPage = namePage;
            }
        }
	};
}]);