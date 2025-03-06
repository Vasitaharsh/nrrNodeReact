const teamData = require('../data/teamData');

function getTeamStats(teamName) {
    return teamData.find(team => team.Team === teamName) || null;
}

function getTargetTeam(desiredPosition) {
    return [...teamData].sort((a, b) => b.Pts - a.Pts)[desiredPosition - 1];
}

function formatOvers(overs) {
    // Extract the whole number and decimal part
    let wholeOvers = Math.floor(overs);  // Get full overs
    let balls = Math.round((overs - wholeOvers) * 10); // Convert decimal to balls

    // If balls reach 6, increment overs and reset balls
    if (balls >= 6) {
        wholeOvers += Math.floor(balls / 6);
        balls = balls % 6;
    }

    return `${wholeOvers}.${balls}`;
}

function calculateBattingFirstNRR(yourTeam, oppositionTeam, run, overs) {

    let selectedTeam = getTeamStats(yourTeam);
    let opponentRunRate = getTeamStats(oppositionTeam);
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

    // Calculating final conceded runs range
    const finalConcededRunsMin = selectedTeam.concededRuns + parseInt(updatedConcededRuns.toFixed(0)) - 8;
    const finalConcededRunsMax = selectedTeam.concededRuns + parseInt(updatedConcededRuns.toFixed(0));


    // Calculating final economy rate
    const finalEconomyRateMin = finalConcededRunsMin / updatedConcededOvers;
    const netRunRateDifferenceMin = updatedRunRate - finalEconomyRateMin;

    const finalEconomyRateMax = finalConcededRunsMax / updatedConcededOvers;
    const netRunRateDifferenceMax = updatedRunRate - finalEconomyRateMax;


    const minRunRate = (selectedTeam.NRR + 0) + parseFloat(netRunRateDifferenceMax.toFixed(2));
    const maxRunRate = (selectedTeam.NRR + 0) + parseFloat(netRunRateDifferenceMin.toFixed(2));
    
    return {
        message: `If Rajasthan Royals score ${run} runs in ${overs} overs, they need to restrict Delhi Capitals between ${updatedConcededRuns.toFixed(0) - 8} to ${updatedConcededRuns.toFixed(0)} runs in ${overs} overs.`,
        revisedNRR: `Revised NRR of Rajasthan Royals will be between ${minRunRate} to ${maxRunRate.toFixed(3)}.`
    }
}

function calculateBowlingFirstNRR(yourTeam, oppositionTeam, extraRuns, extraOvers) {

    let selectedTeam = getTeamStats(yourTeam);
    let currentNRR = getTeamStats(oppositionTeam);
    currentNRR = currentNRR.NRR
    const minOversAdjustment = 0.8;

    const updatedConcededRuns = selectedTeam.concededRuns + extraRuns;
    const updatedConcededOvers = selectedTeam.concededOvers + extraOvers;
    const updatedTotalRunsScored = selectedTeam.totalRuns + extraRuns;

    const opponentRunRate = updatedConcededRuns / updatedConcededOvers;
    const combinedRunRate = currentNRR + opponentRunRate;
    const requiredOversToAchieveTarget = updatedTotalRunsScored / combinedRunRate;

    let oversDifference = requiredOversToAchieveTarget.toFixed(1) - selectedTeam.totalOvers;
    oversDifference = formatOvers(oversDifference)

    const minOverDiffance = parseInt(oversDifference) - minOversAdjustment

    const minAdjustedOvers = selectedTeam.totalOvers + (parseInt(oversDifference) - minOversAdjustment);
    const maxAdjustedOvers = selectedTeam.totalOvers + (parseInt(oversDifference));


    const runRateForMinOvers = updatedTotalRunsScored / minAdjustedOvers;
    const concededRunRate = updatedConcededRuns / updatedConcededOvers;
    const finalRunRateDifference = runRateForMinOvers - concededRunRate;
    const runRateForMaxOvers = updatedTotalRunsScored / maxAdjustedOvers;
    const correctedRunRateDifference = runRateForMaxOvers.toFixed(2) - (updatedConcededRuns / updatedConcededOvers).toFixed(2);

    
    const minRunRate = (selectedTeam.NRR + 0) + parseFloat(correctedRunRateDifference.toFixed(2));
    const maxRunRate = (selectedTeam.NRR + 0) + parseFloat(finalRunRateDifference.toFixed(2));

    return {
        "message": `${yourTeam} need to chase 120 runs between ${minOverDiffance} and ${oversDifference} overs.`,
        "revisedNRR": `Revised NRR ${yourTeam} will be between ${minRunRate.toFixed(3)} to ${maxRunRate.toFixed(3)}.`
    };
}

function calculateNRRForPosition({ yourTeam, oppositionTeam, matchOvers, desiredPosition, tossResult, runsInput }) {
    if(desiredPosition){
        let yourStats = getTeamStats(yourTeam);
        let targetTeam = getTargetTeam(desiredPosition);
        if(desiredPosition === yourStats.pos) throw new Error(`your position already is  ${targetTeam.pos}.`);
        if(yourStats.pos<desiredPosition) throw new Error(`your point  already is  ${targetTeam.Pts} you can no go this position.`);
        if(targetTeam.Pts !== yourStats.Pts+2) throw new Error(`you can not achive this postion becouse your points is to low ${yourStats.pos}.`);
    }

    let result;
    if (tossResult === "Batting First") {
        result = calculateBattingFirstNRR(yourTeam, oppositionTeam, runsInput, matchOvers);
        return result;
    } else if (tossResult === "Bowling First") {
        result = calculateBowlingFirstNRR(yourTeam, oppositionTeam, runsInput, matchOvers);
        return result
    } else {
        throw new Error("Invalid toss result.");
    }
}

module.exports = { calculateNRRForPosition };