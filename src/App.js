import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem, deleteItem, setItems } from './itemsSlice';

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  const [newItem, setNewItem] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      const id = Date.now(); // Unique ID
      dispatch(addItem({ id, value: newItem }));
      setNewItem('');
    }
  };

  const handleUpdate = () => {
    if (editId && editValue.trim()) {
      dispatch(updateItem({ id: editId, updatedData: { value: editValue } }));
      setEditId(null);
      setEditValue('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const fetchItems = () => {
    // Simulate fetching data
    const fetchedItems = [
      { id: 1, value: 'Learn React' },
      { id: 2, value: 'Learn Redux' },
    ];
    dispatch(setItems(fetchedItems));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD with Redux</h1>

      {/* Add Item */}
      <div>
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Item */}
      {editId && (
        <div>
          <input
            type="text"
            placeholder="Edit item"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      {/* Fetch Items */}
      <button onClick={fetchItems}>Fetch Items</button>

      {/* Display Items */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.value}
            <button onClick={() => {
              setEditId(item.id);
              setEditValue(item.value);
            }}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
