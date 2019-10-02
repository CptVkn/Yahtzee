// ----- Main JS File ----- \\

// Get DOM Variables
const rollBtn = document.querySelector(".btn");
dice = document.querySelectorAll(".dice");
dsi = document.querySelectorAll(".dice_select_indicator");
scCard = document.querySelectorAll(".scorecard");
showScore = document.getElementById("idShowScore");
showScoreUpper = document.getElementById("idShowScoreUpper");
showScoreLower = document.getElementById("idShowScoreLower");
showScoreBonus = document.getElementById("idBonusScoreUpper");
// Other Variables
var rollCount = 0;
var Score = 0;
var uScore = 0;
var lScore = 0;

// Set Scorecard to empty Select
for (let i = 0; i < scCard.length; i++) {
  scCard[i].prevSelected = false;
}

// Hide Dice Idicator Selector Divs and Initailize isSelected
initailizeDSI();

// Listen for Roll to be clicked
rollBtn.addEventListener("click", onRoll);

//----- Functions onClicks ----- \\
function onRoll(e) {
  e.preventDefault();
  rollCount = rollCount + 1;
  rollBtn.value = "Roll " + rollCount;
  //console.log(rollCount);

  // If rollCount = 1 enable dice and score select
  if (rollCount === 1) {
    enable_diceEventListener();
    enable_scCardEventListener();
  }

  // Get Random Dice
  for (let i = 0; i < dsi.length; i++) {
    //console.log(dsi[i].isSelected);
    if (dsi[i].isSelected === false) {
      dice[i].Value = Math.floor(Math.random() * 6) + 1;
      dice[i].innerText = dice[i].Value;
    } else {
      /*do Nothing*/
    }
  }

  // Max Number of Rolls Per Turn
  if (rollCount === 3) {
    // Disable Roll Button Until Scorecard Option is Choosen
    rollBtn.removeEventListener("click", onRoll);
    //console.log("Out OF ROLLS");
  } else {
    /*Do Nothing*/
  }
}

function onDiceSelect(e) {
  let i = this.originalindex;

  //dsi[i].style.visibility = 'visible';
  if (dsi[i].style.visibility == "hidden") {
    dsi[i].isSelected = true;
    dsi[i].style.visibility = "visible";
  } else {
    dsi[i].isSelected = false;
    dsi[i].style.visibility = "hidden";
  }

  // -- Test to check variable are working correctly -- \\
  //console.log(e);
  //console.log(i);
  //console.log(dsi[i].isSelected);
}

function onScorecardSelect(e) {
  i = this.originalindex;
  tmpScore = 0;

  switch (i) {
    case 0:
      tmpScore = scOnes();
      uScore = uScore + tmpScore;
      Score = Score + tmpScore;
      scCard[0].style.backgroundColor = "red";
      scCard[0].prevSelected = true;
      break;
    case 1:
      tmpScore = scTwos();
      uScore = uScore + tmpScore;
      Score = Score + tmpScore;
      scCard[1].style.backgroundColor = "red";
      scCard[1].prevSelected = true;
      break;
    case 2:
      tmpScore = scThrees();
      uScore = uScore + tmpScore;
      Score = Score + tmpScore;
      scCard[2].style.backgroundColor = "red";
      scCard[2].prevSelected = true;
      break;
    case 3:
      tmpScore = scFours();
      uScore = uScore + tmpScore;
      Score = Score + tmpScore;
      scCard[3].style.backgroundColor = "red";
      scCard[3].prevSelected = true;
      break;
    case 4:
      tmpScore = scFives();
      uScore = uScore + tmpScore;
      Score = Score + tmpScore;
      scCard[4].style.backgroundColor = "red";
      scCard[4].prevSelected = true;
      break;
    case 5:
      tmpScore = scSixes();
      uScore = uScore + tmpScore;
      Score = Score + tmpScore;
      scCard[5].style.backgroundColor = "red";
      scCard[5].prevSelected = true;
      break;
    case 6:
      tmpScore = scThree_Of_A_Kind();
      lScore = lScore + tmpScore;
      Score = Score + tmpScore;
      scCard[6].style.backgroundColor = "red";
      scCard[6].prevSelected = true;
      break;
    case 7:
      tmpScore = scFour_Of_A_Kind();
      lScore = lScore + tmpScore;
      Score = Score + tmpScore;
      scCard[7].style.backgroundColor = "red";
      scCard[7].prevSelected = true;
      break;
    case 8:
      tmpScore = scFullHouse();
      lScore = lScore + tmpScore;
      Score = Score + tmpScore;
      scCard[8].style.backgroundColor = "red";
      scCard[8].prevSelected = true;
      break;
    case 9:
      tmpScore = scSmall_Straight();
      lScore = lScore + tmpScore;
      Score = Score + tmpScore;
      scCard[9].style.backgroundColor = "red";
      scCard[9].prevSelected = true;
      break;
    case 10:
      tmpScore = scLarge_Straight();
      lScore = lScore + tmpScore;
      Score = Score + tmpScore;
      scCard[10].style.backgroundColor = "red";
      scCard[10].prevSelected = true;
      break;
    case 11:
      tmpScore = scChance();
      lScore = lScore + tmpScore;
      Score = Score + tmpScore;
      scCard[11].style.backgroundColor = "red";
      scCard[11].prevSelected = true;
      break;
    case 12:
      tmpScore = scYahtzee();
      lScore = lScore + tmpScore;
      Score = Score + tmpScore;
      scCard[12].style.backgroundColor = "red";
      scCard[12].prevSelected = true;
      break;

    default:
      console.log("error");
      break;
  }

  Score = Score + scUpper();
  showScoreUpper.innerText = uScore;
  showScoreLower.innerText = lScore;
  showScore.innerText = Score;
  console.log(Score);

  // Initailize Selectors, Scorecard and rollCount
  rollCount = 0;
  rollBtn.value = "Roll " + rollCount;
  initailizeDSI();
  disable_diceEventListener();
  disable_scCardEventListener();
  rollBtn.addEventListener("click", onRoll);

  //console.log("Im in the ScoreCard");
  //console.log(i);
}

