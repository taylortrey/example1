angular.module("myApp.Templates").controller("uploadController", ["$scope", "$location", "$state", "mainService", function ($scope, $location, $state, mainService) {
	// redirect if user not found
	if(localStorage.getItem('user') == undefined || localStorage.getItem('user') == 'undefined'){
		$location.path('/signin');
		$state.go("Signin");
	}

	if($state.current.name == 'Upload'){
		$scope.dzOptions = {
	        url : 'assets/images',
	        paramName : 'photo',
	        maxFilesize : '10',
	        acceptedFiles : 'image/jpeg, images/jfif, image/png',
	        addRemoveLinks : true,
	        dictRemoveFile : '',
	        dictResponseError : 'Could not upload this type photo',
	        previewsContainer: "#previews",
	        thumbnailWidth : 400,
	        thumbnailHeight : 400
		}
	}

	$scope.imagesData = JSON.parse(localStorage.getItem('images'));

    var lastID = $scope.imagesData[$scope.imagesData.length - 1].id;

    $scope.arrayNewFiles = [];
    $scope.dzCallbacks = {
        'addedfile' : function(file){

        	var checkUniq = function(){
        		if($scope.imagesData){
        			for(var i = 0; i < $scope.imagesData.length; i++){
        				if(file.name == $scope.imagesData[i].imageName){
        					return false;
        				}
        			}
        		}
        		return true;
        	}
        	if(checkUniq()){
        		$scope.arrayNewFiles.push(file);
        	} else {
        		$scope.dzMethods.removeFile(file);
        	}
        },
        'thumbnail': function(file, dataUrl) {
        	$scope.arrayNewFiles.map(function(item, index){
        		if(item.name == file.name){
        			item.dataUrl = dataUrl;
        		}
        		item.id = (index + 1) + lastID;

        	});
        },
        'removedfile': function(file) {
        	$scope.arrayNewFiles = $scope.arrayNewFiles.filter(function(item){
        		return item.name !== file.name;
        	});
        }
    };

    $scope.dzMethods = {};

    var imagesArray = angular.copy($scope.imagesData) || [];

    $scope.saveImages = function() {
        changeServiceValue("Blocks");
    	$location.path('/blocks');
        imagesArray

    	$scope.arrayNewFiles.map(function(item){
    		var temporaryObj = {};
    		// make file size needed kind
    		var fileSize = (item.size / 1024);
    		fileSize = fileSize.toFixed(2);
    		//get user info
    		var currentUser = JSON.parse(localStorage.getItem('user'));

    		// create object for localStorage
    		temporaryObj.id = item.id;
    		temporaryObj.imageName = item.name;
    		temporaryObj.fileSize = fileSize + 'kB';
    		temporaryObj.imageUrl = item.dataUrl;
    		temporaryObj.uploadedUser = currentUser.id;
    		temporaryObj.uploadedUserName = currentUser.name;
    		// push to array for localStorage
    		imagesArray.push(temporaryObj);
    	});

    	// Put user images to storage
    	localStorage.setItem('images', JSON.stringify(imagesArray));
    }

    $scope.removeImages = function() {
    	$scope.dzMethods.removeAllFiles();
    	$scope.arrayNewFiles = [];
    }

    function changeServiceValue(namePage){
        $scope.currentActive = namePage;
        mainService.currentPage = namePage;
    }

}]);
