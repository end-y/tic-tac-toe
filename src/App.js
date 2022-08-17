import './App.css';
import { createRef, useEffect, useRef, useState } from "react"

import Modal from './components/Modal';
import Functions from './components/Functions';
function App() {
  let [map,setMap] = useState([
    [{number:1,target:""},{number:2,target:""},{number:3,target:""}],
    [{number:4,target:""},{number:5,target:""},{number:6,target:""}],
    [{number:7,target:""},{number:8,target:""},{number:9,target:""}]
  ])
  const winnerSets = useRef([
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ]).current
  let [newMap ,setNewMap] = useState(map.flat().map(e => e.number))
  const boxRef = createRef()

  const [gameOver,setGameOver] = useState(false)

  const [fpSet, setFpSet] = useState([]);
  const [spSet, setSpSet] = useState([]);

  let [who,setWho] = useState("Sıra birinci oyuncuda")
  
  let [fPlayer, setFirstPlayer] = useState(true)
  let [sPlayer, setSecondPlayer] = useState(false)
  
  let [isComputer,setIsComputer] = useState(false) 

  let start = (startRef) => {
    boxRef.current.style.display = "flex"
    setTimeout(() => {
      boxRef.current.style.opacity = "1"
    }, 200);
    startRef.current.style.opacity = "0"
    let s = startRef.current
    setTimeout(() => {
      s.style.display = "none"
    }, 1000);
  }
  let startVsComputer = (startRef) => {
    setIsComputer(true)
    boxRef.current.style.display = "flex"
    let b = boxRef.current
    setTimeout(() => {
      b.style.opacity = "1"
    }, 200);
    startRef.current.style.opacity = "0"
    let s = startRef.current
    setTimeout(() => {
      s.style.display = "none"
    }, 1000);
    
  }
  useEffect(() => {
    Functions.effect(winnerSets,map,setWho,setGameOver,fpSet,spSet,isComputer)
  },[fpSet,spSet])
  return (
    <>
    <main ref={boxRef} >
      <div className="app">
        {map.map((e,i) => (
          <div className='table' style={{borderBottom: map.at(-1) === e || "3px solid #f5f0e1"}} key={i+"main"}>
          {e.map(el => (
              <div style={{borderRight: e.at(-1) === el ||"3px solid #f5f0e1"}} className="table_ic" key={el.number+"sub"}>
                <div onClick={(e) => gameOver ? alert("Oyun bitti") : Functions.putIcons(e.currentTarget,el,setFirstPlayer,setSecondPlayer,setWho,setFpSet,setSpSet,fpSet,spSet,map,sPlayer,fPlayer,isComputer,newMap,setNewMap,winnerSets)} className="box">
                  <span id={el.number} className='box_ic'>
                      {el.target}
                  </span>
                </div>
              </div>
          ))}
          </div>
        ))}
      </div>
      <p style={{color:"#f5f0e1", textTransform:"uppercase", fontSize:30}}>{who}</p>
    </main>
    <Modal text={"Hoşgeldiniz"} modalFunc={[start,startVsComputer]} />
    </>
    
  );
}

export default App;
