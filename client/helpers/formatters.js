export const formatTransactions = (transactions, campaignTerms) => {
  let raiseAmount = 0; 

  let inDateRange = transactionDate => 
    transactionDate > new Date(campaignTerms.created_at).getTime() && 
    transactionDate < new Date(campaignTerms.closed_at).getTime();

  let validInvestmentAmount = amount => 
    amount <= campaignTerms.max_investment_amount && 
    amount >= campaignTerms.min_investment_amount;

  let belowMaxRaise = (raiseAmount, amount) => 
    raiseAmount + parseInt(amount) < parseInt(campaignTerms.max_raise_amount);

  let belowMinRaise = raiseAmount => 
    raiseAmount < parseInt(campaignTerms.min_raise_amount);

  let formattedTransactions = transactions
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map(transaction => {
      let returnObj = {}; 
      let createdAt = new Date(transaction.created_at).getTime();
      returnObj['id'] = transaction.id;
      returnObj['date'] = createdAt;
      returnObj['investor'] = transaction.investor_id;
      returnObj['amount'] = parseInt(transaction.amount);

      if (inDateRange(createdAt) && 
          validInvestmentAmount(returnObj.amount) && 
          belowMaxRaise(raiseAmount, returnObj.amount)) {
        returnObj['status'] = 'Accepted';
        raiseAmount += parseInt(transaction.amount);
      } else if (inDateRange(createdAt) && validInvestmentAmount(returnObj.amount)) {
        returnObj['status'] = 'Waitlisted';
      } else {
        returnObj['status'] = 'Rejected';
      }
      return returnObj; 
    })

  if (belowMinRaise(raiseAmount)) { 
    // change status to rejected
    formattedTransactions = formattedTransactions
      .map(transaction => {
        if (transaction['status'] === 'Accepted') {
          transaction['status'] = 'Cancelled';
        }
        return transaction;
      })
  }
  return formattedTransactions;
} 

// An investment request is valid if it fits into the terms of a given campaign. 
// Invalid requests are rejected.

// Valid investment requests are accepted on a first-come first-served basis, and 
// the sum of accepted investments cannot exceed a campaign's max_raise_amount.

// Valid investment requests that would cause a campaign to exceed its 
// max_raise_amount are considered waitlisted.

// If a campaign doesn't reach its min_raise_amount it is considered a failed 
// campaign, and investments that would otherwise be "accepted" should be cancelled.

