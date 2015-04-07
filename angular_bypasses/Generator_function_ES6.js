(function() {
    AngularSandboxChecker.manual_register.controller("Generator_function_ES6", ["$scope", function ($scope) {
        $scope.safe_function = function() {};
        $scope.unsafe_function1 = function*() {};
        /*$scope.unsafe_function2 = function () { yield 23; };*/
    }]);
})();