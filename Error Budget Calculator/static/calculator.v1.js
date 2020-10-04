function calculator_showTime(errorBudget, days) {
    var d = Number(errorBudget * days);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

function errorBudgetCalculator() {

    var percentage = document.getElementById("availability");
    var sla = document.getElementById("sla")
    var currentAvailabilityLevel = percentage.value;
    var currentSLALevel = sla.value;
    var output;

    var errorBudgetPercentage = (currentAvailabilityLevel - currentSLALevel).toPrecision(2);
    var errorBudget = (errorBudgetPercentage / 100) * 24 * 60 * 60

    if (currentAvailabilityLevel === "" || currentAvailabilityLevel < 0 || currentAvailabilityLevel > 100 || currentSLALevel === "" || currentSLALevel < 0 || currentSLALevel > 100) {
        output = "<em>Input not valid. Please input a number between 0 and 100.</em>";
    } else {

        output =
            "<table id='custom-table'>"
            + "<tr>"
            + "<th>Availability</th>"
            + "<th>SLA/SLO Target</th>"
            + "<th>Error Budget</th>"
            + "<th>Error Budget per Month (30 days)</th>"
            + "<th>Error Budget per Quarter</th>"
            + "<th>Error Budget per Year</th>"
            + "</tr>";

        output += "<tr><td>" + currentAvailabilityLevel + "%</td>";
        output += "<td>" + currentSLALevel + "%</td>";
        output += "<td>" + errorBudgetPercentage + "%</td>";
        if (errorBudgetPercentage == 0) {
            output += "<td>There is no remaining error budget</td>";
            output += "<td>There is no remaining error budget</td>";
            output += "<td>There is no remaining error budget</td>";
        } else if (errorBudgetPercentage < 0) {
            output += "<td>SLO has been exceeded</td>";
            output += "<td>SLO has been exceeded</td>";
            output += "<td>SLO has been exceeded</td>";
        } else {
            output += "<td>" + calculator_showTime(errorBudget, 30) + "</td>";
            output += "<td>" + calculator_showTime(errorBudget, 91) + "</td>";
            output += "<td>" + calculator_showTime(errorBudget, 365) + "</td>";

        }
        output += "</tr></table>";
    }
    document.getElementById("error-budget-table").innerHTML = output;
};



function errorBudgetCalculator_requestspersec() {

    var requests = document.getElementById("error_budget_requestspersec");
    var sla = document.getElementById("sla_requestspersec")
    var requestsvalue = requests.value;
    var currentSLALevel = sla.value;
    var output;

    var errorBudgetPercentage = (100 - currentSLALevel).toPrecision(2);;
    var errorBudget = (errorBudgetPercentage / 100) * requestsvalue

    if (requests === "" || requests < 0 || currentSLALevel === "" || currentSLALevel < 0 || currentSLALevel > 100) {
        output = "<em>Input not valid. Please input a number between 0 and 100.</em>";
    } else {

        output =
            "<table id='custom-table'>"
            + "<tr>"
            + "<th>Request per second</th>"
            + "<th>SLO Target (%)</th>"
            + "<th>Error Budget (%)</th>"
            + "<th>Error Budget (Request per second)</th>"
            + "</tr>";

        output += "<tr><td>" + requestsvalue + "</td>";
        output += "<td>" + currentSLALevel + "%</td>";
        output += "<td>" + errorBudgetPercentage + "%</td>";
        if (errorBudgetPercentage == 0) {
            output += "<td>There is no remaining error budget</td>";
            output += "<td>There is no remaining error budget</td>";
            output += "<td>There is no remaining error budget</td>";
        } else if (errorBudgetPercentage < 0) {
            output += "<td>SLO has been exceeded</td>";
            output += "<td>SLO has been exceeded</td>";
            output += "<td>SLO has been exceeded</td>";
        } else {
            output += "<td>" + errorBudget + "</td>";
            output += "</tr><tr><td colspan=\"4\"'>" + errorBudget + " requests can fail per second.</td>";
        }
        output += "</tr></table>";
    }
    document.getElementById("error-budget-requespersec-table").innerHTML = output;
};


function menuFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }

};