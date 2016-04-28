var myApp = angular.module('myApp', ['ng-admin', 'ui.ace']);


//var customCreate = customCreateTemplate;
myApp.config(['NgAdminConfigurationProvider', function (nga) {
        var admin = nga.application('Administracion de Logica de Negocios').baseApiUrl('http://10.4.10.48:8080/bl-admin/api/');
        //var admin = nga.application('Administracion de Logica de Negocios').baseApiUrl('http://10.4.10.48:3000/');

        var aceHtmlOption = "{mode: 'html'}";
        //var aceHtmlTemplate = '<div id="wrap"><div style="height: 300px;" ui-ace="' + aceHtmlOption + '" ng-model="value"/></div>';
        var defaultActions = ['show'];

        // funcion de utilidad usada para concatenar el id antes del valor de un campo
        var concatId = function (value, entry) {
            return entry.id + ' - ' + value ;
        };

        /* condicion */
        var condicion = nga.entity('condicion');
        var postcondicion = nga.entity('condicion');
        condicion.listView().fields([
            nga.field('id'),
            nga.field('nombre').isDetailLink(true),
            nga.field('descripcion')
        ]).listActions(defaultActions);

        condicion.creationView().fields([
            nga.field('nombre'),
            nga.field('descripcion'),
            nga.field('depende_de', 'reference_many')
                    .label('Dependencias')
                    .targetEntity(nga.entity('condicion'))
                    .targetField(nga.field('nombre').map(concatId))
                    .singleApiCall(function (condicionIds) {
                        return {'ids': condicionIds};
                    })
                    .attributes({placeholder: 'Seleccione condiciones ...'}),
            //nga.field('implementacion').template(aceHtmlTemplate)
            nga.field('implementacion','wysiwyg')
            
        ]);
        condicion.editionView().fields(condicion.creationView().fields());
        condicion.showView().fields(condicion.creationView().fields());

        /* requerimientos*/
        var requerimiento = nga.entity('requerimiento');
        /*requerimiento.listView().fields([
            nga.field('id'),
            nga.field('titulo').isDetailLink(true)
        ]).listActions(defaultActions);*/
        requerimiento.creationView().fields([
            nga.field('titulo'),
            nga.field('descripcion','wysiwyg'),
            nga.field('casos_de_uso', 'reference_many')
                    .label('Documentado en')
                    .targetEntity(nga.entity('casoDeUso'))
                    .targetField(nga.field('nombre')),
            nga.field('requerimientosRelacionados', 'reference_many')
                    .label('Relacionados')
                    .targetEntity(requerimiento)
                    .targetField(nga.field('titulo')),
            nga.field('tickets', 'reference_many')
                    .label('Tickets')
                    .targetEntity(nga.entity('ticket'))
                    .targetField(nga.field('id'))
        ]);

        requerimiento.editionView().fields(requerimiento.creationView().fields());
        requerimiento.showView().fields(requerimiento.creationView().fields());
        /* tickets */
        var ticket = nga.entity('ticket').readOnly();
        ticket.listView().fields([
            nga.field('id'),
            nga.field('titulo').isDetailLink(true)
        ]).listActions(['show']);
        ticket.showView().fields([
            nga.field('id'),
            nga.field('titulo'),
            nga.field('consulta'),
            nga.field('respuesta')
        ]);

        /* temas */
        var tema = nga.entity('tema');
        tema.listView().fields([
            nga.field('id'),
            nga.field('nombre').isDetailLink(true),
            nga.field('id_tema_padre', 'reference').label('Tema padre')
                    .targetEntity(tema)
                    .targetField(nga.field('nombre'))

        ]).listActions(['show']);
        tema.creationView().fields([
            nga.field('nombre'),
            nga.field('id_tema_padre', 'reference').label('Tema padre')
                    .targetEntity(tema)
                    .targetField(nga.field('nombre'))
        ]);
        tema.editionView().fields(tema.creationView().fields());

        tema.showView().fields(tema.creationView().fields());


        /* casos de uso*/
        var caso = nga.entity('casoDeUso');
        caso.listView().fields([
            nga.field('id'),
            nga.field('nombre').isDetailLink(true)
        ]).listActions(defaultActions);

        caso.creationView().fields([
            nga.field('nombre'),
            nga.field('temas', 'reference_many')
                    .targetEntity(tema)
                    .targetField(nga.field('nombre').map(concatId))
                    .singleApiCall(function (condicionIds) {
                        return {'ids': condicionIds};
                    }),
            nga.field('precondiciones', 'reference_many')
                    .targetEntity(condicion)
                    .targetField(nga.field('nombre').map(concatId)),
            nga.field('detalle','wysiwyg'),
            nga.field('postcondiciones', 'reference_many')
                    .targetEntity(postcondicion)
                    .targetField(nga.field('nombre').map(concatId)),
            nga.field('requerimientos', 'reference_many')
                    .targetEntity(nga.entity('requerimiento'))
                    .targetField(
                            nga.field('titulo').map(concatId)
                            .detailLinkRoute('show')
                            )

        ]);
        //.editable(false)
        caso.editionView().fields(caso.creationView().fields());
        caso.showView().fields(caso.creationView().fields());

        admin.addEntity(caso);
        admin.addEntity(condicion);
        admin.addEntity(tema);
        admin.addEntity(requerimiento);
        admin.addEntity(ticket);

        nga.configure(admin);
    }]);


