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

let makePairs = (wheelNums, N) => {
    let pairs = [];
    for (let i = 0; i < Math.floor(wheelNums.length / 2); i++) {
        pairs.push({
            a: wheelNums[i] == N ? 0 : wheelNums[i],
            b: wheelNums[wheelNums.length - 1 - i] == N ? 0 : wheelNums[wheelNums.length - 1 - i]
        });
    }
    return pairs
};

let x, y;

let gcdExtended = (a, b) => {
      
    // Base Case
    if (a == 0)
    {
        x = 0;
        y = 1;
        return b;
    }
      
    // To store results of recursive call   
    let gcd = gcdExtended(b % a, a);
    let x1 = x;
    let y1 = y;
 
    // Update x and y using results of recursive
    // call
    x = y1 - Math.floor(b / a) * x1;
    y = x1;
  
    return gcd;
};

let calcMinOps = (W, N, D, wheelNums) => {
    let pairs = makePairs(wheelNums, N);
    let count = 0n;
    let gcd = gcdExtended(D, N);
    for (let i = 0; i < pairs.length; i++) {
        let min = Math.min(pairs[i].a, pairs[i].b);
        let max = Math.max(pairs[i].a, pairs[i].b);
        let diff = max - min;
        let diff2 = N - max + min;
        if (diff % gcd != 0 && diff2 % gcd != 0) {
            count = -1;
            break;
        }
        let NDividedByGcd = BigInt(N / gcd);
        let xmin1 = BigInt(diff) * BigInt(x) / BigInt(gcd) % BigInt(NDividedByGcd)
        let xmin2 = BigInt(diff2) * BigInt(x) / BigInt(gcd) % BigInt(NDividedByGcd)
        let positiveXmin1 = (xmin1 + NDividedByGcd) % NDividedByGcd;
        let positiveXmin2 = (xmin2 + NDividedByGcd) % NDividedByGcd;
        let minOpsToReach = [
            positiveXmin1,
            positiveXmin2
        ].reduce((m, e) => e < m ? e : m);;
        count += minOpsToReach;
    }
    return count;
};

let solve = () => {
    let W, N, D;
    [W, N, D] = readline().split(' ').map(x => parseInt(x));
    let wheelNums = readline().split(' ').map(x => parseInt(x));
    let result = calcMinOps(W, N, D, wheelNums);
    if ( result == -1 ) { result = "IMPOSSIBLE"; }
    process.stdout.write(String(result) + '\n');
};

let main = () => {
    let T = parseInt(readline());
    for (var testId = 1; testId <= T; testId++) {
        process.stdout.write('Case #' + testId + ': ');
        solve();
    }
};