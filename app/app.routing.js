angular.module("myApp")
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('Signin', {
            url: '/signin',
            templateUrl: 'app/shared/Signin/signin.html',
            controller: 'signinController'
        })
    }])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('Blocks', {
            url: '/blocks',
            templateUrl: 'app/shared/Blocks/blocks.html',
            controller: 'blocksController'
        })
    }])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('Table', {
            url: '/table',
            templateUrl: 'app/shared/Table/table.html',
            controller: 'tableController'
        })
    }])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('Upload', {
            url: '/upload',
            templateUrl: 'app/shared/Upload/upload.html',
            controller: 'uploadController'
        })
    }])

    .run(["$location", function ($location) {
        // Go to default state
        $location.url('/signin');
    }]);
