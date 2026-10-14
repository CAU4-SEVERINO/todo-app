import { useState } from "react";
import { Task } from "../types";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface TaskItemProps {
    task: Task;
    onRemove: (id: string) => void;
    onEdit: (id: string, newText: string) => void;

}

export function TaskItem({task, onRemove, onEdit}: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleSave = () => {
        onEdit(task.id, editText);
        setIsEditing(false);
    }

    return(
        <View style={styles.taskCard}>
            {isEditing ? (
                <TextInput 
                    style={styles.editInput} 
                    value={editText}
                    onChangeText={setEditText}
                    autoFocus
                />
            ) : (
                <Text style={styles.taskText}>{task.text}</Text>
            )}
            <View style={styles.actionContainer}>

                {/* /*botao editar e salvar */ }
                {isEditing ? (
                    <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
                        <Text style={styles.buttonText}>V</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => setIsEditing(true)}>
                        <Text style={styles.buttonText}>E</Text>
                    </TouchableOpacity>           
                )}

                {/* /*botao excluir */ }
                <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => onRemove(task.id)}
                >
                    <Text style={styles.buttonText}>x</Text>
                </TouchableOpacity>
            </View>
        </View> 
        
    );  
}

const styles = StyleSheet.create({
    taskCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        marginRight: 10,
    },
    editInput: {
        flex: 1,
        fontSize: 16, 
        color: "#333",
        borderBottomWidth: 1,
        borderBottomColor: "#007BFF",
        marginRight: 10,
        padding: 0,  
    },
    actionContainer: {
        flexDirection: "row",
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    editButton: {
        backgroundColor: "#ff8400",
    },
    saveButton: {
        backgroundColor: "#09cf1a",
    },
    deleteButton: {
        backgroundColor: "#ff0000",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    }
});