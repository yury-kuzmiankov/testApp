'use strict';
angular.module('libraryApp').factory('helper', [
    '$rootScope',
    'appConfig',
    function ($rootScope, appConfig) {
        function Storage() {
            this.storage = window.localStorage;
        }
        Storage.prototype.get = function (key) {
            return JSON.parse(this.storage.getItem(key));
        };
        Storage.prototype.set = function (key, data) {
            try {
                this.storage.setItem(key, typeof data === 'undefined' ? 'null' : JSON.stringify(data));
            } catch (e) {
                console.log('invalid json format', e);
            }
            return this;
        };
        Storage.prototype.remove = function (key) {
            this.storage.removeItem(key);
            return this;
        };
        Storage.prototype.update = function (key, newData) {
            var data = ng.extend(this.get(key) || {}, newData);
            this.set(key, data);
            return data;
        };
        return {
            getUser: function () {
                var _memory = {};
                return function (id, users) {
                    users = users || $rootScope.global.users;
                    var usersNumber = users.length, email, i = 0;
                    if (id) {
                        email = id + (~id.indexOf('@') ? '' : appConfig.EMAIL_SUFFIX);
                        if (_memory[id]) {
                            return _memory[id];
                        } else {
                            for (; i < usersNumber; i++) {
                                var user = users[i];
                                if (user.email === email || user._id === id) {
                                    _memory[id] = user;
                                    return user;
                                }
                            }
                        }
                    }
                    return null;
                };
            }(),
            storage: new Storage()
        };
    }
]);