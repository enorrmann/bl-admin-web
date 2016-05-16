myApp.config(function ($stateProvider) {
    $stateProvider.state('send-post', {
        parent: 'main',
        url: '/sendPost/:id',
        params: {id: null},
        controller: sendPostController,
        controllerAs: 'controller',
        template: sendPostControllerTemplate
    });
});
function sendPostController($stateParams, notification) {
    this.postId = $stateParams.id;
    console.log("called sendPostController");
    // notification is the service used to display notifications on the top of the screen
    this.notification = notification;
}
;
sendPostController.inject = ['$stateParams', 'notification'];
sendPostController.prototype.sendEmail = function () {
    this.notification.log('Email successfully sent to ' + this.email);
};

var sendPostControllerTemplate =
        '<div class="row"><div class="col-lg-12">' +
        '<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>' +
        '<div class="page-header">' +
        '<h1>Send post #{{ controller.postId }} by email</h1>' +
        '</div>' +
        '</div></div>' +
        '<div class="row">' +
        '<div class="col-lg-5"><input type="text" size="10" ng-model="controller.email" class="form-control" placeholder="name@example.com"/></div>' +
        '<div class="col-lg-5"><a class="btn btn-default" ng-click="controller.sendEmail()">Send</a></div>' +
        '</div>';