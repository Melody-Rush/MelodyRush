@echo off
title Melody Rush - Servidor Local
echo ==========================================
echo  Iniciando entorno de Melody Rush...
echo ==========================================

:: Verificar si existe la carpeta venv
if not exist "venv" (
    echo [!] No se detecto un entorno virtual local. Creando uno nuevo...
    python -m venv venv
    call venv\Scripts\activate
    echo [!] Instalando dependencias desde requirements.txt...
    python -m pip install --upgrade pip
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate
)

echo [✓] Entorno activado correctamente.
echo [✓] Levantando servidor Django en http://127.0.0.1:8000/
python manage.py runserver
