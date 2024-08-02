import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';

import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import {
  selectBuns,
  selectMains,
  selectSauces,
  selectIsFetching
} from '../../slices/ingredientsSlice';

export const BurgerIngredients: FC = () => {
  const buns: TIngredient[] = useSelector<TIngredient[]>(selectBuns);
  const mains: TIngredient[] = useSelector<TIngredient[]>(selectMains);
  const sauces: TIngredient[] = useSelector<TIngredient[]>(selectSauces);
  const isIngredientsLoading: boolean = useSelector<boolean>(selectIsFetching);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });
  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });
  useEffect(() => {
    if (!isIngredientsLoading) {
      if (inViewBuns) {
        setCurrentTab('bun');
      } else if (inViewSauces) {
        setCurrentTab('sauce');
      } else if (inViewFilling) {
        setCurrentTab('main');
      }
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
