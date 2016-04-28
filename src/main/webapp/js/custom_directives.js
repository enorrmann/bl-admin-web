myApp.directive('testScript', ['$location', '$http', function ($location, $http) {
        return {
            restrict: 'E',
            scope: {entry: '&'},
            template: '<button type="button" class="btn btn-default" ng-click="test()">Test script</button>',
            link: function (scope) {
                scope.test = function () {
                    var sendData = {
                        script: scope.entry().values.script
                    };
                    $http.post('api/script/test', sendData)
                            .then(function successCallback(response) {
                                scope.entry().values.status = response.data.mensaje;
                            }, function errorCallback(response) {
                            });
                };
            }
        };
    }]);

myApp.directive('startServer', ['$location', '$http', '$state', function ($location, $http, $state) {
        return {
            restrict: 'E',
            scope: {entry: '&'},
            template: '<button type="button" class="btn btn-default" ng-click="start()">Start</button>',
            link: function (scope) {
                scope.start = function () {
                    var serverId = scope.entry().values.id;
                    $http.get('api/server/' + serverId + '/start')
                            .then(function successCallback(response) {
                                $state.reload();
                            }, function errorCallback(response) {
                            });
                };
            }
        };
    }]);
myApp.directive('stopServer', ['$location', '$http', '$state', function ($location, $http, $state) {
        return {
            restrict: 'E',
            scope: {entry: '&'},
            template: '<button type="button" class="btn btn-default" ng-click="stop()">Stop</button>',
            link: function (scope) {
                scope.stop = function () {
                    var serverId = scope.entry().values.id;
                    $http.get('api/server/' + serverId + '/stop')
                            .then(function successCallback(response) {
                                $state.reload();
                            }, function errorCallback(response) {
                            });
                };
            }
        };
    }]);
// con esto modifico la url de la entidad application
myApp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                request: function (config) {
                    if (/\/script$/.test(config.url) && config.params && config.params._filters && config.params._filters.script_id) {
                        config.url = config.url.replace('script', 'application/' + config.params._filters.script_id + '/scripts');
                        delete config.params._filters.script_id;
                    }
                    return config;
                },
            };
        });
    }]);
