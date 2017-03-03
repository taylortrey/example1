angular.module("myApp.mainservice", []).factory("mainService", [ "$state", "$location", function ($state, $location) {
	var namePage;
	if(localStorage.getItem('user') == undefined || localStorage.getItem('user') == 'undefined'){
		namePage = "Signin";
		$state.go("Signin");
		$location.path('/signin');
	} else {
		namePage = "Blocks";
		$state.go("Blocks");
		$location.path('/blocks');
	}

	return {
	    currentPage : namePage,
	    removeImage : function(image) {
	        arrayLocalImages = JSON.parse(localStorage.getItem('images'));
	        arrayLocalImages = arrayLocalImages.filter(function(item){
	            return item.imageName !== image.imageName;
	        });
	        localStorage.setItem('images', JSON.stringify(arrayLocalImages));

	        return JSON.parse(localStorage.getItem('images'));
	    }
	};
}
]);

