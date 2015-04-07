(function() {
    AngularSandboxChecker.manual_register.controller("Scopes_data_access1", ["$scope", function ($scope) {
        $scope.kk1 = "\<click me\>  controller 1";

        //$scope.$$nextSibling.testCtrl.kk3 = "controller 3 - compromised";
        // Can not access nextSibling, because it does not exist at the creating moment of this controller

    }]);
})();

(function() {
    AngularSandboxChecker.manual_register.controller("Scopes_data_access2", ["$scope", function ($scope) {
        $scope.kk2 = "controller 2";

        $scope.$$prevSibling.testCtrl.kk3 += " - compromised 1";
        $scope.$parent.$$childHead.kk1 += " 2";
        $scope.__proto__.$$childHead.kk1 += " 3";
    }]);
})();

(function() {
    AngularSandboxChecker.manual_register.controller("Scopes_data_access3", [function () {
        this.kk3 = "\<click me\> - controller 3";
    }]);
})();

(function() {
    AngularSandboxChecker.manual_register.directive ("testDirective", [function(){
        return {
            restrict: "E",
            scope: {}, // -- isolated scopes isolates only from inheritance, but we still able to walk through the tree
            template: "\<\div ng-click=\"$$prevSibling.$$prevSibling.testCtrl.kk3 = $$prevSibling.$$prevSibling.testCtrl.kk3 + ' 3';\">{{ctrl.message}}</div>",
            controller: ["$scope", function($scope){
                this.message = "\<click me\> - Directive";
            }],
            controllerAs: "ctrl"
        };
    }]);
})();