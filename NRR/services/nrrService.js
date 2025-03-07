const teamData = require('../data/teamData');

function getTeamStats(teamName) {
    return teamData.find(team => team.Team === teamName) || null;
}

function getTargetTeam(desiredPosition) {
    return [...teamData].sort((a, b) => b.Pts - a.Pts)[desiredPosition - 1];
}

function convertDecimalOvers(decimalOvers) {
    let overs = Math.floor(decimalOvers);  // Extract full overs
    let balls = Math.round((decimalOvers - overs) * 6);  // Convert decimal part to balls

    if (balls >= 6) {
        overs += Math.floor(balls / 6);  // Increase full overs
        balls = balls % 6;  // Remaining balls after full overs
    }
    return `${overs}.${balls}`;
}
function splitNumber(value) {
    const integerPart = Math.floor(value);
    const decimalPart = (value - integerPart) * 10;
    return { integerPart, decimalPart };
}

function calculateNetRunRateBowling(selectedTeam,overs,calculateover, run) {
 
    // Calculate new total runs and overs
    const updatedTotalRuns = selectedTeam.totalRuns + run;
    let  updatedTotalOvers = selectedTeam.totalOvers + parseInt(calculateover);
    updatedTotalOvers = updatedTotalOvers.toFixed(1);
    
    // Calculate conceded runs and overs
    const updatedConcededRuns = selectedTeam.concededRuns + run;
    let  updatedConcededOvers = selectedTeam.concededOvers + parseFloat(overs);
    updatedConcededOvers = updatedConcededOvers;
    const netRunRate = (updatedTotalRuns / updatedTotalOvers) - (updatedConcededRuns / updatedConcededOvers);
    return netRunRate.toFixed(3);
}

function minMumOver(selectedTeam, run, oppositionObject, currentNRR){
    let opponentRunRate = oppositionObject.concededRuns / oppositionObject.concededOvers;
    opponentRunRate = opponentRunRate.toFixed(3);
    
    const totalRun = parseInt(selectedTeam.totalRuns) + run;
    const finalData =   parseFloat(opponentRunRate) + parseFloat(currentNRR);
    const newRes = totalRun / finalData.toFixed(2);
    let finalover = newRes.toFixed(1) - selectedTeam.totalOvers;
    const {decimalPart} = splitNumber(finalover.toFixed(1));
    
    if(decimalPart.toFixed(0)>6){
        finalover = convertDecimalOvers(finalover)
    }else{
        finalover = parseFloat(finalover);
    }
    return finalover;
}

function maxMumOver(selectedTeam, run, oppositionObject){
    let opponentRunRate = oppositionObject.concededRuns / oppositionObject.concededOvers;
    opponentRunRate = opponentRunRate.toFixed(3);
    const totalRun = parseInt(selectedTeam.totalRuns) + run;
    const newRes = totalRun / opponentRunRate;
    let finalover = newRes.toFixed(1) - selectedTeam.totalOvers;
    const {decimalPart} = splitNumber(finalover.toFixed(1));
    
    if(decimalPart.toFixed(0)>6){
        finalover = convertDecimalOvers(finalover)
    }else{
        finalover = parseFloat(finalover);
    }
    return finalover;
}

function calculateBollingOvers(selectedTeam,extraOvers,minOvers, extraRuns){
    const Nrr = calculateNetRunRateBowling(selectedTeam,extraOvers,minOvers, parseInt(extraRuns));
    return {Nrr}
}

function calculateNetRunRate(selectedTeam,overs, run, updatedConcededRuns1) {

    // Calculate new total runs and overs
    const updatedTotalRuns = selectedTeam.totalRuns + run;
    const updatedTotalOvers = selectedTeam.totalOvers + overs;

    // Calculate conceded runs and overs
    const updatedConcededRuns = selectedTeam.concededRuns + updatedConcededRuns1;
    const updatedConcededOvers = selectedTeam.concededOvers + overs;
    const netRunRate = (updatedTotalRuns / updatedTotalOvers) - (updatedConcededRuns / updatedConcededOvers);;
    
    return netRunRate.toFixed(3);
}

