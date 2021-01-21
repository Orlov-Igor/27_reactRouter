import React, { useState, useCallback, useMemo } from 'react';

/*
* useCallback использовать только при передаче функции вниз по иерархии компонентов
* useMemo использовать для всех тяжелых операций (фильтрации, сортировки, циклы и т.д)
* Внимательно следить что вы передаете вторым аргументов (inputs)
* Не использоваться методы оптимизации кода до написания самого кода
* */

const randomColour = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

const Button = React.memo(props => ( // будет рендерить компонент ТОЛЬКО если изменились его props
  <button onClick={props.onClick} style={{ background: randomColour() }}>
    {props.children}
  </button>
));

// class Component extends React.PureComponent

const functions = new Set();

const UseCallbackExample = () => {

  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(1);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const incrementCount = useCallback(() => setCount(count => count + delta), [delta]);

  const heavyValue = useMemo(() => {
    let result = 0;
    for (let i =0; i < 1000000000; i++) {
      result += delta;
    }
    return result;
  }, [delta]);

  functions.add(incrementDelta);
  functions.add(incrementCount);

  return (
    <div>
      <div>Delta is {delta}</div>
      <div>Counter is {count}</div>
      <div>Heavy value is {heavyValue}</div>
      <div>
        <Button onClick={incrementCount}>Increment Count</Button>
        <Button onClick={incrementDelta}>Increment Delta</Button>
      </div>
      <div>News created functions: {functions.size - 2}</div>
    </div>
  )
};

export default UseCallbackExample
