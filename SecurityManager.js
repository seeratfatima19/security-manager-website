var SecurityManager = {};

SecurityManager = (function () {

    //private data members
    var _users = {key:'_users',data:[]};
    var _roles = { key: '_roles', data: [] };
    var _permissions = { key: '_permissions', data: [] };
    var _rolePermissions = { key: '_rolePermissions', data: [] };
    var _userRoles = { key: '_userRoles', data: [] };

    var _countries = [];
    var _cities = [];


    
    //private functions
    function _initialize() {

        _loadDataFromLocalStorage();
        _setCountries();
        _setCities();
    }
    function _setCountries() {
        _countries.push({ CountryID: 1, Name: 'Pakistan' });
        _countries.push({ CountryID: 2, Name: 'India' });
        _countries.push({ CountryID: 3, Name: 'China' });
    }
    function _setCities() {
        _cities.push({ CityID: 1, CountryID: 1, Name: 'Lahore' });
        _cities.push({ CityID: 2, CountryID: 1, Name: 'Karachi' });
        _cities.push({ CityID: 3, CountryID: 1, Name: 'Islamabad' });
        _cities.push({ CityID: 4, CountryID: 2, Name: 'Delhi' });
        _cities.push({ CityID: 5, CountryID: 2, Name: 'Bombay' });
        _cities.push({ CityID: 6, CountryID: 3, Name: 'Shanghai' });
        _cities.push({ CityID: 7, CountryID: 3, Name: 'Beijing' });

    }

    function _getCitiesByCountryId(cid) {
        var cities = [];

        for (var i = 0; i < _cities.length; i++) {
            if (_cities[i].CountryID == cid) {
                cities.push(_cities[i]);
            }
        }
        return cities;
    }

    function _loadDataFromLocalStorage() {

        debugger;
        if (window.localStorage) {
            if (window.localStorage[_users.key])
                _users = JSON.parse(window.localStorage[_users.key]);
            else
                _setInLocalStorage(_users);

            if (window.localStorage[_roles.key])
                _roles = JSON.parse(window.localStorage[_roles.key]);
            else
                _setInLocalStorage(_roles);

            if (window.localStorage[_permissions.key])
                _permissions = JSON.parse(window.localStorage[_permissions.key]);
            else
                _setInLocalStorage(_permissions);

            if (window.localStorage[_rolePermissions.key])
                _rolePermissions = JSON.parse(window.localStorage[_rolePermissions.key]);
            else
                _setInLocalStorage(_rolePermissions);

            if (window.localStorage[_userRoles.key])
                _userRoles = JSON.parse(window.localStorage[_userRoles.key]);
            else
                _setInLocalStorage(_userRoles);


            //if (!_users) {
            //    _users = [];
                //_users.push({ ID: 1, Name: 'Bilal1', Email: 'bilal.shahzad@pucit.edu.pk', Age: 100, Country: 1, City: 1, Login: 'bilal1', Password: 'abc' });
            //}

        }
    }
    function _setInLocalStorage(obj) {

        if (window.localStorage) {
            window.localStorage[obj.key] = JSON.stringify(obj);
        }
    }

    function _validateAdmin(login, password) {
        if (login == "admin" && password == "admin")
            return true;
        else
            return false;
    }

    //Create/Update
    function _save(obj, record, successFunction, errorFunction) {

        debugger;
        //New Record
        if (!record.ID || record.ID <= 0) {
            record.ID = _getMaxId(obj.data) + 1;
            obj.data.push(record);
        }
        else //Existing Record
        {
            var index = _findRecordIndex(obj.data, record.ID);
            if (index < 0) {
                if (errorFunction)
                    errorFunction("Invalid ID");

                return false;
            }
            else {
                obj.data[index] = record;
            }
        }//end of else

        _setInLocalStorage(obj);

        if (successFunction)
            successFunction(record);

        return true;
    }//end of _save

    //Delete
    function _delete(obj, id, successFunction, errorFunction) {

        var index = _findRecordIndex(obj.data, id);
        if (index < 0) {
            if (errorFunction)
                errorFunction("Invalid ID");

            return false;
        }
        else {
            obj.data.splice(index, 1);
        }

        _setInLocalStorage(obj);

        if (successFunction)
            successFunction(id);

        return true;
    }//end of _saveUser

    //Get By Id
    function _getById(list, id) {
        var index = _findRecordIndex(list, id);
        return list[index];
    }

    function _findRecordIndex(list, id) {
        var index = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].ID == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    function _getMaxId(list) {

        var maxId = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].ID > maxId)
                maxId = list[i].ID;
        }
        return maxId;
    }


    function _getCountries() {

    }
    //signleton object with public functions
    return {
        Initialize: function () {
            _initialize();
        },
        ValidateAdmin: function (login, password) {
            return _validateAdmin(login, password);
        },
        //User Functions
        SaveUser: function (userObj, successFunction, errorFunc) {
            return _save(_users, userObj, successFunction, errorFunc);
        },
        DeleteUser: function (userID, successFunction, errorFunc) {
            return _delete(_users, userID, successFunction, errorFunc);
        },
        GetUserById: function (userID) {
            return _getById(_users.data, userID);
        },
        GetAllUsers: function () {
            return _users.data;
        },

        //Role Functions
        SaveRole: function (roleObj, successFunction, errorFunc) {
            return _save(_roles, roleObj, successFunction, errorFunc);
        },
        DeleteRole: function (roleID, successFunction, errorFunc) {
            return _delete(_roles, roleID, successFunction, errorFunc);
        },
        GetRoleById: function (roleID) {
            return _getById(_roles.data, roleID);
        },
        GetAllRoles: function () {
            return _roles.data;
        },
        //Permission Functions
        SavePermission: function (permissionObj, successFunction, errorFunc) {
            return _save(_permissions, permissionObj, successFunction, errorFunc);
        },
        DeletePermission: function (permissionID, successFunction, errorFunc) {
            return _delete(_permissions, permissionID, successFunction, errorFunc);
        },
        GetPermissionById: function (permissionID) {
            return _getById(_permissions.data, permissionID);
        },
        GetAllPermissions: function () {
            return _permissions.data;
        },
        //RolePermission Functions
        SaveRolePermission: function (rolePermissionObj, successFunction, errorFunc) {
            return _save(_rolePermissions, rolePermissionObj, successFunction, errorFunc);
        },
        DeleteRolePermission: function (rolePermissionID, successFunction, errorFunc) {
            return _delete(_rolePermissions, rolePermissionID, successFunction, errorFunc);
        },
        GetRolePermissionById: function (rolePermissionID) {
            return _getById(_rolePermissions.data, rolePermissionID);
        },
        GetAllRolePermissions: function () {
            return _rolePermissions.data;
        },
        //UserRole Functions
        SaveUserRole: function (userRoleObj, successFunction, errorFunc) {
            return _save(_userRoles, userRoleObj, successFunction, errorFunc);
        },
        DeleteUserRole: function (userRoleID, successFunction, errorFunc) {
            return _delete(_userRoles, userRoleID, successFunction, errorFunc);
        },
        GetUserRoleById: function (userRoleID) {
            return _getById(_userRoles.data, userRoleID);
        },
        GetAllUserRoles: function () {
            return _userRoles.data;
        },
        GetCountries: function(){
            return _countries;
        },
        GetCitiesByCountryId: function (cid) {
            return _getCitiesByCountryId(cid);
        }

    }//end of singleton object


})();

SecurityManager.Initialize();

function gid(id) {
    return document.getElementById(id);
}