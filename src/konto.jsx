// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";

const Konts = () => {
    const [kwotaOperacji, setkwotaOperacji] = useState(0);
    const [wartoscKonta, setwartoscKonta] = useState(0);
    const [dostepnyDebet, setdostepnyDebet] = useState(2000);
    const [historiaTransakcji, sethistoriaTransakcji] = useState([]);
    const [typTransakcji, settypTransakcji] = useState('depo');
    const [pokazHistorie, setpokazHistorie] = useState(false);

    useEffect(() => {
    }, [kwotaOperacji, wartoscKonta, dostepnyDebet, historiaTransakcji]);

    const zmianaRadio = (e) => {
        settypTransakcji(e.target.value);
    };

    const zmianaKwoty = (e) => {
        setkwotaOperacji(parseFloat(e.target.value));
    };

    const aktualizacjaKonta = () => {
        if (typTransakcji === 'depo') {
            const nowe = wartoscKonta + kwotaOperacji;
            setwartoscKonta(nowe);
        } else {
            const potencjalny = wartoscKonta + dostepnyDebet;
            if (kwotaOperacji <= potencjalny) {
                const nowe = wartoscKonta - kwotaOperacji;
                setwartoscKonta(nowe);
            } else {
                console.log('Nie możesz wypłacić więcej niż dostępne saldo oraz dostępny debet')
                return;
            }
        }

        const newTransaction = {
            id: historiaTransakcji.length + 1,
            type: typTransakcji,
            amount: kwotaOperacji,
            date: new Date().toLocaleString()
        };
        sethistoriaTransakcji([...historiaTransakcji, newTransaction]);
        setkwotaOperacji(0);
    }

    const zmianaDebetu = (e) => {
        setdostepnyDebet(parseFloat(e.target.value));
    };

    const pokazHistori = () => {
        setpokazHistorie(true)
    }

    return (
        <>
            <p>Stan konta<span> {wartoscKonta} </span> zł</p>

            <p>Operacja</p>
            <input type="radio" value="depo" name="ww" onChange={zmianaRadio}/>
            Wpłata
            <input type="radio" value="with" name="ww" onChange={zmianaRadio}/>
            Wypłata

            <p>Kwota:</p>
            <input type="number" value={kwotaOperacji} onChange={zmianaKwoty} placeholder="Wprowadz kwote"/>
            <button onClick={aktualizacjaKonta}>Potwiedź</button>

            <p>Nowy limit kredytowy(debet):</p>
            <input type="number" onChange={zmianaDebetu} placeholder="Wprowadz kwote"/>
            <button>Potwiedź</button>

            <h1>Historia operacji</h1>
            <button onClick={pokazHistori}>Historia</button>
            <ul>
                {pokazHistorie && (
                    <ul>
                        {historiaTransakcji.map(transaction => (
                            <li key={transaction.id}>
                                {transaction.type === 'depo' ? 'Wpłata' : 'Wypłata'}: {transaction.amount} zł - {transaction.date}
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </>
    );
}

export default Konts