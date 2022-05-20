import React, {useEffect, useState} from 'react';

function HistoryResume({user, toResume, title}) {
    const [history, setHistory] = useState([]);

    const formatDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    }

    useEffect(() => {
        console.log(user);
        if (user.history) {
            setHistory(user.history[toResume])
        } else {
            setHistory([])
        }
    }, [user.history]);

    const elements = history.slice(0).reverse().map((item, index) => {
        const date = formatDate(item.date);
        const symbol = ((_amount) => {
            if (typeof _amount === "string"){
                const _symbol = _amount[0];
                if (_symbol === '-') {
                    return 'neg-amount';
                } else {
                    return 'pos-amount';
                }
            } else {
                return "";
            }
        })(item.amount)

        return (
            <div key={index} className={"history-item"}>
                <div className="history-container">
                    <div className="history-header">
                        <div className="index-container">
                            <p className="index">{index + 1}</p>
                        </div>
                        <hr />
                        <p className={symbol}>$ {item.amount}</p>
                    </div>
                    <div className="history-date">
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="history-main-container">
            <h2 className="text-center">{title}</h2>
            <div className="history-item-container">
                {elements}
            </div>
        </div>
    );
}

export default HistoryResume;