angular.module('monthlyDirectives', [])

.directive('view', function() {
    return {
        restrict: 'E',
        templateUrl: '../pages/main.html'
    };
})

.directive('accounts', function() {
    return {
        restrict: 'E',
        templateUrl: '../pages/footer.html'
    };
});