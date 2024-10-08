// TextArea.tsx
import React from 'react';

interface TextAreaProps {
  text: string;
  style: {
    fontSize: string;
    fontFamily: string;
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
    textDecoration: 'none' | 'underline';
    textAlign: 'left' | 'center' | 'right';
  };
  position: { x: number; y: number };
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  textAreaRef: React.RefObject<HTMLDivElement>;
  textRef: React.RefObject<HTMLInputElement>;
  editing: boolean;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextClick: () => void;
  handleBlur: () => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  text,
  style,
  position,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  textAreaRef,
  textRef,
  editing,
  handleTextChange,
  handleTextClick,
  handleBlur,
}) => {
  return (
    <div
      className='border-2 border-green-500 w-full h-80 relative'
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={textAreaRef}
      style={{ position: 'relative', overflow: 'hidden' }} // Ensure overflow is hidden
    >
      <div
        className='absolute'
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          fontWeight: style.fontWeight,
          fontStyle: style.fontStyle,
          textDecoration: style.textDecoration,
          textAlign: style.textAlign,
          cursor: editing ? 'text' : 'grab',
          position: 'absolute', // Ensure the position is absolute
          whiteSpace: 'pre-wrap', // Prevent text from wrapping
        }}
        onMouseDown={!editing ? handleMouseDown : undefined}
        ref={textRef}
      >
        {editing ? (
          <input
            type='text'
            value={text}
            onChange={handleTextChange}
            onBlur={handleBlur}
            autoFocus
            className='bg-transparent border-none outline-none'
            style={{
              fontSize: style.fontSize,
              fontFamily: style.fontFamily,
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
            }}
          />
        ) : (
          <span onClick={handleTextClick}>{text}</span>
        )}
      </div>
    </div>
  );
};
