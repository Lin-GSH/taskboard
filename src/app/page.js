'use client';  // 這個標記告訴 Next.js 這是一個客戶端組件，可以使用瀏覽器的 API 和 React hooks

// 導入所需的模組和組件
import TaskList from "@/components/TaskList"; // 導入任務列表組件，用於顯示所有任務
import Image from "next/image"; // Next.js 的圖片優化組件
import { useState } from "react"; // React 的狀態管理 Hook

export default function Home() {
  // 使用 useState Hook 管理組件狀態
  const [tasks, setTasks] = useState([]); // 創建一個空陣列來儲存所有的任務項目
  const [newTask, setNewTask] = useState(''); // 創建一個空字串來儲存用戶正在輸入的新任務

  // 定義添加新任務的函數
  const addTask = () => {
    console.log("Before:", tasks); // 記錄添加前的任務列表狀態
    console.log("New Task:", newTask); // 記錄要添加的新任務內容
    const updatedTasks = [...tasks, newTask]; // 使用展開運算符(...) 創建一個新的陣列，包含原有任務和新任務
    setTasks(updatedTasks); // 使用 setTasks 更新狀態，觸發重新渲染
    console.log("After:", updatedTasks); // 記錄添加後的任務列表狀態
    setNewTask(''); // 清空輸入框，為下一次輸入做準備
  };

  return (
    // 返回頁面的 JSX 結構
    <main className="p-4"> {/* 主容器，使用 Tailwind CSS 添加內邊距 */}
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

      {/* 渲染任務列表組件，並將當前的任務陣列作為 props 傳遞給它 */}
      <TaskList tasks={tasks} />

    </main>
  );
}
