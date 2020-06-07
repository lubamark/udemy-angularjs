(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function (
            $scope,
            $state,
            classifiedsFactory,
            $mdSidenav,
            $mdToast,
            $mdDialog,
            ) {

            var vm = this;
            vm.classifieds;
            vm.categories;
            vm.edit;
            vm.classified;
            vm.openSidebar = openSidebar;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
            vm.editClassified = editClassified;
            vm.deleteClassified = deleteClassified;
            vm.saveEdit = saveEdit;

            vm.classifieds = classifiedsFactory.ref;
            vm.classifieds.$loaded().then(function(classifieds) {
                vm.categories = getCategories(classifieds);
            });

            $scope.$on('newClassified', function(event, classified) {
                vm.classifieds.$add(classified);
                showToast('Classified saved!');
            });

            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            })

            var contact = {
                name: 'El Barto',
                phone: '5555-5555',
                email: 'stupid@flanders.com',
            };


            function openSidebar () {
                $state.go('classifieds.new');
            };

            function closeSidebar () {
                $mdSidenav('left').close();
            }

            function saveClassified(classified) {
                if (classified) {
                    vm.classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};
                    closeSidebar();
                    showToast('Classified saved!');
                }
            }

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

            function saveEdit() {
                vm.edit = false;
                vm.classified = {};
                closeSidebar();
                showToast('Edit saved!');
            }

           

            function showToast(content) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(content)
                        .position('top, right')
                        .hideDelay(3000)
                )
            }


            function getCategories (classifieds) {
                var categories = [];

                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    })
                });

                return _.uniq(categories);
            }
        });

})();