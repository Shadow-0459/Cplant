/*global angular, document*/

angular.module('cplantApp').factory('AnswersService', function (UtilityService) {
    'use strict';
    var answers = {
        appName : UtilityService.appName,
        appDescription : UtilityService.appDescription,

        product : UtilityService.product,
        productOther : UtilityService.productOther,

        belongTo : UtilityService.belongTo,
        belongToOther : UtilityService.belongToOther,

        userCustomers : UtilityService.userCustomers,
        userSDSCET : UtilityService.userSDSCET,
        userOther : UtilityService.userOther,
        userOtherContent : UtilityService.userOtherContent,
        toolUser : UtilityService.toolUser,

        userToolHave : UtilityService.userToolHave,

        caseOpenDay : UtilityService.caseOpenDay,
        caseOpenDayOther : UtilityService.caseOpenDayOther,

        toolHelpDecrease : UtilityService.toolHelpDecrease,
        toolHelpShorten : UtilityService.toolHelpShorten,
        toolExisting : UtilityService.toolExisting,

        kbaseSolutions : UtilityService.kbaseSolutions,
        keyRequirements : UtilityService.keyRequirements,
        ListScenarios : UtilityService.ListScenarios,
        specific : UtilityService.specific,
        primaryContact : UtilityService.primaryContact


    };
    return answers;
});
