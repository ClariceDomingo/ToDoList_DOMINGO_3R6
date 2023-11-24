import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  // State for the input task
  const [task, setTask] = useState("");

  // State for the list of tasks
  const [tasks, setTasks] = useState([]);

  // State for tracking the index of the task being edited
  const [editIndex, setEditIndex] = useState(-1);

  // State for tracking checked tasks
  const [checkedTasks, setCheckedTasks] = useState([]);

  // Function to handle adding or updating a task
  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new task
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };

  // Function to handle editing a task
  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  // Function to handle deleting a task
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Remove the index from the checked tasks array when deleting
    const updatedCheckedTasks = checkedTasks.filter((checkedIndex) => checkedIndex !== index);
    setCheckedTasks(updatedCheckedTasks);
  };

  // Function to handle toggling the checkbox for a task
  const handleCheckboxToggle = (index) => {
    const updatedCheckedTasks = [...checkedTasks];
    if (updatedCheckedTasks.includes(index)) {
      // If already checked, uncheck it
      const taskIndex = updatedCheckedTasks.indexOf(index);
      updatedCheckedTasks.splice(taskIndex, 1);
    } else {
      // If not checked, check it
      updatedCheckedTasks.push(index);
    }
    setCheckedTasks(updatedCheckedTasks);
  };

  // Function to render each task item
  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <TouchableOpacity onPress={() => handleCheckboxToggle(index)}>
        <Icon
          name={checkedTasks.includes(index) ? "check-box" : "check-box-outline-blank"}
          size={24}
          color="green"
          style={styles.checkbox}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.itemList,
          { textDecorationLine: checkedTasks.includes(index) ? 'line-through' : 'none' },
          checkedTasks.includes(index) ? styles.fadedText : null,
        ]}
      >
        {item}
      </Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Icon name="create" size={24} color="#4CAF50" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Icon name="delete" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Main component rendering
  return (
    <View style={styles.container}>
      {/* Heading for the ToDo list */}
      <Text style={styles.heading}>My ToDo List</Text>

      {/* Input field for entering new tasks */}
      <TextInput
        label="Enter ToDo"
        mode="outlined"
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholderTextColor="#757575"
        style={styles.input}
        theme={{
          colors: {
            primary: "#03A9F4", // Set the primary color
          },
        }}
      />

      {/* Button for adding or updating a task */}
      <Button
        mode="contained"
        style={styles.addButton}
        onPress={handleAddTask}
        color="#03A9F4"
        labelStyle={styles.addButtonText}
      >
        {editIndex !== -1 ? "Update" : "Add"}
      </Button>

      {/* FlatList to display the tasks */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#FFFFFF", // Lighter background color
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "purple", // Green color for heading
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    fontSize: 18,
    height: 70,
  },
  addButton: {
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  itemList: {
    fontSize: 20,
    color: "#212121",
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#B3E0FF", // Light blue background color
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  taskButtons: {
    flexDirection: "row",
    marginLeft: 'auto',
  },
  icon: {
    marginHorizontal: 10,
  },
  checkbox: {
    marginHorizontal: 10,
  },
  fadedText: {
    opacity: 0.5, // Text fade if box is checked
  },
});

// Export the component
export default App;
