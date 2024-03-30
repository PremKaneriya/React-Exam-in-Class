import { useDispatch } from "react-redux";
import { decrement, increment } from "../redux/Action/counter.action";
import { useSelector } from "react-redux";

function Counter() {
  const dispatch = useDispatch();
  const val = useSelector((state) => state.counter);

  const handlincrement = () => {
    dispatch(increment());
  };

  const handldecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <button onClick={handlincrement}>+</button>
      <div>{val.count}</div>
      <button onClick={handldecrement}>-</button>
    </div>
  );
}

export default Counter;
