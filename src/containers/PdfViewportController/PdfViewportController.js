import { useContext, useEffect, useState } from 'react'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'
import { ModificationContext } from '../../context/modification-context'
import { useSelector, useDispatch } from "react-redux";

function placeRunningCounter(
  scale,
  counter,
  position,
  addModification,
  incrementCounter,
  preText,

)
{
  console.log('')
  const template = (value) => `(${value})`
  const modifiedPosition = {
    x: position.x / scale,
    y: position.y / scale
  }

  console.log('prrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
  console.log(preText)
  const textField = 'text'


  addModification({
    position: modifiedPosition,
    value: textField,
    template
  })
  console.log('addModification', addModification.value)
  console.log('Position x:', modifiedPosition.x)
  console.log('Position y:', modifiedPosition.y)
  incrementCounter()
}

function PdfViewportController({ children })
{

  const dispatch = useDispatch()
  const { flag, textData } = useSelector((state) => state.flag)
  console.log(textData)
  const [preText, setPreText] = useState([]);
  useEffect(() =>
  {
    if (textData)
    {
      const uniqueData = Object.values(
        textData.reduce((acc, item) =>
        {
          const key = Object.keys(item)[0]; // Get the key of the object
          acc[key] = item[key]; // Update the object with the latest occurrence of the key
          return acc;
        }, {})
      );
      setPreText(uniqueData);
    }
  }, [textData])
  console.log(preText)
  const { data } = useContext(FileContext)
  const { scale, fontSize } = useContext(ViewportContext)
  const { counter, incrementCounter, decrementCounter } = useContext(
    CounterContext
  )
  const { modList, addMod: addModification, changeMod, removeMod } = useContext(
    ModificationContext
  )

  return children({
    data,
    pageNum: 1,
    scale,
    overlayItems: modList,
    onClick: (event, position) =>
      placeRunningCounter(
        scale,
        counter,
        position,
        addModification,
        incrementCounter,
        preText
      ),
    onItemMove: (event, position, id) =>
    {
      changeMod(id, (mod) => ({
        ...mod,
        position: {
          x: position.x / scale,
          y: position.y / scale
        }
      }))
    },
    onItemDelete: (id) =>
    {
      removeMod(id)
      decrementCounter()
    },
    fontSize

  })
}

export default PdfViewportController
