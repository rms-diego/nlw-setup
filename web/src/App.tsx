import { Habit } from "./components/Habit";
import "./styles/global.css";

export default function App() {
  return (
    <>
      <Habit completed={3} />
      <Habit completed={2} />
      <Habit completed={6} />
    </>
  );
}
