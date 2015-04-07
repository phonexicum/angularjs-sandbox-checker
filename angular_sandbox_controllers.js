function htmlEncode(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

(function() {
    var AngularSandboxChecker = angular.module ("AngularSandboxChecker", ['ngSanitize']);

    AngularSandboxChecker.service ("angularBypasses", ["$http", function($http){
        var scope = this;
        this.bypasses_files = [];

        this.get_file_list = function(){
            return $http.get("angular_bypasses.json").success(function (data) {
                scope.bypasses_files = data;
            });
        };

    }]);

    AngularSandboxChecker.controller ("angularSandboxController", ["$scope", "$http", "angularBypasses", function ($scope, $http, angularBypasses){
        //var scope = this;
        $scope.bypasses_files = [];
        $scope.version = angular.version.full;
        $scope.sanitize_version = sanitize_version;

        angularBypasses.get_file_list().then(function (){
            $scope.bypasses_files = angularBypasses.bypasses_files;
        });

    }]);

    AngularSandboxChecker.controller ("angularSandboxBypass", ["$scope", "$compile", "$http", function($scope, $compile, $http){
        //var scope = this;
        $scope.files_name = {};
        $scope.controller_text = "";
        $scope.html_text = "";
        $scope.index = -1;
        $scope.show = false;
        $scope.eval_function = function (){};

        $scope.init = function(index, files_name){
            $scope.index = index;
            $scope.files_name = files_name;

            var register_constructor_promise = $http.get(files_name.controller_file_name).success(function(data){
                $scope.controller_text = data;
                eval($scope.controller_text);
            });

            $http.get(files_name.html_file_name).success(function(data){
                $scope.html_text = data;

                register_constructor_promise.success(function(){
                    $scope.eval_function = function ()
                    {
                        // Compile the HTML into a linking function...
                        var linkFn = $compile($scope.html_text);
                        // Linking it to the scope we're interested in.
                        var elem = linkFn($scope);
                        $('#controller-html-mark-' + $scope.index.toString()).append(elem);

                        // Now that the content has been compiled, linked, and added to the DOM, we must trigger a digest cycle
                        // on the scope we used in order to update bindings. But... no we do not, because we are already in digest,
                        // and it will restart, because of course smth changed
                        //$scope.$digest();
                    }
                });
            });

        };

    }]);

    AngularSandboxChecker.controller("angularTestCustomBypass", ["$scope", "$compile", function($scope, $compile){
        //var scope = this;
        $scope.controller_text = "(function() {\n    AngularSandboxChecker.manual_register.controller('UniqueCtrl', [function () {\n        \n    }]);\n})();";
        $scope.html_text = decodeURIComponent("%3Cdiv%20ng-controller%3D%27UniqueCtrl%20as%20myCtrl%27%3E%0A%3C/div%3E");

        $scope.eval_function = function () {
            eval($scope.controller_text);

            // Compile the HTML into a linking function...
            var linkFn = $compile($scope.html_text);
            // Linking it to the scope we're interested in.
            var elem = linkFn($scope);
            $('#controller-html-injection-mark').append(elem);

            // Now that the content has been compiled, linked, and added to the DOM, we must trigger a digest cycle
            // on the scope we used in order to update bindings. But... no we do not, because we are already in digest,
            // and it will restart, because of course smth changed
            //$scope.$digest();
        };

    }]);

    AngularSandboxChecker.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function($controllerProvider, $compileProvider, $filterProvider, $provide){

        AngularSandboxChecker.manual_register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    }]);

})();
