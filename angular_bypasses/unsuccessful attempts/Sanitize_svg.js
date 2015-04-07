(function() {
    AngularSandboxChecker.manual_register.controller('Sanitize_svg_Ctrl', ["$scope", "$sce", function ($scope, $sce) {
        $scope.snippet = '\<p style="color:blue">an html' +
            '\<em onmouseover="this.textContent=\' ATTACKED \'"> click here </em>' +
            'snippet\</p>';

        $scope.snippet =
            '\<svg width="20" height="20">' +
                '\<a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="?">' +
                    '\<circle r="20"></circle>' +
                    '\<animate attributeName="xlink:href" begin="0" from="javascript:alert(1)" to="&" />' +
                '\</a>' +
            '\</svg>';

        $scope.trustSnippet = function() {
            return $sce.trustAsHtml($scope.snippet);
        };
    }]);
})();
