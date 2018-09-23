function suma(a, b)
{
    return a + b;
}
function resta(a, b)
{
    return a - b;
}
function mult(a, b)
{
    return a * b;
}
function div(a, b)
{
    if(b != 0)
        return a / b;
    else
        console.log("No se puede dividir entre 0");
        return Error;
        
}

exports.sum = suma;
exports.res = resta;
exports.mult = mult;
exports.div = div;