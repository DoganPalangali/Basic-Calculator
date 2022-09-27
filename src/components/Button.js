import React, { useContext } from 'react'
import { CalcContext } from '..//icerik/CalcContext'

const getStyleName = btn => {

  

    const className = {
        '=': 'equals',
        'x': 'opt',
        '-': 'opt',
        '+': 'opt',
        '/': 'opt',
        
    }


    return className[btn]
}




const Button = ({ value }) => {

    // User Tıklama 
    const { calc, setCalc } = useContext(CalcContext)
  


    const commaclick = () => {
        setCalc({
          ...calc,
          num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        });
    }

    // user yüzde tuşuna basınca 

    const percentClick = () =>
    {
      setCalc({
        num: (calc.num / 100),
        res: (calc.res / 100),
        sign:''
      })
    }





    // user cc tıklama

    const resetClick = () => {
      setCalc({ sing: '', num: 0, res:0 })
    }

    // user numaraya tıklama -- number string 0 olursa ve calc.num 0 olursa; numberValue de 0 olmalı yoksa 0000 ard arda basabilir.
    const handleClickButton = ()  =>  {
      const numberString = value.toString()


      let numberValue;
      if(numberString === 0 && calc.num === 0){
        numberValue = "0"

      }else {
        numberValue = Number(calc.num + numberString)
      }
      setCalc({
        ...calc,
        num:numberValue
        })
    }

    // user işlemlere tıklayınca

    const singClick =() => {
      setCalc({
        sign: value,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0
      })
    }

    //user -+ tuşuna basınca
    const invertClick =  () => {
      setCalc({
        num: calc.num ? calc.num * -1 : 0,
        res: calc.res ? calc.res * -1 : 0,
        sign:''
      })
    }


 // user eşittire basınca 

 const equalsClick = () => {
    if(calc.res && calc.num){
      const math = (a, b,sign) =>
      {
       const result = {
         '+': (a, b) => a + b,
         '-': (a, b) => a - b,
         'x': (a, b) => a * b,
         '/': (a, b) => a / b,
         '%': (a, b) => a * b / 100,
       }
       return result[sign](a, b)
      }
      setCalc ({
        res: math(calc.res, calc.num, calc.sign),
        sing:'',
        numb: 0
       })
    }
 
  
  
 }


  const handleBtnClick = () => {
     const results = {
      '.': commaclick,
      'CC': resetClick,
      '/': singClick,
      'x': singClick,
      '-': singClick,
      '+': singClick,
      '=': equalsClick,
      '+-': invertClick,
      '%': percentClick
     }
     if(results[value]) {
      return results[value]()
     } else {
      return handleClickButton()
     }
  }



  return (
    <button  onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button