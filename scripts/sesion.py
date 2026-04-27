import os, shutil, datetime

def cerrar_sesion():
    activo = "roadmap/activo"
    completado = "roadmap/completado"
    fecha = datetime.date.today().isoformat()
    archivos = [f for f in os.listdir(activo) if f.endswith(".md")]
    if not archivos:
        print("Sin tarea activa.")
        return
    for archivo in archivos:
        destino = f"{completado}/{fecha}-{archivo}"
        shutil.move(f"{activo}/{archivo}", destino)
        with open("CLAUDE.md", "a") as f:
            f.write(f"\n✅ {fecha} — {archivo.replace('.md','')}")
        print(f"Movido: {destino}")

cerrar_sesion()