function calculateBattingFirstNRR(yourTeam, oppositionTeam,desiredPosition, run, overs) {

    let selectedTeam = getTeamStats(yourTeam);
    let opponentRunRate = getTargetTeam(desiredPosition);
    opponentRunRate = opponentRunRate.NRR

    // Updated statistics after adding new runs and overs
    const updatedTotalRuns = selectedTeam.totalRuns + run;
    const updatedTotalOvers = selectedTeam.totalOvers + overs;
    const updatedConcededOvers = selectedTeam.concededOvers + overs;

    // Calculating new run rate
    const updatedRunRate = updatedTotalRuns / updatedTotalOvers;
    const adjustedRunRate = updatedRunRate - opponentRunRate;
    const projectedConcededRuns = adjustedRunRate * updatedConcededOvers;
    const updatedConcededRuns = projectedConcededRuns - selectedTeam.concededRuns;

    const mintNrr = calculateNetRunRate(selectedTeam,overs,run,parseInt(updatedConcededRuns.toFixed(0)-1))
    const maxNrr = calculateNetRunRate(selectedTeam,overs,run,parseInt(updatedConcededRuns.toFixed(0) - 6))

    return {
        message: `If ${yourTeam} score ${run} runs in ${overs} overs, they need to restrict ${oppositionTeam} between ${updatedConcededRuns.toFixed(0) - 6} to ${updatedConcededRuns.toFixed(0)-1} runs in ${overs} overs.`,
        revisedNRR: `Revised NRR of ${yourTeam} will be between ${maxNrr} to ${mintNrr}.`
    }
}

function calculateBowlingFirstNRR(yourTeam,oppositionTeam, desiredPosition, extraRuns, extraOvers) {

    let selectedTeam = getTeamStats(yourTeam);
    let oppositionObject = getTeamStats(oppositionTeam);
    let currentNRR = getTargetTeam(desiredPosition);
    currentNRR = currentNRR.NRR

    // oversDifference = formatOvers(oversDifference)
    const minOvers = minMumOver(selectedTeam, extraRuns, oppositionObject, currentNRR);
    const maxMaxOver = maxMumOver(selectedTeam, extraRuns, oppositionObject);
   
    const minResult = calculateBollingOvers(selectedTeam,extraOvers,minOvers, extraRuns);
    const maxResult = calculateBollingOvers(selectedTeam,extraOvers,maxMaxOver, extraRuns);

    return {
        "message": `${yourTeam} need to chase ${extraRuns} runs between ${minOvers} and ${maxMaxOver} overs.`,
        "revisedNRR": `Revised NRR ${yourTeam} will be between ${maxResult.Nrr} to ${minResult.Nrr}.`
    };
}

function calculateNRRForPosition({ yourTeam, oppositionTeam, matchOvers, desiredPosition, tossResult, runsInput }) {
    if(desiredPosition){
        let yourStats = getTeamStats(yourTeam);
        let targetTeam = getTargetTeam(desiredPosition);
        if(desiredPosition === yourStats.pos) throw new Error(`your position already is  ${targetTeam.pos}.`);
        if(yourStats.pos<desiredPosition) throw new Error(`your point already is  ${targetTeam.Pts} you can no go this position.`);
        if(targetTeam.Pts !== yourStats.Pts+2) throw new Error(`you can not achive this postion becouse your points is to low ${yourStats.pos}.`);
    }

    let result;
    if (tossResult === "Batting First") {
        result = calculateBattingFirstNRR(yourTeam, oppositionTeam,desiredPosition, runsInput, matchOvers);
        return result;
    } else if (tossResult === "Bowling First") {
        result = calculateBowlingFirstNRR(yourTeam,oppositionTeam, desiredPosition, runsInput, matchOvers);
        return result
    } else {
        throw new Error("Invalid toss result.");
    }
}

module.exports = { calculateNRRForPosition };