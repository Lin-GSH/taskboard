'use client'; // 使用客戶端組件
import Link from "next/link";// 導入 Link 組件，用於導航

export default function TaskList({tasks, onDelete}) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} 
          className="border p-2 rounded flex justify-between items-center">
          {/*設置列表項的樣式：邊框、內邊距、圓角、flex 布局、水平和垂直居中*/}
          <Link 
            href={`/task/${task.id}`} // 使用 Link 組件導航到任務詳細頁面，URL 中包含任務 ID
            className="text-blue-500 hover:underline" // 設置鏈接樣式：藍色文字和懸停時下劃線
          >{task.title}</Link> {/* 任務標題，點擊後導航到任務詳細頁面 */}
          <button
            className="bg-red-500 text-white p-1 rounded-md" // 設置按鈕樣式：紅色背景、白色文字、圓角
            onClick={() => onDelete(task.id)} // 點擊按鈕時調用 onDelete 函數，傳入當前任務的索引
          >Delete</button>
        </li>
      ))}
    </ul>
  );
}
