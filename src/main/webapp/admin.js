var myApp = angular.module('myApp', ['ng-admin', 'ui.ace']);


//var customCreate = customCreateTemplate;
myApp.config(['NgAdminConfigurationProvider', function (nga) {
        var admin = nga.application('Administracion de Logica de Negocios').baseApiUrl('http://10.4.10.48:8080/bl-admin/api/');

        var aceHtmlOption = "{mode: 'html'}";
        var aceHtmlTemplate = '<div id="wrap"><div style="height: 300px;" ui-ace="' + aceHtmlOption + '" ng-model="value"/></div>';
        var defaultActions = ['show', 'edit', 'delete'];

        /* condicion */
        var condicion = nga.entity('condicion');
        condicion.listView().fields([
            nga.field('nombre'),
            nga.field('descripcion')
        ]).listActions(defaultActions);

        condicion.creationView().fields([
            nga.field('nombre'),
            nga.field('descripcion'),
            nga.field('dependeDe', 'reference_many')
                    .targetEntity(nga.entity('condicion'))
                    .targetField(nga.field('descripcion'))
                    .attributes({placeholder: 'Seleccione condiciones ...'}),
            nga.field('implementacion').template(aceHtmlTemplate)
        ]);
        condicion.editionView().fields(condicion.creationView().fields());
        condicion.showView().fields(condicion.creationView().fields());

        /* requerimientos*/
        var requerimiento = nga.entity('requerimiento').readOnly();
        requerimiento.listView().fields([
            nga.field('id'),
            nga.field('titulo')
        ]).listActions(defaultActions);
        requerimiento.showView().fields([
            nga.field('id'),
            nga.field('titulo'),
            nga.field('descripcion')
        ]);

        /* tickets */
        var ticket = nga.entity('ticket').readOnly();
        ticket.listView().fields([
            nga.field('id'),
            nga.field('titulo')
        ]).listActions(['show']);
        ticket.showView().fields([
            nga.field('id'),
            nga.field('titulo'),
            nga.field('consulta'),
            nga.field('respuesta')
        ]);


        /* casos de uso*/
        var caso = nga.entity('casoDeUso');
        caso.listView().fields([
            nga.field('id'),
            nga.field('nombre'),
            nga.field('tema')
        ]).listActions(defaultActions);

        caso.creationView().fields([
            nga.field('nombre'),
            nga.field('tema'),
            nga.field('precondiciones', 'reference_many')
                    .targetEntity(nga.entity('condicion'))
                    .targetField(nga.field('descripcion'))
                    .attributes({placeholder: 'Seleccione condiciones ...'}),
            nga.field('detalle').template(aceHtmlTemplate),
            nga.field('postcondiciones', 'reference_many')
                    .targetEntity(nga.entity('condicion'))
                    .targetField(nga.field('descripcion'))
                    .attributes({placeholder: 'Seleccione condiciones ...'}),
            nga.field('resultadoExitoso').label('Resultado exitoso'),
            nga.field('resultadoFallido').label('Resultado fallido')
        ]);
        caso.editionView().fields(caso.creationView().fields());
        caso.showView().fields(caso.editionView().fields());

        admin.addEntity(caso);
        admin.addEntity(condicion);
        admin.addEntity(requerimiento);
        admin.addEntity(ticket);

        nga.configure(admin);
    }]);


