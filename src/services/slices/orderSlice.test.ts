import burgerReducer, {
    addIngredient,
    removeIngredient,
    moveIngredientUp,
    moveIngredientDown,
    initialState
  } from './orderSlice';
  
  // Ингредиенты для тестов
  const bun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    id: 'bun-1',
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0
  };
  
  const mainIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    id: 'main-1',
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0
  };
  
  const sauce = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    id: 'sauce-1',
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0
  };
  
  describe('тест burgerReducer', () => {
    it('добавляем ингредиент', () => {
      const action = addIngredient(mainIngredient);
      const state = burgerReducer(initialState, action);
  
      expect(state.Ingredients).toEqual([mainIngredient]);
    });
  
    it('пролверка замены булки на другую', () => {
      const stateWithBun = {
        ...initialState,
        Ingredients: [bun]
      };
      // меняем булку, на булку с другим ID
      const newBun = { ...bun, id: 'bun-2' };
      const action = addIngredient(newBun);
      const state = burgerReducer(stateWithBun, action);      
      expect(state.Ingredients).toEqual([newBun]);
    });
  
    it('удаление ингредиента', () => {
      const stateWithIngredients = {
        ...initialState,
        Ingredients: [bun, mainIngredient, sauce]
      };
  
      const action = removeIngredient(mainIngredient.id);
      const state = burgerReducer(stateWithIngredients, action);
  
      expect(state.Ingredients).toEqual([bun, sauce]);
    });
  
    it('перемещение ингредиента вверх', () => {
      const stateWithIngredients = {
        ...initialState,
        Ingredients: [bun, mainIngredient, sauce]
      };
  
      const action = moveIngredientUp(sauce.id);
      const state = burgerReducer(stateWithIngredients, action);
  
      expect(state.Ingredients).toEqual([bun, sauce, mainIngredient]);
    });
  
    it('перемещение ингредиента вниз', () => {
      const stateWithIngredients = {
        ...initialState,
        Ingredients: [bun, mainIngredient, sauce]
      };
  
      const action = moveIngredientDown(mainIngredient.id);
      const state = burgerReducer(stateWithIngredients, action);
      expect(state.Ingredients).toEqual([bun, sauce, mainIngredient]);
    });
  });
  