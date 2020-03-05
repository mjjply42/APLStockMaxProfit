export const maxProfit = (prices) => {
    let maxProf = [
    {
        id: null,
        start: null, 
        end: null, 
        profit: null
    }
    ];
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            let profit = prices[j].price - prices[i].price;
            if (profit > maxProf[0].profit)
            {
                if (maxProf[0].profit === null)
                {
                    maxProf[0].start =  i;
                    maxProf[0].end =  j; 
                    maxProf[0].profit = profit;
                    maxProf[0].id = 0;
                }
                maxProf = [];
                maxProf.push({start: i, end: j, profit: profit});
            }
            else if (profit === maxProf[0].profit)
                maxProf.push({start: i, end: j, profit: profit});
        }
    }
    return (maxProf);
};

export const maxGains = (profits, data) => {
    let gains = [];
    profits.forEach((item, index) => {
        gains.push({
            id: index,
            buy: {date: data[item.start].date, price: data[item.start].price},
            sell: {date: data[item.end].date, price: data[item.end].price},
            profit: item.profit,
            ideal: false,
            selected: false
        })
    })
    return (gains);
}