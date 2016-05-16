var myApp = angular.module('myApp', ['ng-admin', 'ui.tinymce']);


//var customCreate = customCreateTemplate;
myApp.config(['NgAdminConfigurationProvider', function (nga) {
        var admin = nga.application('Administracion de Logica de Negocios').baseApiUrl('http://10.4.12.1:8080/bl-admin/api/');
        //var admin = nga.application('Administracion de Logica de Negocios').baseApiUrl('http://10.4.10.48:3000/');

        var aceHtmlOption = "{mode: 'html'}";
        var tinyMceTemplate = "<tiny-editor></tiny-editor>";
        //var aceHtmlTemplate = '<div id="wrap"><div style="height: 300px;" ui-ace="' + aceHtmlOption + '" ng-model="value"/></div>';
        var defaultActions = ['show'];
        var searchTemplate = '<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>';


        /* documentos */
        var documento = nga.entity('documento').identifier(nga.field('id_documento'));
        var requerimiento = nga.entity('requerimiento').identifier(nga.field('id_ma_requerimiento'));

        /* temas */
        var tema = nga.entity('tema').identifier(nga.field('id_tema'));

        /* tipoDocumento */
        var tipoDocumento = nga.entity('tipoDocumento').identifier(nga.field('id_tipo_documento'));
        tipoDocumento.showView().fields([
            nga.field('id_tipo_documento'),
            nga.field('nombre').isDetailLink(true)
        ]);


        /* condicion */
        var condicion = nga.entity('condicion').identifier(nga.field('id_condicion'));

        // funcion de utilidad usada para concatenar el id antes del valor de un campo
        var concatId = function (value, entry) {
            var entityName = entry.route;
            var myArray = nga.config._entities;
            var arrayLength = myArray.length;
            for (var i = 0; i < arrayLength; i++) {
                if (myArray[i]._name === entityName) {
                    var identifier = myArray[i]._identifierField._name;
                    var idValue = entry[identifier];
                    return idValue + ' - ' + value;
                }
            }
            return value;

        };

        condicion.listView().fields([
            nga.field('id_condicion'),
            nga.field('nombre').isDetailLink(true),
            nga.field('descripcion')
        ]).listActions(defaultActions);

        condicion.creationView().fields([
            nga.field('nombre'),
            nga.field('descripcion'),
            nga.field('depende_de', 'reference_many')
                    .label('Dependencias')
                    .targetEntity(condicion)
                    .targetField(nga.field('nombre'))
                    /*.perPage(10)
                     .remoteComplete(true, {
                     refreshDelay: 600,
                     searchQuery: function (search) {
                     return {id_condicion: search};
                     }
                     })*/
                    /*                    .singleApiCall(function (condicionIds) {
                     console.log(id);
                     return {'ids': condicionIds};
                     })*/
                    .attributes({placeholder: 'Seleccione condiciones ...'}),
            //nga.field('implementacion').template(aceHtmlTemplate)
            nga.field('implementacion', 'wysiwyg')

        ]);
        condicion.editionView().fields(condicion.creationView().fields());
        condicion.showView().fields(condicion.creationView().fields());

        /* requerimientos*/
        requerimiento.listView().fields([
            nga.field('id_ma_requerimiento'),
            nga.field('titulo').isDetailLink(true)
        ]).listActions(defaultActions)
                .filters([
                    nga.field('id_ma_requerimiento')
                            .label('Id')
                            .pinned(true)
                            .template(searchTemplate)
                ]);

        requerimiento.editionView().fields([
            nga.field('titulo').editable(false),
            nga.field('descripcion', 'wysiwyg').editable(false),
            nga.field('documentos', 'reference_many')
                    .label('Documentado en')
                    .targetEntity(documento)
                    .targetField(nga.field('nombre').map(concatId)),
            nga.field('requerimientosRelacionados', 'reference_many')
                    .label('Relacionados')
                    .targetEntity(requerimiento)
                    .targetField(nga.field('titulo').map(concatId))
                    .perPage(0)
                    .remoteComplete(true, {
                        refreshDelay: 600,
                        searchQuery: function (search) {
                            return {id_ma_requerimiento: search};
                        }
                    })
                    .singleApiCall(function (condicionIds) {
                        return {'ids': condicionIds};
                    }),
            nga.field('tickets', 'reference_many')
                    .label('Tickets')
                    .targetEntity(nga.entity('ticket'))
                    .targetField(nga.field('id'))
        ]);

        requerimiento.showView().fields(requerimiento.editionView().fields());
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

        tema.listView().fields([
            nga.field('id_tema'),
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


        documento.listView().fields([
            nga.field('id_documento'),
            nga.field('id_tipo_documento', 'reference').label('Tipo')
                    .targetEntity(tipoDocumento)
                    .targetField(nga.field('nombre')),
            nga.field('nombre').isDetailLink(true),
            nga.field('temas', 'reference_many')
                    .label('Tema')
                    .targetEntity(tema)
                    .targetField(nga.field('nombre'))
                    .singleApiCall(function (ids) {
                        return {'ids': ids};
                    })
        ]).filters([
            nga.field('id_tema', 'reference')
                    .label('Tema')
                    .targetEntity(tema)
                    .targetField(nga.field('nombre'))
                    .remoteComplete(true, {
                        refreshDelay: 200,
                        searchQuery: function (search) {
                            return {q: search};
                        }
                    }),
            nga.field('id_tipo_documento', 'reference')
                    .label('Tipo')
                    .targetEntity(tipoDocumento)
                    .targetField(nga.field('nombre'))
                    .remoteComplete(true, {
                        refreshDelay: 200,
                        searchQuery: function (search) {
                            return {q: search};
                        }
                    })

        ]);

        documento.creationView().fields([
            nga.field('nombre'),
            nga.field('id_tipo_documento', 'reference').label('Tipo')
                    .targetEntity(tipoDocumento)
                    .targetField(nga.field('nombre')),
            nga.field('temas', 'reference_many')
                    .targetEntity(tema)
                    .targetField(nga.field('nombre').map(concatId))
                    .singleApiCall(function (ids) {
                        return {'ids': ids};
                    }),
            /*nga.field('precondiciones', 'reference_many')
             .targetEntity(condicion)
             .targetField(nga.field('nombre').map(concatId))*/
            /*.perPage(0)
             .remoteComplete(true, {
             refreshDelay: 600,
             searchQuery: function (search) {
             return {id_condicion: search};
             }
             })*/,
                    //nga.field('detalle', 'wysiwyg').sanitize(false),
                    nga.field('detalle').template(tinyMceTemplate),
                    /*nga.field('postcondiciones', 'reference_many')
                     .targetEntity(postcondicion)
                     .targetField(nga.field('nombre').map(concatId)),*/
                    /*nga.field('requerimientos', 'referenced_list').editable(false)
                     .targetEntity(requerimiento)
                     .targetReferenceField('id_documento')
                     .targetFields([
                     nga.field('id_ma_requerimiento'),
                     nga.field('titulo').isDetailLink(true)
                     ])*/

        ]);
        //.editable(false)
        documento.editionView()
//                .template(documentoEditionTemplate)
                .fields(documento.creationView().fields());
        documento.showView()
                .fields(
                nga.field('nombre'),
                nga.field('id_tipo_documento', 'reference')
                .label('Tipo')
                .targetEntity(tipoDocumento)
                .targetField(nga.field('nombre')),
                nga.field('temas', 'reference_many')
                .targetEntity(tema)
                .targetField(nga.field('nombre').map(concatId))
                .singleApiCall(function (ids) {
                    return {'ids': ids};
                }),
                nga.field('detalle', 'wysiwyg').editable(false),
                nga.field('requerimientos', 'referenced_list').editable(false)
                .targetEntity(requerimiento)
                .targetReferenceField('id_documento')
                .targetFields([
                    nga.field('id_ma_requerimiento'),
                    nga.field('titulo').isDetailLink(true)
                ])

                );


        admin.addEntity(tipoDocumento);
        admin.addEntity(documento);
        admin.addEntity(tema);
        admin.addEntity(requerimiento);
        admin.addEntity(ticket);

        nga.configure(admin);


    }]);



