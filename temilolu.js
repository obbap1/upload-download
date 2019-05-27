function strCalculate(value) {
    const newArray = value.split('');
    console.log(newArray);

    const alphabets = newArray.filter(x => isNaN(Number(x)));
    console.log(alphabets);
    let numbers = newArray.filter(x => !isNaN(Number(x)));
    console.log(numbers);
    numbers = numbers.join(',');
    return alphabets.length === Number(numbers) ? true : false;
}

console.log(strCalculate("cup32"));