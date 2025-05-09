'use client';  // 這個標記告訴 Next.js 這是一個客戶端組件，可以使用瀏覽器的 API 和 React hooks

// 導入所需的模組和組件
import TaskList from "@/components/TaskList"; // 導入任務列表組件，用於顯示所有任務
import Link from "next/link"; // 導入 Link 組件，用於導航
import { useState, useEffect } from "react"; // 導入 useState 和 useEffect Hook，用於狀態管理和副作用處理

export default function Home() {

  // 使用 useState Hook 管理組件狀態
  const [tasks, setTasks] = useState([]); // 創建一個空陣列來儲存所有的任務項目
  const [newTask, setNewTask] = useState(''); // 創建一個空字串來儲存用戶正在輸入的新任務
  const [nextId, setNextId] = useState(1); // 創建一個狀態來儲存下一個任務的 ID，初始值為 1

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // 從 localStorage 獲取已保存的任務，若不存在則設置為空陣列
    setTasks(savedTasks); // 將獲取的任務設置到 tasks 狀態中
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0); // 使用 reduce 方法獲取任務列表中最大的 ID
    setNextId(maxId + 1); // 將下一個任務的 ID 設置為最大 ID + 1
  }, []); // useEffect 用於在組件掛載時獲取任務列表並設置狀態


  // 定義添加新任務的函數
  const addTask = () => {
    console.log("Before:", tasks); // 記錄添加前的任務列表狀態
    console.log("New Task:", newTask); // 記錄用戶輸入的新任務
    const newTaskObj = { id: nextId, title: newTask, description: ''}; // 創建一個新的任務對象，包含 ID、標題和描述
    const updatedTasks = [...tasks, newTaskObj]; // 使用展開運算符創建一個新的陣列，將新任務添加到現有的任務列表中
    setTasks(updatedTasks); // 使用 setTasks 更新狀態，觸發重新渲染
    console.log("After:", updatedTasks); // 記錄添加後的任務列表狀態
    setNewTask(''); // 清空輸入框，為下一次輸入做準備
    setNextId(nextId + 1); // 更新下一個任務的 ID
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 將更新後的任務列表保存到 localStorage
  };

  // 定義刪除任務的函數
  const handleDelete = (index) => {
    console.log("Before:", tasks); // 記錄刪除前的任務列表狀態
    const updatedTasks = tasks.filter((_, i) => i !== index); // 使用 filter 方法創建一個新的陣列，排除要刪除的任務
    setTasks(updatedTasks); // 更新狀態，觸發重新渲染
    console.log("After:", updatedTasks); // 記錄刪除後的任務列表狀態
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 將更新後的任務列表保存到 localStorage
  };
  return (
    // 返回頁面的 JSX 結構
    <main className="p-4 max-w-md mx-auto">{/* 主容器，使用 Tailwind CSS 添加內邊距和最大寬度 */}
      <h1 className="text-2xl font-bold">Task Board</h1> {/* 頁面標題 */}

      {/* 任務輸入表單區域：使用 flex 布局來排列輸入框和按鈕 */}
      <div className="flex gap-2 mb-4"> {/* flex 容器，設置間距和下邊距 */}
        {/* 輸入框：用於接收用戶輸入的新任務 */}
        <input
          className="border p-2 flex-1" // 添加邊框和內邊距，flex-1 使其占據剩餘空間
          placeholder="Enter a task" // 提示文字
          value={newTask} // 綁定到 newTask 狀態
          onChange={(e) => setNewTask(e.target.value)}
          // onChange 事件處理說明：
          // 1. e 是事件對象(event object)，包含了輸入框的所有信息
          // 2. e.target 指向觸發事件的 DOM 元素（這裡是 input 元素）
          // 3. e.target.value 獲取輸入框的當前值
          // 4. setNewTask() 是 useState 提供的更新函數
          // 5. 每次用戶輸入或刪除文字時，這個函數都會被調用
          // 6. 這樣實現了輸入框的值與 newTask 狀態的即時同步
        />

        {/* 添加按鈕：點擊時將新任務添加到列表中 */}
        <button
          className="bg-blue-500 text-white px-4 rounded-lg " // 設置按鈕樣式：藍色背景、白色文字、圓角
          onClick={addTask} // 點擊按鈕時調用 addTask 函數
        >Add Task</button>
      </div>

      {/*
        渲染任務列表組件，並將當前的任務陣列作為 props 傳遞給它
        TaskList 組件負責顯示所有任務，並提供刪除功能
        tasks 是一個陣列，包含了所有的任務項目
        onDelete 是一個函數，用於刪除指定索引的任務
        當用戶點擊刪除按鈕時，會調用這個函數
      */}
      <TaskList tasks={tasks} onDelete={handleDelete} />

    </main>
  );
}
