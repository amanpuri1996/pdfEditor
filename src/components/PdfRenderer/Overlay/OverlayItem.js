import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { flagTrue } from "../../../store/flagSlice";

import styles from './Overlay.module.css'
function OverlayItem({ id, position, size, value, scale, template, isSelected, ...otherProps })
{
  const dispatch = useDispatch()
  const { textData } = useSelector((state) => state.flag)
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() =>
  {
    setText(...text, {
      [`variable_${id}`]: {
        positionX: (position.x - size / 2) * scale,
        positionY: (position.y - size / 2) * scale,
        value: 'Your Text Here'
      }
    }
    )
  }, [id])





  const handleTextChange = (e, varid) =>
  {
    console.log(e.target.value)
    setText({
      ...text,
      [`variable_${varid}`]: {
        ...text[`variable_${varid}`],
        value: e.target.value
      }
    });


  };
  console.log(text)
  useEffect(() =>
  {
    if (text)
    {

      dispatch(flagTrue(text))
    }
  }, [text])

  const uniqueData = Object.values(
    textData.reduce((acc, item) =>
    {
      const key = Object.keys(item)[0]; // Get the key of the object
      acc[key] = item[key]; // Update the object with the latest occurrence of the key
      return acc;
    }, {})
  );
  console.log(uniqueData);
  return (
    <input type='text' value={text[`variable_${id}`]?.value || ''} onChange={e => handleTextChange(e, id)} className={`${styles.item} ${isSelected ? styles.selected : ''}`}
      style={{
        left: `${(position.x - size / 2) * scale}px`,
        top: `${(position.y - size / 2) * scale}px`,
        fontSize: `${size * scale}px`,
        border: '1px dashed blue',
        outline: 'none',
        backgroundColor: 'transparent',
        color: 'black',
        padding: '4px',
        borderRadius: '1px',

      }}
      draggable={isSelected}
      title={isSelected ? 'Press <Delete> to remove this' : null}
      {...otherProps}
    />
  )
}

export default React.memo(OverlayItem)
