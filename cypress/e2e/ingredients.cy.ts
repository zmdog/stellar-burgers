describe('Тестирование ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients',
      { fixture: 'ingredients.json' }
    )
      .as('getIngredients');

    cy.intercept('GET', 'api/auth/user',
      { fixture: 'user.json' }
    )
      .as('getUser');

    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.visit('');
  })

  const getAttribute = (name: string) => `[data-cy='${name}']`

  const constructBurger = () => {
      cy.get('h3').contains('Булки').next('ul').find('button').first().click();
      cy.get('h3').contains('Начинки').next('ul').find('button').first().click();
      cy.get('h3').contains('Соусы').next('ul').find('button').first().click();
  }

  afterEach(() => {
    cy.setCookie('accessToken', '');
    localStorage.setItem('refreshToken', '');
  });

  describe('Тестирование добавления ингредиентов в конструктор', () => {
    it('Заполняет конструктор ингредиентами и проверяет стоимость', () => {
      constructBurger()
      cy.get(getAttribute('price')).contains('3024')
    })
  })

  describe('Проверка открытия и закрытия модального окна -', () => {
    beforeEach(() => {
      cy.get(getAttribute('ingredients-category')).find('li').first().click();

      it('Проверка открытия и закрытия модального окна ингредиента через кнопку', () => {
        cy.get(getAttribute('modal')).should('be.visible');
      });
    });

    it('- button', () => {
      cy.get(getAttribute('close-button')).click();
      cy.get(getAttribute('modal')).should('not.exist');
    });
    it('- esc', () => {
      cy.get('body').type('{esc}');
      cy.get(getAttribute('modal')).should('not.exist');
    });
    it('- overlay', () => {
      cy.get(getAttribute('overlay')).as('overlay');
      cy.get('@overlay').click('top', {force: true});
      cy.get(getAttribute('modal')).should('not.exist');
    });
  });

  describe('Тестирование оформление заказа', () => {
    it('оформляет заказ, проверяет наличие и закрывает модальное окно', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('orders');

      constructBurger()

      cy.contains('Оформить заказ').click()
      cy.contains('50876').should('exist');

      cy.get(getAttribute('overlay')).as('overlay');
      cy.get('@overlay').click('top', {force: true});

      cy.get(getAttribute('modal')).should('not.exist');
      cy.contains('50876').should('not.exist');

      cy.get(getAttribute('price')).contains('0')
    })
  })

})
