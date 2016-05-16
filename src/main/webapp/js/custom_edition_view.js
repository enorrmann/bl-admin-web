var  documentoEditionTemplate = 
'<div class="row">'+
'    <div class="col-lg-12">'+
'        <div class="page-header">'+
'            <ma-view-actions override="::showController.actions" entry="entry" entity="::showController.entity">'+
'                <ma-list-button ng-if="::entity.listView().enabled" entity="::entity"></ma-list-button>'+
'                <ma-edit-button ng-if="::entity.editionView().enabled" entry="entry" entity="::entity"></ma-edit-button>'+
'                <ma-delete-button ng-if="::entity.deletionView().enabled" entry="entry" entity="::entity"></ma-delete-button>'+
'            </ma-view-actions>'+
'            <h1 compile="::showController.title">'+
'                {{ ::showController.view.entity.label() | humanize | singularize | translate }}  #{{ ::entry.identifierValue }} {{ \'DETAIL\' | translate }}'+
'            </h1>'+
'            <p class="lead" ng-if="::showController.description" compile="::showController.description">{{ ::showController.description }}</p>'+
'        </div>'+
'    </div>'+
'</div>'+
'<div class="row form-horizontal" id="show-view">'+
'    <div ng-repeat="field in ::showController.fields track by $index" compile="::field.getTemplateValueWithLabel(entry)">'+
'       <ma-show-item field="::field" entry="::entry" entity="::showController.entity" datastore="::showController.dataStore"></ma-show-item>'+
'    </div>'+
'</div>';
