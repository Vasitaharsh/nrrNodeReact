const teamData = [
    { Team: "Chennai Super Kings", totalRuns: 1130, totalOvers: 133.1, concededRuns: 1071, concededOvers: 138.5, Matches: 7, Won: 5, Lost: 2, Pts: 10, NRR:0.771 },
    { Team: "Royal Challengers Bangalore", totalRuns: 1217, totalOvers: 140, concededRuns: 1066, concededOvers: 131.4, Matches: 7, Won: 4, Lost: 3, Pts: 8, NRR:0.597},
    { Team: "Delhi Capitals", totalRuns: 1085, totalOvers: 126, concededRuns: 1136, concededOvers: 137, Matches: 7, Won: 4, Lost: 3, Pts: 8, NRR:0.319 },
    { Team: "Rajasthan Royals", totalRuns: 1066, totalOvers: 128.2, concededRuns: 1094, concededOvers: 137.1, Matches: 7, Won: 3, Lost: 4, Pts: 6,NRR:0.331 },
    { Team: "Mumbai Indians", totalRuns: 1003, totalOvers: 155.2, concededRuns: 1134, concededOvers: 138.1, Matches: 8, Won: 2, Lost: 6, Pts: 4,NRR:-1.75 }
];

const selectedTeam = teamData[3];
const run = 120;
// Updated statistics after adding new runs and overs
const updatedTotalRuns = selectedTeam.totalRuns + 120;
const updatedTotalOvers = selectedTeam.totalOvers + 20;
const opponentRunRate = 0.597;
const updatedConcededOvers = selectedTeam.concededOvers + 20;

// Calculating new run rate
const updatedRunRate = updatedTotalRuns / updatedTotalOvers;
const adjustedRunRate = updatedRunRate - opponentRunRate;
const projectedConcededRuns = adjustedRunRate * updatedConcededOvers;
const updatedConcededRuns = projectedConcededRuns - selectedTeam.concededRuns;

console.log(updatedConcededRuns.toFixed(0));
console.log("------------------------------------ RUN RATE");

console.log("Updated Total Runs:", updatedTotalRuns);
console.log("Updated Total Overs:", updatedTotalOvers);
console.log("conscrn run", selectedTeam.concededRuns);

const finalConcededRunsmin = parseInt(selectedTeam.concededRuns) + parseInt(updatedConcededRuns.toFixed(0))-2;
const finalConcededRunsmax = parseInt(selectedTeam.concededRuns) + parseInt(updatedConcededRuns.toFixed(0));
console.log("Final Conceded Runs:", finalConcededRunsmin);
console.log("Final Conceded Runs:", finalConcededRunsmax);
console.log("Updated Conceded Overs:", updatedConcededOvers);

const finalEconomyRatemin = finalConcededRunsmin / updatedConcededOvers;
const netRunRateDifferencemin = updatedRunRate - finalEconomyRatemin;
console.log("Net Run Rate Difference:", netRunRateDifferencemin.toFixed(2));


const finalEconomyRatemax = finalConcededRunsmax / updatedConcededOvers;
const netRunRateDifferencemax = updatedRunRate - finalEconomyRatemax;
console.log("Net Run Rate Difference:", netRunRateDifferencemax.toFixed(2));


// Extracting updated run calculation
const updatedRun = updatedConcededRuns.toFixed(0);
console.log("Updated Run Calculation:", updatedRun);
console.log(netRunRateDifferencemax);

console.log(`If Rajasthan Royals score ${run} runs in 20 overs, Rajasthan Royals need to restrict Delhi Capitals between ${updatedConcededRuns.toFixed(0)-2} to ${updatedConcededRuns.toFixed(0)} runs in 20`);
console.log(`Revised NRR of Rajasthan Royals will be between    ${netRunRateDifferencemax.toFixed(2)} to ${netRunRateDifferencemin.toFixed(2)}.`);

console.log("if other team can choose first batting this logic i am create ");


// const selectedTeam1 = teamData[3];
// const RunRate = 0.319;
// const conscrnRun = selectedTeam1.concededRuns + 119;
// const conscrnOver = selectedTeam1.concededOvers + 20;
// const totalrunConsern = selectedTeam1.totalRuns + 119;


// const conscrnAns = conscrnRun / conscrnOver;
// console.log(conscrnAns);

// const totalRunrateAndconscrnAns = RunRate + conscrnAns;
// console.log(totalRunrateAndconscrnAns);

// const divideOver = totalrunConsern / totalRunrateAndconscrnAns;
// console.log(divideOver);

// const finalAndforOpponent = divideOver - selectedTeam1.totalOvers;
// console.log(finalAndforOpponent.toFixed(1));
// console.log(finalAndforOpponent.toFixed(1)- 0.9);


// console.log("find nrr for oppentteam");
// const totalRunAdd = selectedTeam1.totalRuns + 119;
// console.log(totalRunAdd);

// const totalOverAdd = selectedTeam1.concededRuns + 119;
// console.log(totalOverAdd);

