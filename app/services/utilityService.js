/*global angular, document*/

angular.module('cplantApp').factory('UtilityService', function () {
    'use strict';
    var utility = {};
    // utility.OtherInputContainer = document.getElementsByClassName('OtherInputContainer');
    // utility.Others = document.getElementsByClassName('others');
    utility.appName = '';
    utility.appDescription = '';

    utility.product = 'Red Hat Enterprise Linux';
    utility.productOther = '';

    utility.belongTo = 'Kernel';
    utility.belongToOther = '';

    utility.userCustomers = false;
    utility.userSDSCET = false;
    utility.userOther = false;
    utility.userOtherContent = '';
    utility.toolUser = '';
    
    utility.userToolHave = '';

    utility.caseOpenDay = '1000+';
    utility.caseOpenDayOther = '';

    utility.toolHelpShorten = 'Yes 50%';
    utility.toolHelpDecrease = '';
    utility.toolExisting = '';

    utility.kbaseSolutions = '';
    utility.keyRequirements = '';
    utility.ListScenarios = '';
    utility.specific = '';
    utility.primaryContact = '';

    return utility;
});
