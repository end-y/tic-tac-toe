import { ReactComponent as Circle } from "../assets/circle.svg"
import { ReactComponent as Times } from "../assets/carpi.svg"
class Functions{
    static effect = (winnerSets,map,setWho,setGameOver,fpSet,spSet,isComputer) => {
        let b = false
        for(let w of winnerSets){
            if(w.every(j => fpSet.includes(j))){
              for(let c of w){
                document.getElementById(c).style.filter = "drop-shadow(0px 0px 6px #ffc13b)"
              }
              setWho("Birinci oyuncu kazandı")
              setGameOver(true)
              b=true
              break;
            }
            if(w.every(i => spSet.includes(i))){
              for(let c of w){
                document.getElementById(c).style.filter = "drop-shadow(0px 0px 6px #ff6e40)"
              }
              setWho("Ikinci oyunu kazandı")
              setGameOver(true)
              b=true;
              break;
            }
          }
          if(!b){
            if(map.flat().every(e => e.target != "")){
                setWho("Berabere kalındı")
                setGameOver(true)
              }
          }
          
    }
    static rNumber = (f) => {
      return f[Math.floor(Math.random()*f.length)];
    }
    static putIcons = (e,el,setFirstPlayer,setSecondPlayer,setWho,setFpSet,setSpSet,fpSet,spSet,map,sPlayer,fPlayer, isComputer,newMap,setNewMap,winnerSets) => {
        if(el.target.length != 0){
          return
        }
        let ct = e
        ct.children[0].style.transform = "translate(-50%,-50%) scale(1.2)"
    
        setTimeout(() => {
          ct.children[0].style.transform = "translate(-50%,-50%) scale(1.0)"
        },200)
        
        
        if(isComputer){
          let f = map.flat()
          setFirstPlayer(true)
          setSecondPlayer(true)

          f[el.number-1].target = <Circle />
          setFpSet([...fpSet,el.number])
          
          
          let newArr = []
          let i = 0
          while(newArr.length <=0){
            i++
            let r = Functions.rNumber(newMap);
            if(el.number == r){
              r = Functions.rNumber(newMap);
            }
            newArr = winnerSets.filter(e => e.includes(r) && !e.includes(el.number) && !e.some(e => fpSet.includes(e))).at(-1)
            if(i==5 || newArr == undefined){
              newArr = f.filter(e => e.target == "").map(e => e.number);
              r = Functions.rNumber(newArr);
            };
            for(let a of newArr){
              if(f[a-1].target != ""){
                newArr.splice(newArr.indexOf(a),1);
                setNewMap(newArr)
                r = Functions.rNumber(newArr);
              }
            }
          
            f[r-1].target = <Times />
            setTimeout(() => {
              setSpSet([...spSet,r])
            }, 100);

            document.getElementById(r).style.transform = "translate(-50%,-50%) scale(1.2)"
            setTimeout(() => {
              document.getElementById(r).style.transform = "translate(-50%,-50%) scale(1.0)"
            },200)
          }
        }else{
          setFirstPlayer(!fPlayer)
          setSecondPlayer(!sPlayer)
          if(fPlayer){
            setWho("Sıra ikinci oyuncuda")
            map.flat()[el.number-1].target = <Circle />
            setFpSet([...fpSet,el.number])
          }
          if(sPlayer){
            setWho("Sıra birinci oyuncuda")
            map.flat()[el.number-1].target = <Times />
            setSpSet([...spSet,el.number])
          }
        }

      }
}

export default Functions