// const totalRunConsern = selectedTeam1.concededOvers + 20;
// const minVal = 0.9
// const newOverFaceMin = selectedTeam1.totalOvers+ (finalAndforOpponent.toFixed(1) - minVal);
// console.log("finalAndforOpponent.toFixed(1)",finalAndforOpponent.toFixed(1));
// console.log("selectedTeam1.totalOvers",selectedTeam1.totalOvers);

// const newOverFaceMax = selectedTeam1.totalOvers + parseFloat(finalAndforOpponent.toFixed(1));

// console.log("newOverFaceMax", newOverFaceMax);

// const totalRunAddnewOverFaceMin = totalRunAdd/newOverFaceMin;


// console.log("totalOverAdd", totalOverAdd);
// console.log("totalRunConsern",totalRunConsern);

// const totalOverAddtotalRunConsern = totalOverAdd/totalRunConsern;
// console.log(totalOverAddtotalRunConsern);


// const totalRunAddnewOverFaceMintotalOverAddtotalRunConsern = totalRunAddnewOverFaceMin - totalOverAddtotalRunConsern;
// console.log(totalRunAddnewOverFaceMintotalOverAddtotalRunConsern);


// console.log("maxover in how to work ");
// console.log(newOverFaceMax.toFixed(1));

// console.log("totalOverAdd", totalOverAdd);
// console.log("newOverFaceMax", newOverFaceMax);

// const maxOverRun  = totalRunAdd/newOverFaceMax;
// console.log(maxOverRun.toFixed(2));

// console.log("totalRunAdd",totalRunAdd);
// console.log("maxOverRun",maxOverRun);

// const err = totalOverAdd/totalRunConsern;

// const gotEelemet = maxOverRun.toFixed(2) - err.toFixed(2);
// console.log(err.toFixed(2));
// console.log(gotEelemet.toFixed(2));


// const teamData = [
//     { Team: "Chennai Super Kings", totalRuns: 1130, totalOvers: 133.1, concededRuns: 1071, concededOvers: 138.5, Matches: 7, Won: 5, Lost: 2, Pts: 10 },
//     { Team: "Royal Challengers Bangalore", totalRuns: 1217, totalOvers: 140, concededRuns: 1066, concededOvers: 131.4, Matches: 7, Won: 4, Lost: 3, Pts: 8 },
//     { Team: "Delhi Capitals", totalRuns: 1085, totalOvers: 126, concededRuns: 1136, concededOvers: 137, Matches: 7, Won: 4, Lost: 3, Pts: 8 },
//     { Team: "Rajasthan Royals", totalRuns: 1066, totalOvers: 128.2, concededRuns: 1094, concededOvers: 137.1, Matches: 7, Won: 3, Lost: 4, Pts: 6 },
//     { Team: "Mumbai Indians", totalRuns: 1003, totalOvers: 155.2, concededRuns: 1134, concededOvers: 138.1, Matches: 8, Won: 2, Lost: 6, Pts: 4 }
// ];

// Selecting Rajasthan Royals for calculation





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


function getTeamStats(teamName) {
    return teamData.find(team => team.Team === teamName) || null;
}

// function calculateBowlingFirstNRR(yourTeam,oppositionTeam,desiredPosition, extraRuns, extraOvers) {

    
// let selectedTeam = getTeamStats(yourTeam);
// console.log(selectedTeam);

// let currentNRR = getTeamStats(oppositionTeam);
// console.log(currentNRR);

// currentNRR = currentNRR.NRR
// const minOversAdjustment = 0.8;
//     // const selectedTeam = teamData[teamIndex];
//     // const currentNRR = teamData[teamIndex-1].NRR;

    
//     const updatedConcededRuns = selectedTeam.concededRuns + extraRuns;
//     const updatedConcededOvers = selectedTeam.concededOvers + extraOvers;
//     const updatedTotalRunsScored = selectedTeam.totalRuns + extraRuns;

//     const opponentRunRate = updatedConcededRuns / updatedConcededOvers;
//     const combinedRunRate = currentNRR + opponentRunRate;
//     const requiredOversToAchieveTarget = updatedTotalRunsScored / combinedRunRate;
//     console.log("requiredOversToAchieveTarget", requiredOversToAchieveTarget.toFixed(1));
//     console.log("selectedTeam.totalOvers;", selectedTeam.totalOvers);
    
//     let oversDifference = requiredOversToAchieveTarget.toFixed(1) - selectedTeam.totalOvers;
//     oversDifference = formatOvers(oversDifference)
//     console.log("oversDifference", oversDifference);
    
//     const minOverDiffance = parseInt(oversDifference) - minOversAdjustment
//     console.log(minOverDiffance);
    
// console.log(oversDifference);

// console.log("parseInt(oversDifference.toFixed(1)",parseInt(oversDifference));
// console.log("selectedTeam.totalOvers", selectedTeam.totalOvers);


   
//     const minAdjustedOvers = selectedTeam.totalOvers + (parseInt(oversDifference) - minOversAdjustment);
//     const maxAdjustedOvers = selectedTeam.totalOvers + (parseInt(oversDifference));
// console.log(minAdjustedOvers);
// console.log(maxAdjustedOvers);


