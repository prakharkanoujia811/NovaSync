export const calculateMinTransactions = (balances) => {
  let members = Object.keys(balances)
    .map(name => ({ name, amount: parseFloat(balances[name].toFixed(2)) }))
    .filter(m => Math.abs(m.amount) > 0.01); 

  const instructions = [];

  while (members.length > 1) {
    members.sort((a, b) => a.amount - b.amount);

    let debtor = members[0];
    let creditor = members[members.length - 1];

    let settledAmount = Math.min(Math.abs(debtor.amount), creditor.amount);

    if (settledAmount > 0) {
      instructions.push(`${debtor.name} pays ${creditor.name}  ₹${settledAmount.toFixed(2)}`);
    }

    debtor.amount += settledAmount;
    creditor.amount -= settledAmount;

    members = members.filter(m => Math.abs(m.amount) > 0.01);
  }

  return instructions.length > 0 ? instructions : ["Everything is settled!"];
};
