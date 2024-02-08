import './styles.css';
import { useState } from 'react';
import { GoIssueReopened } from "react-icons/go";


function App() {
  const [quantia, setQuantia] = useState("")
  const [de, setDe] = useState("BRL")
  const [para, setPara] = useState("USD")

  const inverteValores = () => {
    const temp = de;
    setDe(para);
    setPara(temp);
  }

  const [resultado, setResultado] = useState(0)

  function converteMoeda() {
if (quantia <= 0  || de === para) return setResultado(quantia)

    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${quantia}&from=${de}&to=${para}`)
      .then((resp) => resp.json())
      .then((data) => setResultado(data.rates[para])
      );
  }


  return (
    <div className="container">
      <div>
        <label> ENTRE COM O VALOR </label>

        <input type="number"
          placeholder='$'
          prefix = {'$'}
          value={quantia}
          onChange={(e) => setQuantia(e.target.value)}
        />
      </div>

      <select value={de} onChange={(e) => setDe(e.target.value)}>
        <option value="BRL">REAL</option>
        <option value="USD">DOLAR</option>
        <option value="EUR">EURO</option>
        <option value="AUD">DOLAR AUSTRALIANO</option>
        <option value="GBP">LIBRA</option>
        <option value="HKD">DOLAR HONG KONG</option>
      </select>

      <button className='inverte' onClick={inverteValores}>
      <GoIssueReopened />
      </button>

      <select value={para} onChange={(e) => setPara(e.target.value)}>
        <option value="BRL">REAL</option>
        <option value="USD">DOLAR</option>
        <option value="EUR">EURO</option>
        <option value="AUD">DOLAR AUSTRALIANO</option>
        <option value="GBP">LIBRA</option>
        <option value="HKD">DOLAR HONG KONG</option>
      </select>

      <button className='button' onClick={() => converteMoeda()}>Converter</button>

      <div>{resultado ? resultado : ""}</div>
    </div>
  );
}

export default App;
