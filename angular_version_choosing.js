var angularjs_versions = [
    //"1.0.0-rc2", "1.0.0 - 1.0.8", "1.1.0 - 1.1.5",
    "1.0.1 - 1.0.8", "1.1.1", "1.1.3 - 1.1.5",
    "\n1.2.0-rc.2", "1.2.0-rc.3", "1.2.0 - 1.2.28",
    "\n1.3.0-beta.1 - 1.3.0-beta.19", "1.3.0-rc.0 - 1.3.0-rc.5", "1.3.0 - 1.3.14",
    "\n1.4.0-beta.0 - 1.4.0-beta.6", "1.4.0-rc.0 - 1.4.0-rc.2"];

var angularjs_sanitize_versions = [
    "1.1.1 - 1.1.5",
    "\n1.2.0-rc.2", "1.2.0-rc.3", "1.2.0 - 1.2.28",
    "\n1.3.0-beta.1 - 1.3.0-beta.19", "1.3.0-rc.0 - 1.3.0-rc.5", "1.3.0 - 1.3.14",
    "\n1.4.0-beta.0 - 1.4.0-beta.6", "1.4.0-rc.0 - 1.4.0-rc.2"];

var default_value = "1.3.14";

var angular_version = prompt("Choose one of angularjs versions:\n" + angularjs_versions.join(", "), default_value);
if (angular_version == null)
    angular_version = default_value;
var sanitize_version = prompt("Choose one of angularjs versions:\n" + angularjs_sanitize_versions.join(", "), angular_version);
if (sanitize_version == null)
    sanitize_version = angular_version;

document.write(decodeURIComponent('%3Cscript%20type%3D%22text/javascript%22%20src%3D%22https%3A//ajax.googleapis.com/ajax/libs/angularjs/' + angular_version + '/angular.js%22%3E%3C/script%3E'));
document.write(decodeURIComponent('%3Cscript%20type%3D%22text/javascript%22%20src%3D%22https%3A//ajax.googleapis.com/ajax/libs/angularjs/' + sanitize_version + '/angular-sanitize.js%22%3E%3C/script%3E'));