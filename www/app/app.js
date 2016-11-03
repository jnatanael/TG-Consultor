/* global firebase */

// create the module and name it terrasApp
// also include ngRoute for all our routing needs
var terrasApp = angular.module('terrasApp', ['ngRoute', 'firebase']);

// configure our routes
terrasApp.config(function ($routeProvider) {
    $routeProvider

// route for the perfil page
            .when('/perfil', {
                templateUrl: 'app/views/perfil.html',
                controller: 'perfilController'
            })

            // route for the dashboard page
            .when('/', {
                templateUrl: 'app/views/dashboard.html',
                controller: 'mainController'
            })

            // route for the agenda page
            .when('/agenda', {
                templateUrl: 'app/views/agenda.html',
                controller: 'agendaController'
            })

            // route for the consultoria page
            .when('/consultoria/:idConsultoria', {
                templateUrl: 'app/views/consultoria.html',
                controller: 'consultoriaController'
            })

            // route for the clientes page
            .when('/clientes', {
                templateUrl: 'app/views/clientes.html',
                controller: 'clientesController'
            })

            // route for the planejamentos page
            .when('/planejamentos', {
                templateUrl: 'app/views/planejamentos.html',
                controller: 'planejamentosController'
            })

            // route for the notificacao page
            .when('/notificacao', {
                templateUrl: 'app/views/notificacao.html',
                controller: 'notificacaoController'
            })


// route for the info-propriedade page
            .when('/info-propriedade/:idPropriedade', {
                templateUrl: 'app/views/info-propriedade.html',
                controller: 'infoPropriedadeController'
            })

// route for the info-propriedade page
            .when('/info-talhao/:idTalhao', {
                templateUrl: 'app/views/info-talhao.html',
                controller: 'infoTalhaoController'
            })


// route for the info-cliente page
            .when('/info-cliente/:idCliente', {
                templateUrl: 'app/views/info-cliente.html',
                controller: 'infoClienteController'
            })
// route for the info-cliente page
            .when('/info-planejamento/:idPlanej', {
                templateUrl: 'app/views/info-planejamento.html',
                controller: 'infoPlanejamentoController'
            })

            // route for the info-cliente page
            .when('/info-planejamento-talhao/:idPlanej/:idPlanejTalhao', {
                templateUrl: 'app/views/info-planejamento-talhao.html',
                controller: 'infoPlanejamentoTalhaoController'
            })

            // route for the info-cliente page
            .when('/info-consultoria-talhao/:idConsult/:idPlanej/:idPlanejTalhao', {
                templateUrl: 'app/views/info-consultoria-talhao.html',
                controller: 'infoConsultoriaTalhaoController'
            })

            // route for the list-propriedades page
            .when('/list-propriedades/:idProp', {
                templateUrl: 'app/views/list-propriedades.html',
                controller: 'listPropriedadesController'
            })

            // route for the list-propriedades page
            .when('/msg/:idUs/:idMsg', {
                templateUrl: 'app/views/msg.html',
                controller: 'msgAllController'
            })

            // route for the list-propriedades page
            .when('/mensagens/:idUser', {
                templateUrl: 'app/views/mensagens.html',
                controller: 'mensagensController'
            });
});


function dataAtual() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}
;
// create the controller and inject Angular's $scope
terrasApp.controller('mainController', function ($scope, $firebaseArray, $firebaseObject) {
    // create a class active for menu
    $scope.message = 'Dashboard';
    $scope.today = dataAtual();

    var arrayMes = new Array();
    arrayMes[0] = "Janeiro";
    arrayMes[1] = "Fevereiro";
    arrayMes[2] = "Março";
    arrayMes[3] = "Abril";
    arrayMes[4] = "Maio";
    arrayMes[5] = "Junho";
    arrayMes[6] = "Julho";
    arrayMes[7] = "Agosto";
    arrayMes[8] = "Setembro";
    arrayMes[9] = "Outubro";
    arrayMes[10] = "Novembro";
    arrayMes[11] = "Dezembro";

    var today = new Date();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    $scope.mes = arrayMes[mm] + '/' + yyyy;
    var ref = firebase.database().ref('/consultorias/').orderByChild("visitaCount").equalTo(0);
    var ref1 = firebase.database().ref('/consultorias/').orderByChild("visitaCount").equalTo(1);
    $scope.agendado = $firebaseArray(ref);
    $scope.visitado = $firebaseArray(ref1);

    firebase.auth().onAuthStateChanged(function (user) {
        var uid = user.uid;
        var ref = firebase.database().ref('/consultores/' + uid);
        // download the data into a local object
        $scope.consultor = $firebaseObject(ref);
    });

});