//     const runRateForMinOvers = updatedTotalRunsScored / minAdjustedOvers;
//     const concededRunRate = updatedConcededRuns / updatedConcededOvers;

//     const finalRunRateDifference = runRateForMinOvers - concededRunRate;

//     const runRateForMaxOvers = updatedTotalRunsScored / maxAdjustedOvers;
//     const correctedRunRateDifference = runRateForMaxOvers.toFixed(2) - (updatedConcededRuns / updatedConcededOvers).toFixed(2);

//     return {
//         minOver:minOverDiffance,
//         maxOver:oversDifference,
//         minMumRunrat: correctedRunRateDifference.toFixed(2),
//         maxmunRunrat: finalRunRateDifference.toFixed(2)
//     };
// }

// // Example usage:
// const yourTeam = "Rajasthan Royals";
// const oppositionTeam = "Royal Challengers Bangalore";
// const matchOvers = 20;
// const desiredPosition = 3;
// const tossResult = "Batting First";
// const runsInput = 79
// let result


// if(tossResult === 'Batting First'){
//     result = calculateBowlingFirstNRR(yourTeam,oppositionTeam,desiredPosition, runsInput, matchOvers);
// }else{
    
//  result = calculateBowlingFirstNRR(yourTeam,oppositionTeam,desiredPosition, runsInput, matchOvers);
// }



function calculateBattingFirstNRR(yourTeam,oppositionTeam,desiredPosition , run, overs) {

        
let selectedTeam = getTeamStats(yourTeam);

let opponentRunRate = getTeamStats(oppositionTeam);

opponentRunRate = opponentRunRate.NRR

    // Updated statistics after adding new runs and overs
    const updatedTotalRuns = selectedTeam.totalRuns + run;
    const updatedTotalOvers = selectedTeam.totalOvers + overs;
    const updatedConcededOvers = selectedTeam.concededOvers + overs;
    console.log(updatedConcededOvers);
    

    // Calculating new run rate
    const updatedRunRate = updatedTotalRuns / updatedTotalOvers;
    const adjustedRunRate = updatedRunRate - opponentRunRate;
    const projectedConcededRuns = adjustedRunRate * updatedConcededOvers;
    const updatedConcededRuns = projectedConcededRuns - selectedTeam.concededRuns;

    // Calculating final conceded runs range
    console.log("selectedTeam.concededRuns",selectedTeam.concededRuns);
    console.log("updatedConcededRuns.toFixed(0)", updatedConcededRuns.toFixed(0));
    
    
    const finalConcededRunsMin = selectedTeam.concededRuns + parseInt(updatedConcededRuns.toFixed(0)) - 8;
    const finalConcededRunsMax = selectedTeam.concededRuns + parseInt(updatedConcededRuns.toFixed(0));
console.log("finalConcededRunsMin", finalConcededRunsMin);
console.log("finalConcededRunsMax", finalConcededRunsMax);


    // Calculating final economy rate
    const finalEconomyRateMin = finalConcededRunsMin / updatedConcededOvers;
    const netRunRateDifferenceMin = updatedRunRate - finalEconomyRateMin;

    const finalEconomyRateMax = finalConcededRunsMax / updatedConcededOvers;
    const netRunRateDifferenceMax = updatedRunRate - finalEconomyRateMax;

return{
    message: `If Rajasthan Royals score ${run} runs in ${overs} overs, they need to restrict Delhi Capitals between ${updatedConcededRuns.toFixed(0)-8} to ${updatedConcededRuns.toFixed(0)} runs in ${overs} overs.`,
    revisedNRR :`Revised NRR of Rajasthan Royals will be between ${netRunRateDifferenceMax.toFixed(2)} to ${netRunRateDifferenceMin.toFixed(2)}.`
}
}

 function calculateBowlingFirstNRR(yourTeam,oppositionTeam,desiredPosition, extraRuns, extraOvers) {

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
    
        return {
            "message": `${yourTeam} need to chase 120 runs between ${minOverDiffance} and ${oversDifference} overs.`,
            "revisedNRR": `Revised NRR ${yourTeam} will be between ${correctedRunRateDifference.toFixed(2)} to ${finalRunRateDifference.toFixed(2)}.`
        };
    }
    
    // Example usage:
    const yourTeam = "Rajasthan Royals";
    const oppositionTeam = "Delhi Capitals";
    const matchOvers = 20;
    const desiredPosition = 3;
    const tossResult = "Bolling First";
    const runsInput = 120
    let result
    
    
    if(tossResult === 'Batting First'){
        result = calculateBattingFirstNRR(yourTeam,oppositionTeam,desiredPosition,runsInput,matchOvers);
    }else{
        
     result = calculateBowlingFirstNRR(yourTeam,oppositionTeam,desiredPosition, runsInput, matchOvers);
    }

// const yourTeam = "Rajasthan Royals";
// const oppositionTeam = "Delhi Capitals";
// const matchOvers = 20;
// const desiredPosition = 3;
// const tossResult = "Batting First";
// const runsInput = 120

// const resukt = calculateBowlingFirstNRR(yourTeam,oppositionTeam,desiredPosition,runsInput,matchOvers);
// console.log(resukt);
console.log(result);


