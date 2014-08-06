angular.module('mainModule', [])


.factory('pageService', function ($log, $q, $http) {
  return {
    getData: function (expectedReply) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (expectedReply) {
        deferred.resolve('Data ipsum');
      } else {
        deferred.reject('No ipsum');
      }

      return promise;
    },

    getDataViaHTTP: function (expectedReply) {
      var pageURL = expectedReply ? 'success-page.html' : 'failure-page.html';

      return $http({
        method: 'GET',
        url: pageURL
      }).then(
        function (response) {
          return 'Got the page!';
        },
        function (error) {
          return $q.reject(error);
        }
      )
    }
  };
})


.controller('pageController', function ($log, $scope, pageService) {
  $scope.testSuccess = function () {
    pageService.getDataViaHTTP(true)
      .then(
        function (response) {
          $log.info('testSuccess: obtained data successfully: ', response);
        }
      );
  };

  $scope.testFailure = function () {
    pageService.getDataViaHTTP(false)
      .then(
        function (response) {
          // nothing needed for the success
        },
        function (error) {
          $log.error('testFailure: failed to get data: ', error);
        }
      );
  };
});