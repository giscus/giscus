import { useState, useEffect, useRef, MutableRefObject, Dispatch, SetStateAction } from 'react';

export function useComponentVisible<T extends HTMLElement>(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return [ref, isComponentVisible, setIsComponentVisible] as [
    MutableRefObject<T>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
}