terrasApp.controller('perfilController', function ($scope, $firebaseObject) {
// create a class active for menu
    $scope.message = 'Perfil';

    firebase.auth().onAuthStateChanged(function (user) {
        var uid = user.uid;
        var ref = firebase.database().ref('/consultores/' + uid);
        // download the data into a local object
        $scope.data = $firebaseObject(ref);
    });

});

terrasApp.controller('nomeController', function ($scope, $firebaseObject) {
// create a class active for menu

    firebase.auth().onAuthStateChanged(function (user) {
        var uid = user.uid;
        var ref = firebase.database().ref('/consultores/' + uid);
        // download the data into a local object
        $scope.data = $firebaseObject(ref);
    });

});

terrasApp.controller('msgController', function ($scope, $firebaseArray, $routeParams, $firebaseObject) {
// create a class active for menu

    firebase.auth().onAuthStateChanged(function (user) {
        var uid = user.uid;
        var ref = firebase.database().ref('/notificacoes/' + uid).orderByChild("status").equalTo(0);
        var ref2 = firebase.database().ref('/notificacoes/' + uid).orderByChild("status").equalTo(1);

        // download the data into a local object
        var notficacoes = $firebaseArray(ref);
        var notficacoes2 = $firebaseArray(ref2);

        $scope.data = notficacoes;
        $scope.data2 = notficacoes2;
        $scope.id = uid;

        notficacoes.$loaded().then(function (notes) {
            $scope.n = notes.length; // data is loaded here
        });

    });

});

terrasApp.controller('msgAllController', function ($scope, $routeParams, $firebaseObject) {

    var id = $routeParams.idMsg;
    var idU = $routeParams.idUs;
    var ref = firebase.database().ref('/notificacoes/' + idU + '/' + id);

    $scope.id = idU;

//atualizando

    ref.update({status: 1});

    // download the data into a local object
    $scope.dataMsg = $firebaseObject(ref);
    // create a class active for menu
    $scope.message = 'Notificação';

});

terrasApp.controller('mensagensController', function ($scope, $routeParams, $firebaseArray) {

    var idU = $routeParams.idUser;
    var ref = firebase.database().ref('/notificacoes/');
    $scope.id = idU;
    // download the data into a local object
    $scope.dataMsg = $firebaseArray(ref);
    // create a class active for menu
    $scope.message = 'Mensagens';

});

var arrayEtapa = {
    dessecacao: "Dessecação",
    plantio: "Plantio",
    um_de_ultra: "1 de Ultra",
    dois_de_ultra: "2 de Ultra",
    primeiro_fungicida: "1º Fungicida",
    segundo_fungicida: "2º Fungicida",
    terceiro_fungicida: "3º Fungicida",
    entre_etapas: "Entre Etapas"
};

terrasApp.controller('agendaController', function ($scope, $firebaseArray) {
    // create a class active for menu
    $scope.message = 'Agenda';

    firebase.auth().onAuthStateChanged(function (user) {
        var uid = user.uid;
        var ref = firebase.database().ref('/consultorias/').orderByChild("idConsultor").equalTo(uid);
        var dataConsultoria = $firebaseArray(ref);
        $scope.data = dataConsultoria;
        $scope.etapaV = arrayEtapa;
    });

    $scope.today = dataAtual();
});

terrasApp.controller('consultoriaController', function ($scope, $firebaseObject, $routeParams) {
    // create a class active for menu
    $scope.message = 'Consultoria';
    var id = $routeParams.idConsultoria;
    var ref = firebase.database().ref('/consultorias/' + id);

    var dataConsultoria = $firebaseObject(ref);
    $scope.data = dataConsultoria;

    dataConsultoria.$loaded().then(function () {
        var etapa = dataConsultoria.etapa;
        var idPlanejamento = dataConsultoria.idPlanejamento;
        $scope.etapaV = arrayEtapa[etapa];
        $scope.dataAgenda = dataConsultoria.data;
        $scope.dataVisita = dataConsultoria.status;

        var refP = firebase.database().ref('/planejamentos/' + idPlanejamento);
        $scope.planejamento = $firebaseObject(refP);
        $scope.id = idPlanejamento;
    });

    $scope.addEtapa = function (idConsultoria, idProjeto, idTalhao) {
        var ref = firebase.database().ref('/planejamentos/' + idProjeto + '/planejamentoTalhoes/' + idTalhao + '/visitas/' + idConsultoria);
        var ref2 = firebase.database().ref('/planejamentos/' + idProjeto + '/planejamentoTalhoes/' + idTalhao);
        $('#modalEtapa').openModal();
        $scope.salvarEtapa = function () {
            var etapaTalhao = this.etapa;
            swal({title: "Confirmar?",
                text: "Você deseja realmente Confirmar a escolha desta etapa para?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim!",
                cancelButtonText: "Não!",
                closeOnConfirm: false,
                closeOnCancel: false},
                    function (isConfirm) {
                        if (isConfirm) {
                            ref.update({
                                etapa: etapaTalhao,
                                data: dataAtual(),
                                tipo: 0
                            });
                            ref2.update({
                                statusEtapa: 1
                            });
                            swal("Confirmado!", "Etapa escolhida com sucesso!", "success");
                        } else {
                            swal("Cancelado", "Etapa não atribuida :)", "error");
                        }
                    });
        };
    };
});

