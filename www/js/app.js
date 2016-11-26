// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mymovies', ['ionic'])

.controller('MovieCtrl', function($scope, $http) {
  $scope.movies = [];
  var lastIdx = 0;
  $scope.moreDataCanBeLoaded = true;

  $scope.loadMore = function() {
    if ($scope.movies.length > 0) {
      lastIdx = $scope.movies[$scope.movies.length-1].idx;
    }

    // 최초에 loadMore() 실행됨. so 통신이 중복되지 않도록 함수 안으로 이동
    // CORS
    // ionic.config.json -> proxies
    // $http.get('http://52.78.168.126:8080/api/movie/list/0')

    $http.get('/api/movie/list/' + lastIdx)
      .success(function(response) {
        if (response.movieList === 0) {
          $scope.moreDataCanBeLoaded = false;
        }
        angular.forEach(response.movieList, function(data) {
          $scope.movies.push(data);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      });
  };

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
