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
        const date = formatDate(item.date)
        return (
            <div key={index} className="history-item">
                <div className="history-container">
                    <div className="history-header">
                        <div className="index-container">
                            <p className="index">{index + 1}</p>
                        </div>
                        <hr />
                        <p>${item.amount}</p>
                    </div>
                    <div className="history-date">
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div>
            <h2 className="text-center">{title}</h2>
            <div>
                {elements}
            </div>
        </div>
    );
}

export default HistoryResume;