(function() {
    'use strict';

    angular
        .module('ngClassifieds')
        .directive('classifiedCard', function() {
            return {
                templateUrl: 'components/classifieds/classified-card/classified-card.tpl.html',
                scope: {
                    classifieds: '=',
                    classifiedsFilter: '=',
                    category: '=',
                },
                controller: classifiedCardController,
                controllerAs: 'vm'
            }

            function classifiedCardController($mdDialog, $state) {

                var vm = this;
                vm.editClassified = editClassified;
                vm.deleteClassified = deleteClassified;
                
                
                function editClassified(classified) {
                    $state.go('classifieds.edit', {
                        id: classified.$id,
                    });
                }

                function deleteClassified(event, classified) {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete ' + classified.title + '?')
                        .ok('Yes')
                        .cancel('No')
                        .targetEvent(event);
    
                    $mdDialog.show(confirm).then(
                        function() {
                            vm.classifieds.$remove(classified);
                            showToast('Classified deleted!');
                        },
                        function() {}
                        )
                };
            }
        })

})();