terrasApp.controller('clientesController', function ($scope, $firebaseArray) {
    // create a class active for menu
    $scope.message = 'Clientes';
    var ref = firebase.database().ref('/clientes/');
    $scope.data = $firebaseArray(ref);
});

terrasApp.controller('propriedadesController', function ($scope, $firebaseArray) {
    // create a class active for menu
    $scope.message = 'Propriedades';
    var refPropriedades = firebase.database().ref('/propriedades/');
    var dataREF = $firebaseArray(refPropriedades);
    $scope.data = dataREF;
});



terrasApp.controller('listPropriedadesController', function ($scope, $firebaseObject, $window, $routeParams, $firebaseArray) {
    // create a class active for menu
    $scope.message = 'Lista de Propriedades do Cliente';
    var ref = firebase.database().ref('/clientes/' + $routeParams.idProp);
    var refPropriedades = firebase.database().ref('/propriedades/').orderByChild("idProprietario").equalTo($routeParams.idProp);
    ;
    $scope.data = $firebaseArray(refPropriedades);
    $scope.data2 = $firebaseObject(ref);

    $window.map = new google.maps.Map(document.getElementById('mapPropriedade'), {
        center: {lat: -13.5348981, lng: -71.6358311},
        zoom: 5
    });
});

terrasApp.controller('planejamentosController', function ($scope, $firebaseArray) {
    // create a class active for menu
    $scope.message = 'Planejamento';
    var ref = firebase.database().ref('/planejamentos/');
    var dataAll = $firebaseArray(ref);
    $scope.data = dataAll;
});


terrasApp.controller('notificacaoController', function ($scope, $firebaseArray, $firebaseObject) {
    // create a class active for menu
    $scope.message = 'Notificações';

    var ref1 = firebase.database().ref('/clientes/');
    var ref2 = firebase.database().ref('/usuarios/');
    var ref3 = firebase.database().ref('/consultores/');
    $scope.data1 = $firebaseArray(ref1);
    $scope.data2 = $firebaseArray(ref2);
    $scope.data3 = $firebaseArray(ref3);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.user = $firebaseObject(firebase.database().ref('/consultores/' + user.uid));

        } else {
            console.log(error);
        }
    });
});


terrasApp.controller('talhaoController', function ($scope, $firebaseArray) {
    var refTalhoes = firebase.database().ref('/talhoes/');
    // download the data into a local object
    var dataTalhaoRef = $firebaseArray(refTalhoes);
    $scope.data = dataTalhaoRef;
});

terrasApp.controller('infoPropriedadeController', function ($scope, $window, $routeParams, $firebaseObject, $firebaseArray) {
    var id = $routeParams.idPropriedade;
    var ref = firebase.database().ref('/propriedades/' + id);
    // download the data into a local object
    var dataProriedade = $firebaseObject(ref);
    $scope.data = dataProriedade;

    // create a class active for menu
    $scope.message = 'Informações da Propriedade';

    var refTalhoes = firebase.database().ref('/talhoes/');
    // download the data into a local object
    var dataTalhaoRef = $firebaseArray(refTalhoes);

    $scope.dataTalhao = dataTalhaoRef;


    dataProriedade.$loaded().then(function () {
        var latitude = parseFloat(dataProriedade.latitude);
        var longitude = parseFloat(dataProriedade.longitude);

        var myLatLng = {lat: latitude, lng: longitude};

        var map = new google.maps.Map(document.getElementById('mapPropriedade'), {
            center: myLatLng,
            zoom: 0
        });

        $window.map = map;

        var companyImage = 'images/map-marker.png';
        // Create a marker and set its position.
        dataTalhaoRef.$loaded().then(function () {
            var latitude = parseFloat(dataTalhaoRef[0].latitude);
            var longitude = parseFloat(dataTalhaoRef[0].longitude);

            var myLatLng2 = {lat: latitude, lng: longitude};

            var marker = new google.maps.Marker({
                map: map,
                icon: companyImage,
                position: myLatLng2,
                title: 'Talhão'
            });
        });
    });



});


