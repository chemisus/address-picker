'use strict';

(function () {
    var module = angular.module('AddressPicker', []);

    function AngularAddressPicker() {
    }

    function AngularAddressFetcher($http) {
        this.fetchAddress = function (value) {
            return $http({
                method: 'get',
                url: '/geocode.php?search=' + value.replace(/\#/g, '%23'),
                dataType: 'json'
            });
        };
    }

    module.factory(
        'AddressFetcher',
        [
            '$http',
            function ($http) {
                return new AngularAddressFetcher($http);
            }
        ]
    );

    module.factory(
        'AddressFactory',
        [
            function () {
                return new AddressFactory();
            }
        ]
    );

    module.factory(
        'AddressResponseReader',
        [
            function () {
                return new AddressResponseReader();
            }
        ]
    )

    module.directive(
        'addresspicker',
        [
            'AddressFetcher',
            'AddressResponseReader',
            function (address_fetcher, address_response_reader) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {


                        address_fetcher.fetchAddress('595 w church st #438 orlando florida').success(function (response) {
                            address_response_reader.readResponse(response);
                        });
                    }
                };
            }
        ]
    );
})();
