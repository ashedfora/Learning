"use strict"
function operate(a , b, op) {
    switch(op){
        case '/':
            return a/b;
        case '*':
            return a*b;
        case '+':
            return a+b;
        default:
            return a-b
    }
}
function myeval(expr) {
    const operands = [];
    const operators = [];
    let num =  '';
    for(let ch of expr) {
        if(ch >= '0' && ch <= '9') {
            num += ch;
            continue;
        }
        help(operators, operands, num);
        num = '';
        operators.push(ch)
    }
    help(operators, operands, num);
    let ans = operands[0];
    for(let i in operators) {
        ans = operate(Number(ans), Number(operands[Number(i)+1]), operators[i]);
    }
    return ans;
}
console.log(myeval("2*4/2+6-9*0"));

function help(operators, operands, num) {
    operands.push(Number(num));
    while(operators.slice(-1)[0] === '/' || operators.slice(-1)[0] === '*' ) {
        let b = operands.pop();
        let a = operands.pop();
        let operator = operators.pop();
        operands.push(operate(a, b, operator));
    }
}