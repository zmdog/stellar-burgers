import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;
    const [{ isDrag }, dragRef] = useDrag({
      type: 'ingredient',
      item: ingredient,
      collect: (monitor) => ({
        isDrag: monitor.isDragging()
      })
    });

    return (
      !isDrag && (
        <li className={styles.container}>
          <Link
            ref={dragRef}
            className={styles.article}
            to={`/ingredients/${_id}`}
            state={locationState}
          >
            {count && <Counter count={count} />}
            <img
              className={styles.img}
              src={image}
              alt='картинка ингредиента.'
            />
            <div className={`${styles.cost} mt-2 mb-2`}>
              <p className='text text_type_digits-default mr-2'>{price}</p>
              <CurrencyIcon type='primary' />
            </div>
            <p className={`text text_type_main-default ${styles.text}`}>
              {name}
            </p>
          </Link>
          <AddButton
            text='Добавить'
            onClick={handleAdd}
            extraClass={`${styles.addButton} mt-8`}
          />
        </li>
      )
    );
  }
);
