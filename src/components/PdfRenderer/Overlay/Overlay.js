import React, { useRef, useState, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import OverlayItem from './OverlayItem'

import styles from './Overlay.module.css'

function getRelativeMousePos(element, event)
{
  const { left, top } = element.getBoundingClientRect()
  console.log('Position X : ', event.clientX - left)
  console.log('Position Y : ', event.clientY - top)
  return {
    x: event.clientX - left, y: event.clientY - top,
  }
}

function Overlay({ items, scale, onItemMove, onItemDelete, fontSize })
{
  const overlayRef = useRef(null)
  const [selectedItemId, setSelectedItemId] = useState(null)

  useEffect(() =>
  {
    if (items.length === 0)
    {
      setSelectedItemId(null)
    }
  }, [items])

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      style={{
        position: selectedItemId !== null ? 'absolute' : null
      }}
      onClick={() =>
      {
        setSelectedItemId(null)
      }}
    >
      <KeyboardEventHandler
        handleKeys={['delete']}
        handleEventType="keyup"
        onKeyEvent={() =>
        {
          if (selectedItemId !== null)
          {
            onItemDelete(selectedItemId)
            setSelectedItemId(null)
          }
        }}
      />

      {items.map((item, index, arr) => (

        <OverlayItem
          id={index}
          key={item.id}
          position={item.position}
          size={fontSize}
          value={item.value}
          scale={scale}
          template={item.template}
          onDragEnd={event =>
            onItemMove(
              event,
              getRelativeMousePos(overlayRef.current, event),
              item.id
            )
          }
          isSelected={item.id === selectedItemId}
          onClick={event =>
          {
            setSelectedItemId(item.id)
            event.stopPropagation()
          }}
        />
      ))}
    </div>
  )
}

export default Overlay
