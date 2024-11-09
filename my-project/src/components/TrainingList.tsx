import TrainingItem from "./TrainingItem";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { useEffect, useState } from "react";

const TrainingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, "/courses");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setItems(data);
    });
  }, [database]);

  return (
    <ul className="mt-[50px] flex flex-wrap gap-[40px]">
      {items.map((item, index) => (
        <TrainingItem train={item} key={index} />
      ))}
    </ul>
  );
};

export default TrainingList;
