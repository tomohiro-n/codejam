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

let makeCounts = (sortedAWithOriginalIndex, K, isLeftToRight) => {
    let indexToStartWith = isLeftToRight ? 0 : sortedAWithOriginalIndex.length - 1;
    let inProgress = sortedAWithOriginalIndex[indexToStartWith].value;
    let result = [0];
    for (let i = 1; i < sortedAWithOriginalIndex.length; i++) {
        let currentIndex = isLeftToRight ? i : sortedAWithOriginalIndex.length - i - 1;
        let isMet = Math.abs(sortedAWithOriginalIndex[currentIndex].value - inProgress) >= K;
        if (isMet) {
            //console.log(`isMet: ${isMet} ${sortedAWithOriginalIndex[currentIndex].value} ${inProgress} ${K} ${sortedAWithOriginalIndex[currentIndex].value - inProgress}`);
            result.push(result[result.length - 1] + 1);
            inProgress = sortedAWithOriginalIndex[currentIndex].value;
        } else {
            //console.log(`isMet: ${isMet} ${sortedAWithOriginalIndex[currentIndex].value} ${inProgress} ${K} ${sortedAWithOriginalIndex[currentIndex].value - inProgress}`);
            result.push(result[result.length - 1]);
        }
    }
    return result;
}

let maxNumElements = (N, K, A) => {
    let AWithOriginalIndex = A.map((x, i) => { return { value: x, index: i }; });
    let sortedAWithOriginalIndex = [...AWithOriginalIndex].sort((a, b) => { return a.value - b.value; });
    let forwardCounts = [...makeCounts(sortedAWithOriginalIndex, K, false)].reverse();
    let backwardCounts = makeCounts(sortedAWithOriginalIndex, K, true);
    let sumCounts = forwardCounts.map((val, i) => { return val + backwardCounts[i] + 1 });
    let result = new Array(N).fill(null);
    for (let i = 0; i < N; i++) {
        //console.log(`result[${sortedAWithOriginalIndex[i].index}] = ${sumCounts[i]}`);
        result[sortedAWithOriginalIndex[i].index] = sumCounts[i];
    };
    return result;
};

let solve = () => {
    let N, K;
    [N, K] = readline().split(' ').map(x => parseInt(x));
    let A = readline().split(' ').map(x => parseInt(x));
    let result = maxNumElements(N, K, A);
    process.stdout.write(String(result.join(' ')) + '\n');
};

let main = () => {
    let T = parseInt(readline());
    for (var testId = 1; testId <= T; testId++) {
        process.stdout.write('Case #' + testId + ': ');
        solve();
    }
};