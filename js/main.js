angular.module('mainModule', [])


.factory('pageService', function ($log, $q) {
  return {
    getData: function (expectedReply) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (expectedReply) {
        deferred.resolve('Data ipsum');
      } else {
        deferred.reject('No data');
      }

      return promise;
    }
  };
})


.controller('pageController', function ($log, $scope, pageService) {
  $scope.testSuccess = function () {
    pageService.getData(true)
      .then(
        function (response) {
          $log.info('testSuccess: obtained data successfully: ', response);
        }
      );
  };

  $scope.testFailure = function () {
    pageService.getData(false)
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