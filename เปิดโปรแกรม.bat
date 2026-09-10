@echo off
title Warehouse Parcel Tracking System
cd /d "%~dp0"
set "PATH=%PATH%;C:\Program Files\nodejs"

echo ===================================================
echo   ระบบติดตามพัสดุในคลังสินค้า (Warehouse Tracker)
echo   กำลังเริ่มต้นเซิร์ฟเวอร์ และเปิดหน้าเว็บให้...
echo ===================================================

start http://localhost:5173
npm run dev

pause
