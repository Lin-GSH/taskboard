'use client'// // 這個標記告訴 Next.js 這是一個客戶端組件，可以使用瀏覽器的 API 和 React hooks

import { useRouter } from "next/navigation"; // 導入 useRouter Hook，用於導航
import { useEffect, useState } from "react"; // 導入 useState 和 useEffect Hook，用於狀態管理和副作用處理

export default function taskDetail({params}) {
    const router = useRouter(); // 使用 useRouter 獲取路由對象
    const { id } = params; // 從路由參數中獲取任務 ID
    const [title, setTitle] = useState(''); // 使用 useState 創建 title 狀態，初始值為空字串
    const [description, setDescription] = useState(''); // 使用 useState 創建 description 狀態，初始值為空字串

    const handleSave = () => {
        const savedTasks =JSON.parse(localStorage.getItem('tasks')) || []; // 從 localStorage 獲取已保存的任務，若不存在則設置為空陣列
        const updatedTasks = savedTasks.map((task) => 
            task.id === Number(id) ? { ...task, title, description } : task
            // 根據 ID 找到對應的任務並更新其標題和描述，否則返回原任務
        ); // 更新任務列表，根據 ID 找到對應的任務並更新其標題和描述
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 將更新後的任務列表保存到 localStorage
        router.push('/'); // 導航回主頁
    };
    
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // 從 localStorage 獲取已保存的任務，若不存在則設置為空陣列
        const task = savedTasks.find((t) => t.id === Number(id)); // 根據 ID 找到對應的任務
        if (task) {
            setTitle(task.title); // 如果找到任務，設置 title 狀態
            setDescription(task.description); // 設置 description 狀態
        }
    },[id]); // 當 id 改變時重新執行 useEffect
    // useEffect 用於在組件掛載時獲取任務的詳細信息，並設置到狀態中
    return (
        <main className="p-4 max-w-md mx-auto"> {/* 主容器，使用 Tailwind CSS 添加內邊距和最大寬度 */}
            <h1 className="text-2xl font-bold md-4">Task Detail</h1> {/* 頁面標題 */}
            <input
                className="border p-2 w-full mb-2" // 設置輸入框的樣式：邊框、內邊距、寬度和下邊距
                value={title} // 設置輸入框的值為 title 狀態
                onChange={(e) => setTitle(e.target.value)} // 當輸入框的值改變時，更新 title 狀態
                placeholder="Title" // 提示文字
            />
            <textarea
                className="border p-2 w-full mb-4" // 設置文本區域的樣式：邊框、內邊距、寬度和下邊距
                value={description} // 設置文本區域的值為 description 狀態
                onChange={(e) => setDescription(e.target.value)} // 當文本區域的值改變時，更新 description 狀態
                placeholder="Description" // 提示文字
                rows={4} // 設置文本區域的行數為 4
            />
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg" // 設置按鈕的樣式：藍色背景、白色文字、內邊距和圓角
                onClick={handleSave} // 當按鈕被點擊時，調用 handleUpdate 函數
            >Save</button>
        </main>
    );

}