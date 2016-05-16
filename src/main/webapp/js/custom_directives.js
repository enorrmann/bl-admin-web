myApp.directive('condicion', function () {
    return {
        restrict: 'E',
        template: 'la condicion'
    };
});
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
                    if (/\/condicion/.test(config.url) && config.params && config.params._filters && config.params._filters.script_id) {
                        config.url = config.url.replace('condicion', 'condicion/' + config.params._filters.script_id + '/scripts');
                        delete config.params._filters.script_id;
                    }
                    return config;
                },
            };
        });
    }]);

myApp.directive("tinyEditor", function () {
    return {
        restrict: "E",
        template: "<textarea ng-model='value' ui-tinymce='tinyMceOptions'> </textarea>",
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {
                    scope.tinyMceOptions =
                            {
                                mode: "exact",
                                elements: "rte",
                                plugins: 'mention,code,fullscreen',
                                menubar:true,
                                statusbar:false,
                                height:400,
                                content_css: "node_modules/ng-admin/build/ng-admin.min.css",
                                mentions: {
                                    queryBy: 'nombre',
                                    delimiter : '@',
                                    insert: function (item) {
                                        //var relacion = 'class="'+item.relacion+'"';
                                        return '<a href="#/documento/show/' + item.id_documento + '">' + item.nombre + '</a>';
                                    },
                                    source: function (query, process, delimiter) {
                                        //if (delimiter === '@') {
                                            var apiRoot = 'http://10.4.12.1:8080/bl-admin/api/';
                                            $.getJSON(apiRoot+'documento', function (data) {
                                                process(data);
                                            });
                                        //}
                                    }
                                },
                                init_instance_callback: function (ed) {
                                    //    QUnit.start();
                                }
                            };

                    //console.log('preLink');
                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                    //console.log('postLink');
                }
            };
        }
    };
});
