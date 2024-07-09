import { useState } from "react";

let counter = 1;
function Testing_Only() {
  const [array, setArray] = useState([0]);

  const handleAddDiv = () => {
    setArray((prev) => [...prev, counter++]);
  };

  const handleRemoveDiv = (idx: number) => {
    var arrayCopy = [...array];
    arrayCopy.splice(idx, 1); //remove the the item at the specific index
    setArray(arrayCopy);
  };

  return (
    <div className="App">
      {array.map((item, idx) => (
        <div key={item}>
          <div>
            <input type="text" value={idx} />
            <input type="text" />
            <button onClick={() => handleRemoveDiv(idx)}>Remove</button>
          </div>
        </div>
      ))}
      <button onClick={handleAddDiv}>Add</button>
    </div>
  );
}

export default Testing_Only;