// ----- Scoring Functions ----- \\

function scUpper() {
  check = true;
  for (let i = 0; i < 5; i++) {
    if (scCard[i].prevSelected !== true) {
      check = false;
    } else {
      /* Do Nothing */
    }
  }
  if (check === true) {
    if (uScore >= 63) {
      showScoreBonus.style.display = "inline";
      return 35;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}
function scOnes() {
  let tmpScore = 0;
  for (let tmp = 0; tmp < 5; tmp++) {
    if (dice[tmp].Value === 1) {
      tmpScore = tmpScore + 1;
    } else {
      /*Do Nothing*/
    }
  }
  return tmpScore;
}
function scTwos() {
  let tmpScore = 0;
  for (let tmp = 0; tmp < 5; tmp++) {
    if (dice[tmp].Value === 2) {
      tmpScore = tmpScore + 2;
    } else {
      /*Do Nothing*/
    }
  }
  return tmpScore;
}
function scThrees() {
  let tmpScore = 0;
  for (let tmp = 0; tmp < 5; tmp++) {
    if (dice[tmp].Value === 3) {
      tmpScore = tmpScore + 3;
    } else {
      /*Do Nothing*/
    }
  }
  return tmpScore;
}
function scFours() {
  let tmpScore = 0;
  for (let tmp = 0; tmp < 5; tmp++) {
    if (dice[tmp].Value === 4) {
      tmpScore = tmpScore + 4;
    } else {
      /*Do Nothing*/
    }
  }
  return tmpScore;
}
function scFives() {
  let tmpScore = 0;
  for (let tmp = 0; tmp < 5; tmp++) {
    if (dice[tmp].Value === 5) {
      tmpScore = tmpScore + 5;
    } else {
      /*Do Nothing*/
    }
  }
  return tmpScore;
}
function scSixes() {
  let tmpScore = 0;
  for (let tmp = 0; tmp < 5; tmp++) {
    if (dice[tmp].Value === 6) {
      tmpScore = tmpScore + 6;
    } else {
      /*Do Nothing*/
    }
  }
  return tmpScore;
}
function scThree_Of_A_Kind() {
  let tmpScore = 0;
  let check = 1;

  let sDice = [].slice.call(dice).sort(function(a, b) {
    return a.textContent > b.textContent ? 1 : -1;
  });

  //console.log(sDice);
  let tmp = 0;
  while (tmp < 4) {
    if (sDice[tmp].Value === sDice[tmp + 1].Value) {
      check = check + 1;
    } else {
      check = 1;
    }

    if (check === 3) {
      break;
    }
    tmp++;
  }

  //console.log(check);
  // If Three Where Same return score of added Dice
  if (check >= 3) {
    for (let tmp = 0; tmp < 5; tmp++) {
      tmpScore = tmpScore + dice[tmp].Value;
    }
    return tmpScore;
  } else {
    return 0;
  }
}
function scFour_Of_A_Kind() {
  let tmpScore = 0;
  let check = 1;

  let sDice = [].slice.call(dice).sort(function(a, b) {
    return a.textContent > b.textContent ? 1 : -1;
  });

  //console.log(sDice);
  let tmp = 0;
  while (tmp < 4) {
    if (sDice[tmp].Value === sDice[tmp + 1].Value) {
      check = check + 1;
    } else {
      check = 1;
    }

    if (check === 4) {
      break;
    }
    tmp++;
  }

  //console.log(check);
  // If Four Where Same return score of added Dice
  if (check >= 4) {
    for (let tmp = 0; tmp < 5; tmp++) {
      tmpScore = tmpScore + dice[tmp].Value;
    }
    return tmpScore;
  } else {
    return 0;
  }
}
function scFullHouse() {
  let check = 1;

  let sDice = [].slice.call(dice).sort(function(a, b) {
    return a.textContent > b.textContent ? 1 : -1;
  });

  //console.log(sDice);
  let tmp = 0;
  while (tmp < 4) {
    if (sDice[tmp].Value != sDice[tmp + 1].Value) {
      check = check + 1;
    } else {
      /*DO Nothing*/
    }

    if (check === 3) {
      break;
    }
    tmp++;
  }

  //console.log(check);
  // If Full House is True
  if (check === 2) {
    return 25;
  } else {
    return 0;
  }
}
function scSmall_Straight() {
  let check = 1;

  let sDice = [].slice.call(dice).sort(function(a, b) {
    return a.textContent > b.textContent ? 1 : -1;
  });

  //console.log(sDice);
  let tmp = 0;
  while (tmp < 4) {
    //console.log(sDice[tmp].Value); console.log( '===' ); console.log( sDice[tmp+1].Value );
    if (sDice[tmp].Value + 1 === sDice[tmp + 1].Value) {
      check = check + 1;
    } else if (sDice[tmp].Value === sDice[tmp + 1].Value) {
      /* Do Nothing*/
    } else {
      check = 1;
    }

    if (check === 4) {
      break;
    }
    tmp++;
  }

  //console.log(check);
  // If Three Where Same return score of added Dice
  console.log(check);
  if (check >= 4) {
    return 30;
  } else {
    return 0;
  }
}
function scLarge_Straight() {
  let check = 1;

  let sDice = [].slice.call(dice).sort(function(a, b) {
    return a.textContent > b.textContent ? 1 : -1;
  });

  //console.log(sDice);
  let tmp = 0;
  while (tmp < 4) {
    //console.log(sDice[tmp].Value); console.log( '===' ); console.log( sDice[tmp+1].Value );
    if (sDice[tmp].Value + 1 === sDice[tmp + 1].Value) {
      check = check + 1;
    } else {
      /*else if(sDice[tmp].Value === sDice[tmp+1].Value) 
            {
             // Do Nothing
            }
        */
      check = 1;
    }

    if (check === 5) {
      break;
    }
    tmp++;
  }

  //console.log(check);
  // If Three Where Same return score of added Dice
  console.log(check);
  if (check >= 5) {
    return 40;
  } else {
    return 0;
  }
}
function scChance() {
  let tmpScore = 0;
  for (let tmp = 0; tmp < 5; tmp++) {
    tmpScore = tmpScore + dice[tmp].Value;
  }
  return tmpScore;
}
function scYahtzee() {
  let check = 1;
  for (let tmp = 0; tmp < 4; tmp++) {
    if (dice[tmp].Value != dice[tmp + 1].Value) {
      check = 0;
    } else {
      /*Do Nothing*/
    }
  }

  // If all where the same return 50 points
  if (check === 1) {
    return 50;
  }
  // else no score given
  else {
    return 0;
  }
}

// ----- Other  Functions ----- \\
function initailizeDSI() {
  for (let i = 0; i < dsi.length; i++) {
    dsi[i].style.visibility = "hidden";
    dsi[i].isSelected = false;
    dice[i].innerText = 0;
  }
}
function enable_diceEventListener() {
  for (let i = 0; i < dice.length; i++) {
    dice[i].originalindex = i;
    dice[i].addEventListener("click", onDiceSelect);
  }
}
function enable_scCardEventListener() {
  for (let i = 0; i < scCard.length; i++) {
    if (scCard[i].prevSelected === false) {
      scCard[i].originalindex = i;
      scCard[i].addEventListener("click", onScorecardSelect);
    } else {
      /*Do Nothing*/
    }
  }
}
function disable_diceEventListener() {
  for (let i = 0; i < dice.length; i++) {
    dice[i].originalindex = i;
    dice[i].removeEventListener("click", onDiceSelect);
    dice[i].innerText = 0;
  }
}
function disable_scCardEventListener() {
  for (let i = 0; i < scCard.length; i++) {
    scCard[i].originalindex = i;
    scCard[i].removeEventListener("click", onScorecardSelect);
  }
}
