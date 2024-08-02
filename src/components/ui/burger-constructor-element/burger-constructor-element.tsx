import React, { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { BurgerConstructorElementUIProps } from './type';
import { MoveButton } from '@zlden/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { TIngredient } from '@utils-types';
import { moveIngredientDnd } from '../../../slices/ingredientsSlice';
import { useDispatch } from '../../../services/store';

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> =
  memo(
    ({
      ingredient,
      index,
      totalItems,
      handleMoveUp,
      handleMoveDown,
      handleClose
    }) => {
      const dispatch = useDispatch();
      const onDropHandler = (id: string) =>
        dispatch(moveIngredientDnd([id, ingredient.key!]));
      const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredientConstructor',
        item: ingredient,
        collect: (monitor) => ({
          isDrag: monitor.isDragging()
        })
      });
      const [, dropTarget] = useDrop({
        accept: 'ingredientConstructor',
        drop(ingredient: TIngredient) {
          onDropHandler(ingredient.key!);
        }
      });
      return (
        !isDrag && (
          <li
            ref={(el) => {
              dragRef(el);
              dropTarget(el);
            }}
            className={`${styles.element} mb-4 mr-2`}
          >
            <MoveButton
              handleMoveDown={handleMoveDown}
              handleMoveUp={handleMoveUp}
              isUpDisabled={index === 0}
              isDownDisabled={index === totalItems - 1}
            />
            <div className={`${styles.element_fullwidth} ml-2`}>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={handleClose}
              />
            </div>
          </li>
        )
      );
    }
  );
