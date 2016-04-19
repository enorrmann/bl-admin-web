var customCreateTemplate = 
'<div class="row">'+
'    <div class="col-lg-12">'+
'        <div class="page-header">'+
'            <ma-view-actions override="::formController.actions" entry="entry" entity="::formController.entity">'+
'                <ma-list-button ng-if="::entity.listView().enabled" entity="::entity"></ma-list-button>'+
'            </ma-view-actions>'+
'            <h1 compile="::formController.title">'+
'                Create new {{ ::formController.view.entity.name() | humanize:true | singularize }}'+
'            </h1>'+
'            <p class="lead" ng-if="::formController.description" compile="::formController.description">{{ ::formController.description }}</p>'+
'        </div>'+
'    </div>'+
'</div>'+
'<div class="row" id="create-view" ng-class="::\'ng-admin-entity-\' + formController.entity.name()">'+
'   <form class="col-lg-12 form-horizontal" name="formController.form" ng-submit="formController.submitCreation($event)">'+
'        <div class="form-field form-group" ng-repeat="field in ::formController.fields track by $index">'+
'            <ma-field field="::field" value="entry.values[field.name()]" entry="entry" entity="::entity" form="formController.form" datastore="::formController.dataStore"></ma-field>'+
'        </div>'+
'        <div class="form-group">'+
'            <div class="col-sm-offset-2 col-sm-10">'+
'                <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Submit</button>'+
'                <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Test</button>'+
'            </div>'+
'        </div>'+
'    </form>'+
'</div>';
