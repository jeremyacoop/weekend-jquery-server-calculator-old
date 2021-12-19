console.log('js');

$(document).ready(handleReady);

let numOperator = '';

function handleReady() {
    console.log('jQuery is ready');
    $('#calc-solve').on('click', collectData);
    $('#clear-input').on('click', clearInputs);
}

// function getOperator(value) {
//    value.preventDefault();    
//    console.log('in getOperator');
//    let numOperator = value;
//    console.log(numOperator);
//    return numOperator;
// }

function collectData(event) {
    event.preventDefault();
    console.log('in collectData');
    console.log($('#first-number').val());
    console.log(document.getElementById('calc-add').clicked === true);
    //if($('.number-input').val() === '') {
    if($('#first-number').val() === '' || $('#second-number').val() === '') {
        alert('Missing number');
    // } else if($('.number-input').val() === NaN) {
    } else if($('#first-number').val() === NaN || $('#second-number').val() === NaN) {
        alert('Input must be a number');
    }
    // get operator
    if(document.getElementById('calc-add').clicked === true) {
        console.log('clickeez');
    } 
    let numOperator = $('#number-operator').val();
    numOperator = '';

    let numOne = $('#first-number').val();
    let numTwo = $('#second-number').val();
    let numData = {
        numberOne: numOne,
        numberTwo: numTwo,
        operator: numOperator,
        solution: 0
    }
    return numData;
}

function sendMathProblem(problemToSend) {
    console.log('in sendMathProblem');
    console.log(problemToSend);
    $.ajax({
        url: '/calculator',
        method: 'POST',
        data: problemToSend
        }).then(function (response) {
            getMathSolution();
        }).catch( function(err) {
            alert('Couldn\'t send data');
        });
}

function getMathSolution() {
    console.log('in getMathSolution');
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then( function(response) {
        $('#solution-here').empty();
        $('#solution-here').append(response[response.length-1].solution);
    }).catch(function(err) {
        alert('Server unable to respond');
    })
}

function clearInputs() {
    // $('.number-input').val('');
    $('#first-number').val('');
    $('#second-number').val('');
    $('.number-operator').off();
}

/* {
    numOne: numOne,
    operator: operator,
    numTwo; numTwo,
    solution: 0
} */