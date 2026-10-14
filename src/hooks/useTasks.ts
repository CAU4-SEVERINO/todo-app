import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Task } from "../types";

const TASKS_KEY = "@task_key";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 1. Carregar dados ao iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsInitialLoad(false);
      }
    };
    loadTasks();
  }, []);

  // 2. Salvar dados quando houver alterações (ignorar a primeira carga vazia)
  useEffect(() => {
    if (isInitialLoad) return;

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Erro ao salvar tarefas:", error);
      }
    };
    saveTasks();
  }, [tasks, isInitialLoad]);

  //Função para adicionar uma nova tarefa
  const addTasks = (text: string) => {
    if (text.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(),
      text,
    };
    //Atualiza pegando o estado anterior de forma segura
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Função para remover uma tarefa
  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  //Função para editar uma tarefa
  const editTask = (id: string, newText: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };


  return { tasks, addTasks, removeTask, editTask };
}
