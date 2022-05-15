import React from 'react';

function CurrentBalance({user}) {
    return (
        <div>
            <h4>Current Balance</h4>
            <h2 className="text-center">${user.balance}</h2>
        </div>
    );
}

export default CurrentBalance;