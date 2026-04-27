import os, sys

def nueva_skill(categoria, nombre):
    ruta = f"skills/{categoria}/{nombre}.md"
    if os.path.exists(ruta):
        print(f"⚠️ Ya existe: {ruta}")
        return
    os.makedirs(f"skills/{categoria}", exist_ok=True)
    with open(ruta, "w") as f:
        f.write(f"# Skill: {nombre}\n\nActivación:\nQué hace:\nQué NO hace:\n")
    print(f"✅ Creada: {ruta}")

if len(sys.argv) == 3:
    nueva_skill(sys.argv[1], sys.argv[2])
else:
    print("Uso: python scripts/nueva-skill.py [categoría] [nombre]")
