const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('server up on port', PORT);
    });

let mathStatement = {};
let mathSolution = 0;
let calcHistory = [];

function mathCalculate(mathProblem) {
    if(mathProblem.operator == '+') {
        mathProblem.solution = mathProblem.numOne + mathProblem.numTwo;
    }else if(mathProblem.operator == '-') {
        mathProblem.solution = mathProblem.numOne - mathProblem.numTwo;
    }else if(mathProblem.operator == '*') {
        mathProblem.solution = mathProblem.numOne * mathProblem.numTwo;
    }else if(mathProblem.operator == '/') {
        mathProblem.solution = mathProblem.numOne / mathProblem.numTwo;
    }
    console.log(mathProblem.solution);
    return mathProblem;
}

app.post('/calculator', (req, res) => {
    console.log('in /calculator POST', req.body);
    mathStatement = req.body;
    mathCalculate(mathStatement);
    calcHistory.push(mathStatement);
    console.log(historyArray);
    res.sendStatus(201);
});

app.get('/calculator', (req, res) => {
    console.log('in /calculator GET');
    console.log(calcHistory);
    res.send(calcHistory);
});