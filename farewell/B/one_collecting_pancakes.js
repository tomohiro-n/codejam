//----------------------------------------------------------------------
'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();
});

let readline = () => {
    return inputString[currentLine++];
}
//----------------------------------------------------------------------

let calcTotalFromLeft = (numbers) => {
    let result = [];
    let total = 0n;
    for (let i = 0; i < numbers.length; i++) {
        total += BigInt(numbers[i]);
        result.push(total);
    }
    return result;
}

let calcTotalFromOneToRight = (totalFromLeft) => {
    let result = [];
    let len = totalFromLeft.length;
    for (let i = 0; i < len; i++) {
        result.push(totalFromLeft[len - 1] - (i > 0 ?  totalFromLeft[i - 1] : 0n));
    }
    return result;
}

let calcMins = (totalFromLeft, totalFromOneToRight) => {
    let result = [];
    for (let i = 0; i < totalFromLeft.length; i++) {
        result.push(totalFromLeft[i] > totalFromOneToRight[i] ? totalFromOneToRight[i] : totalFromLeft[i]);
    }
    return result;
}

let calcOptimal = (N, stacks, la, ra, lb, rb) => {
    if (ra <= lb) {
        //console.log("a");
        return stacks.slice(0, ra + ((lb - ra) / 2)).reduce((a, b) => BigInt(a) + BigInt(b));
    }
    if (la >= rb) {
        //console.log("b");
        return stacks.slice((la - 1) - Math.floor((la - rb) / 2)).reduce((a, b) => BigInt(a) + BigInt(b));
    }
    let totalFromLeft = calcTotalFromLeft(stacks);
    let totalFromOneToRight = calcTotalFromOneToRight(totalFromLeft);
    let mins = calcMins(totalFromLeft, totalFromOneToRight);
    if (lb < la && ra < rb) {
        //console.log("c");
        return mins.slice(la - 1, ra).reduce((m, e) => e > m ? e : m);
    }
    if (la <= lb && rb <= ra) {
        //console.log("d");
        return [
            totalFromLeft[lb - 1],
            totalFromOneToRight[rb - 1],
            mins.slice(lb - 1, rb).reduce((m, e) => e > m ? e : m)
        ].reduce((m, e) => e > m ? e : m);
    }
    if (la <= lb && ra < rb) {
        //console.log("e");
        return [
            totalFromLeft[lb - 1],
            mins.slice(lb - 1, ra).reduce((m, e) => e > m ? e : m)
        ].reduce((m, e) => e > m ? e : m);

    }
    if (la > lb && ra >= rb) {
        //console.log("f");
        return [
            totalFromOneToRight[rb - 1],
            mins.slice(la - 1, rb).reduce((m, e) => e > m ? e : m)
        ].reduce((m, e) => e > m ? e : m);

    }
    return "IMPOSSIBLE";
}

let solve = () => {
    let N = BigInt(readline());
    let stacks = readline().split(' ').map(x => parseInt(x));
    let la, ra, lb, rb;
    [la, ra, lb, rb] = readline().split(' ').map(x => parseInt(x));
    let result = calcOptimal(N, stacks, la, ra, lb, rb);
    process.stdout.write(String(result) + '\n');
}

let main = () => {
    let T = parseInt(readline());
    for (var testId = 1; testId <= T; testId++) {
        process.stdout.write('Case #' + testId + ': ');
        solve();
    }
}