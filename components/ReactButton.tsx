import { SmileyIcon } from '@primer/octicons-react';
import { useState } from 'react';
import useComponentVisible from '../lib/hooks';
import { Reactions } from '../lib/reactions';

export default function ReactButton() {
  const [current, setCurrent] = useState('');
  const [ref, isOpen, setIsOpen] = useComponentVisible<HTMLDivElement>(false);

  function togglePopover() {
    setIsOpen(!isOpen);
  }

  return (
    <div ref={ref}>
      <button
        className="px-3 py-1 mb-4 mr-3 text-gray-900 text-opacity-75 border rounded hover:text-blue-600"
        onClick={togglePopover}
      >
        <SmileyIcon />
      </button>
      <div
        className={`absolute ${
          isOpen ? 'visible scale-100' : 'invisible scale-50'
        } ease-in-out duration-100 origin-center transform transition z-20 w-[146px] text-gray-600 bg-white border rounded popover top-8`}
      >
        <p className="m-2">{current || 'Pick your reaction'}</p>
        <div className="my-2 border-t" />
        <div className="m-2">
          {Object.entries(Reactions).map(([key, { name, emoji }]) => (
            <button
              key={key}
              type="button"
              className="w-8 h-8 transition-transform transform focus:scale-150 hover:scale-150"
              onClick={togglePopover}
              onMouseEnter={() => setCurrent(name)}
              onFocus={() => setCurrent(name)}
              onMouseLeave={() => setCurrent('')}
              onBlur={() => setCurrent('')}
            >
              {emoji}
            </button>
          ))}
        </div>
        <style jsx>
          {`
            .popover::before {
              position: absolute;
              top: -16px;
              left: 9px;
              border: 8px solid transparent;
              border-bottom: 8px solid lightgray;
              content: '';
            }
            .popover::after {
              position: absolute;
              top: -15px;
              left: 10px;
              border: 7px solid transparent;
              border-bottom: 8px solid white;
              content: '';
            }
          `}
        </style>
      </div>
    </div>
  );
}
