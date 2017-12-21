/*global angular, document*/

angular.module('cplantApp').factory('UtilityService', function () {
    'use strict';
    var utility = {};

    utility.stateTo = 'Nominate a new proposal app';

    utility.LOG_IN_PAGE = 'logInPage';
    utility.MAIN_PAGE = 'main';
    utility.NEW_APP_REQUEST = 'newAppRequest';
    utility.BUG_REQUEST = 'bugRequest';
    utility.FEATURE_REQUEST = 'featureRequest';
    utility.REQUESTS_REVIEW = 'requestsReview';

    utility.logInUserName = '';
    utility.logInPassword = '';

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



    utility.apps = [
        'Red Hat app 1',
        'Red Hat app 2',
        'Red Hat app 3',
        'Red Hat app 4'
    ];
    utility.bugSummary = '';
    utility.bugDescription = '';


    utility.featureSubject = '';
    utility.featureDescription = '';

    utility.fileName = '';



    utility.scrollToElement = function (targetElementName, RequestForm) {
        var element = angular.element(document.getElementsByName(targetElementName)[0]);
        var requestForm = angular.element(document.getElementById(RequestForm));
        requestForm.scrollToElementAnimated(element, 0, 1000);
    };
    return utility;
});