terrasApp.controller('infoTalhaoController', function ($scope, $routeParams, $firebaseObject, $window) {
    var id = $routeParams.idTalhao;
    var ref = firebase.database().ref('/propriedades/' + id);
    // download the data into a local object
    $scope.data = $firebaseObject(ref);
    // create a class active for menu
    $scope.message = 'Informações do Talhão';

    var refTalhoes = firebase.database().ref('/talhoes/' + id);
    // download the data into a local object
    var dataTalhaoAux = $firebaseObject(refTalhoes);
    $scope.dataTalhao = dataTalhaoAux;

    dataTalhaoAux.$loaded().then(function () {
        var latitude = parseFloat(dataTalhaoAux.latitude);
        var longitude = parseFloat(dataTalhaoAux.longitude);

        var myLatLng = {lat: latitude, lng: longitude};

        $window.map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: myLatLng,
            mapTypeId: 'satellite',
            scrollwheel: false,
            zoom: 8
        });

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: 'Talhão'
        });
    });

});

terrasApp.controller('infoPlanejamentoController', function ($scope, $routeParams, $firebaseObject) {

    var id = $routeParams.idPlanej;
    $scope.id = id;
    var ref = firebase.database().ref('/planejamentos/' + id + '/dados');
    var refT = firebase.database().ref('/planejamentos/' + id + '/planejamentoTalhoes');
    $scope.dataT = $firebaseObject(refT);
    // download the data into a local object
    var aux = $firebaseObject(ref);
    $scope.data = aux;
    aux.$loaded().then(function () {
        var idP = aux.idPropriedade;
        var refP = firebase.database().ref('/propriedades/' + idP);
        $scope.dataP = $firebaseObject(refP);
    });
    // create a class active for menu
    $scope.message = 'Informações do Planejamento';
});

terrasApp.controller('infoPlanejamentoTalhaoController', function ($scope, $routeParams, $firebaseArray, $firebaseObject) {

    var id = $routeParams.idPlanej;
    $scope.id = id;
    var id2 = $routeParams.idPlanejTalhao;
    $scope.id2 = id2;
    var refT = firebase.database().ref('/planejamentos/' + id + '/planejamentoTalhoes' + '/' + id2);
    var pTalhao = $firebaseObject(refT);
    $scope.dataT = pTalhao;

    var ref = firebase.database().ref('/planejamentos/' + id + '/dados');
    var aux = $firebaseObject(ref);
    $scope.data = aux;
    aux.$loaded().then(function () {
        var idP = aux.idPropriedade;
        var refP = firebase.database().ref('/propriedades/' + idP);
        $scope.dataP = $firebaseObject(refP);
    });
    // download the data into a local object
    $scope.message = 'Informações do Planejamento';
});

terrasApp.controller('infoConsultoriaTalhaoController', function ($scope, $routeParams, $firebaseObject, $firebaseObject) {
    // download the data into a local object
    $scope.message = 'Informações do Planejamento para Consultoria';

    var idConsult = $routeParams.idConsult;
    $scope.idConsult = idConsult;

    var ref = firebase.database().ref('/consultorias/' + idConsult);
    $scope.dataidConsult = $firebaseObject(ref);

    var id = $routeParams.idPlanej;
    var id2 = $routeParams.idPlanejTalhao;
    var refT = firebase.database().ref('/planejamentos/' + id + '/planejamentoTalhoes' + '/' + id2 + '/visitas/' + idConsult);
    $scope.dataVisita = $firebaseObject(refT);
});


terrasApp.controller('infoConsultorController', function ($scope, $routeParams, $firebaseObject) {
    var id = $routeParams.idConsultor;
    var ref = firebase.database().ref('/consultores/' + id);
    // download the data into a local object
    $scope.data = $firebaseObject(ref);
    // create a class active for menu
    $scope.message = 'Informações do Consultor';
});

terrasApp.controller('editConsultorController', function ($scope, $routeParams, $firebaseObject) {
    // create a class active for menu
    $scope.message = 'Editar Informações do Consultor';
    var id = $routeParams.idConsultor;
    var ref = firebase.database().ref('/consultores/' + id);
    // download the data into a local object
    $scope.data = $firebaseObject(ref);
});

terrasApp.controller('infoClienteController', function ($scope, $routeParams, $firebaseObject, $firebaseArray) {
    // create a class active for menu
    $scope.message = 'Informações do Cliente';
    var id = $routeParams.idCliente;
    var ref = firebase.database().ref('/clientes/' + id);
    // download the data into a local object
    $scope.data = $firebaseObject(ref);
    var refPropriedade = firebase.database().ref('/propriedades/').orderByChild("idProprietario").equalTo(id);
    $scope.dataProp = $firebaseArray(refPropriedade);
});